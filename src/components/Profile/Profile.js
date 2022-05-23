import { Avatar, Box, Button, Container, Grid, IconButton, Input, List, ListItem, Modal, Typography } from "@mui/material";
import { React, Component } from "react";
import NavBar from "../NavBar/NavBar";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../connections/firebase";

//ICONS MUI
/* import SendIcon from '@mui/icons-material/Send'; */
import { AccessTime, Delete, HistorySharp, PhotoCamera, Send, Star, Visibility } from "@mui/icons-material";

//HANDLE SIZE IMAGE
import Resizer from "react-image-file-resizer";

//CSS
import './style/style.css'
import Footer from "../Footer/Footer";
import { bgcolor } from "@mui/system";
import { grey } from "@mui/material/colors";
import AnimesInfo from "../AnimesInfo/AnimesInfo";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            backgroundImageFile: '',
            profileImageFile: '',
            backgroundImage: '',
            profileImage: '',
            email: '',
            firstName: '',
            lastName: '',
            txtValue: '',
            animesInfo: {
                seeLater: [],
                watching: [],
                favorit: [],
                watched: [],
                dropped: [],
            },
            modalOpen: false,
        }
    }

    //BACKGROUND IMAGE

    handleGetImageBg(e) {

        const file = e.target.files[0]

        Resizer.imageFileResizer(file, 600,
            200,
            "JPEG",
            100,
            0,
            (uri) => {
                console.log(uri);
                this.setState({ backgroundImageFile: uri });
            },
            "file",
            200,
            200
        )
    }

    //PROFILE IMAGE

    handleGetImageProfile(e) {

        const file = e.target.files[0]

        Resizer.imageFileResizer(file, 60,
            60,
            "JPEG",
            50,
            0,
            (uri) => {
                console.log(uri);
                this.setState({ profileImageFile: uri });
            },
            "file",
            200,
            200
        )
        /* console.log('newImg', this.state.profileImage) */

    }

    //SEND IMAGES BACKGROUND AND PROFILE
    async handleSendImage(file, fileName) {

        const user = getAuth()
        const imageName = user.currentUser.uid

        const storage = getStorage()
        const imageRef = ref(storage, `${fileName}Images/${imageName}${fileName}`)

        await uploadBytes(imageRef, file).then((res) => {
            return res
        })

        //GET URL OF IMAGE
        await getDownloadURL(imageRef).then((res) => {
            const imageUrl = res
            const path = `${fileName}Image`
            const usersRef = doc(db, 'users', imageName)
            //SEND URL TO USER DOC
            updateDoc(usersRef, { [path]: `${imageUrl}` })
        })
        /* window.location.reload()  *///COMITADO PARA TESTES
    }

    //GET USER DATA

    getUserData() {

        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const uid = user.uid
                const docRef = doc(db, 'users/', uid)

                getDoc(docRef).then((res) => {
                    const data = res._document.data.value.mapValue.fields
                    this.setState({
                        backgroundImage: data.backgroundImage.stringValue,
                        profileImage: data.profileImage.stringValue,
                        email: data.email.stringValue,
                        firstName: data.firstName.stringValue,
                        lastName: data.lastName.stringValue,
                    })

                    const refAnimesInfo = res._document.data.value.mapValue.fields.animesInfo.mapValue.fields

                    this.setState({
                        animesInfo: {
                            watching: this.state.animesInfo.watching.concat(refAnimesInfo.watching.arrayValue.values),
                            seeLater: this.state.animesInfo.seeLater.concat(refAnimesInfo.seeLater.arrayValue.values),
                            favorit: this.state.animesInfo.favorit.concat(refAnimesInfo.favorit.arrayValue.values),
                            watched: this.state.animesInfo.watched.concat(refAnimesInfo.watched.arrayValue.values),
                            dropped: this.state.animesInfo.dropped.concat(refAnimesInfo.dropped.arrayValue.values),
                        }
                    })
                })
            }
            else {
                console.log('deslogado')
            }
        })
    }

    openModal(animesIdArray, title, color) {
        var animesId = []
        animesIdArray.map((e) => {
            animesId.push(e.stringValue)
        })
        this.setState({
            modalOpen: true,
            animesId: animesId,
            modalTitle: title,
            modalColor: color,
        })
    }
    closeModal() {
        this.setState({
            modalOpen: false
        })
    }

    componentDidMount() {
        this.getUserData()
    }

    render() {

        return (
            <>{/* {xs:,sm:,md:,lg:,xl:} */}
                <Modal open={this.state.modalOpen} onClose={() => this.closeModal()} sx={{ marginTop: '20vh', maxWidth: '400px', marginRight: 'auto', marginLeft: 'auto' }} >
                    <Box sx={{ justifyContent: 'space-around', display: 'flex', }}>
                        <AnimesInfo title={this.state.modalTitle} color={this.state.modalColor} animesId={[this.state.animesId]} />
                    </Box>
                </Modal>
                <Box sx={{ height: '100vh' }}>
                    <NavBar />

                    <Box className="profileBody" sx={{ maxHeight: { xs: '100vh', sm: '90vh', md: '90vh', lg: '90vh', xl: '85vh' } }} >

                        <Box sx={{
                            height: { xs: 200, sm: 350, md: 300, lg: 350, xl: 450 },
                            backgroundImage:
                                `url(${this.state.backgroundImage})`,
                            backgroundSize: '100% 150%',
                            backgroundRepeat: 'no-repeat'
                        }} ><Container maxWidth={'xl'}>
                                <Box sx={{ justifyContent: 'left', display: 'flex' }} className="inputProfile">
                                    <label htmlFor="inputImageProfile">
                                        <Input onChange={(e) => this.handleGetImageProfile(e)} sx={{ display: 'none' }} accept="image/*"
                                            id="inputImageProfile" type="file"
                                        />
                                        <IconButton color="primary" aria-label="upload picture" component="span"
                                            sx={{ width: 150, height: 150 }}>
                                            <Avatar className={'imgProfile'}
                                                src={`${this.state.profileImage}`} />
                                            <PhotoCamera sx={{ width: 60, height: 60, color: '#primary' }} className={'searchIcon'} />
                                        </IconButton>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
                                            <Button sx={{ display: `${this.state.profileImageFile === '' ? 'none' : 'inline-flex'}` }}
                                                onClick={(e) => this.handleSendImage(this.state.profileImageFile, 'profile')} variant={'outlined'}
                                                endIcon={<Send />} color={'yellow'} size={'small'}>
                                                send
                                            </Button>
                                        </Box>
                                    </label>

                                    <Typography component={'h1'} className="userName">{this.state.firstName}</Typography>
                                </Box>

                                <Box>
                                    <label htmlFor="inputImageBg">
                                        <Input sx={{ display: 'none' }} accept="image/*" id="inputImageBg" type="file"
                                            onChange={(e) => this.handleGetImageBg(e)} />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Box>
                                <Box>
                                    <Button variant='outlined' sx={{ display: `${this.state.backgroundImageFile === '' ? 'none' : 'inline-flex'}` }}
                                        onClick={(e) => this.handleSendImage(this.state.backgroundImageFile, 'background')} endIcon={<Send />} color={'yellow'} size={'small'}>
                                        Send
                                    </Button>
                                </Box>
                            </Container>
                        </Box>
                        {/* INFORMATIONS */}
                        <Container maxWidth={'xl'}>
                            <Box sx={{ color: 'white' }} >
                                <Grid container sx={{ justifyContent: 'space-around' }}>

                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <Box>
                                            <Typography color={'primary'} variant="h6">PERSONAL INFORMATION</Typography>

                                            <List>
                                                <ListItem><Typography color='teal' className="userInfo">First Name : {this.state.firstName}</Typography></ListItem>
                                                <ListItem><Typography color='teal' className="userInfo">Last Name : {this.state.lastName}</Typography></ListItem>
                                                <ListItem><Typography color='teal' className="userInfo">Email Address : {this.state.email}</Typography></ListItem>
                                                <ListItem><Typography color='teal' className="userInfo">Nickname : {this.state.firstName}</Typography></ListItem>
                                            </List>

                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

                                        <Box>
                                            <Typography color={'primary'} variant="h6">ANIME INFORMATION</Typography>
                                            <List>
                                                <ListItem><AccessTime color="error" /> <Typography ml={1} className={'userInfo'}><Button onClick={() => this.openModal(this.state.animesInfo.seeLater, 'LATER', "#606060")}>OPEN MODAL</Button>Later : {this.state.animesInfo.seeLater.length}</Typography></ListItem>
                                                <ListItem><Visibility /><Typography ml={1} className={'userInfo'}><Button onClick={() => this.openModal(this.state.animesInfo.watching, 'WATCHING', "#606060")}>OPEN MODAL</Button>Watching  : {this.state.animesInfo.watching.length}</Typography></ListItem>
                                                <ListItem><Star color='yellow' /> <Typography ml={1} className={'userInfo'}><Button onClick={() => this.openModal(this.state.animesInfo.favorit, 'FAVORITES', "#606060")}>OPEN MODAL</Button>Favorites : {this.state.animesInfo.favorit.length}</Typography></ListItem>
                                                <ListItem><HistorySharp color='teal' />  <Typography ml={1} className={'userInfo'}><Button onClick={() => this.openModal(this.state.animesInfo.watched, 'WATCHED', "#606060")}>OPEN MODAL</Button>Watched : {this.state.animesInfo.watched.length}</Typography></ListItem>
                                                <ListItem><Delete color='secondary' /> <Typography ml={1} className={'userInfo'}><Button onClick={() => this.openModal(this.state.animesInfo.dropped, 'DROPPED', "#606060")}>OPEN MODAL</Button>Dropped : {this.state.animesInfo.dropped.length} </Typography></ListItem>
                                            </List>

                                        </Box>

                                    </Grid>
                                </Grid>
                            </Box>

                        </Container>


                    </Box>
                    <Box sx={{ justifyContent: 'end', display: 'flex' }}>
                        <Footer />
                    </Box>
                </Box>
            </>
        )
    }
}
export default Profile