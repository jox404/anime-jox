import { Component, react } from 'react';

import { useParams } from 'react-router';

//NAVBAR
import NavBar from '../NavBar/NavBar';

//MUI
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    Typography,
} from '@mui/material';
import {
    AccessTime,
    Delete,
    HistorySharp,
    Star,
    Visibility,
} from '@mui/icons-material';
import Footer from '../Footer/Footer';
import { ref } from 'firebase/storage';
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../connections/firebase';
import { getAuth } from 'firebase/auth';
import { render } from '@testing-library/react';

//CSS
import './style/style.css';
import { bgcolor, fontSize } from '@mui/system';
import Score from './Score';

class AnimePageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userUid: 'gtsk0ZYtJSRB0eTSrXhkwizVaec2',
            season: '',
            studio: '',
            episodes: '',
            statusAnime: '',
            type: '',
            year: '',
            synopsis: '',
            imgAnime: '',
            title: '',
            slug: '',
            alternativeTitle: '',
            seeLater: false,
            watching: false,
            favorit: false,
            watched: false,
            dropped: false,
            global: {},
            animesInfo: {}
        };
    }

    async getAnimeInfo() {
        await fetch(`https://kitsu.io/api/edge/anime/${this.props.idUrl}`, {
            method: 'get',
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                const titles = res.data.attributes.titles;
                const data = {
                    season: res.data.attributes.startDate,
                    episodes: res.data.attributes.episodeCount,
                    statusAnime: res.data.attributes.status,
                    type: res.data.type,
                    year: res.data.attributes.startDate,
                    synopsis:
                        res.data.attributes.synopsis === ''
                            ? "Sorry, We don't have a synopsis for this anime"
                            : res.data.attributes.synopsis,
                    imgAnime: res.data.attributes.posterImage.small,

                    title:
                        titles.en === undefined
                            ? titles.en_jp === undefined
                                ? titles.ja_jp
                                : titles.en_jp
                            : titles.en,
                    alternativeTitle:
                        titles.ja_jp === undefined ? titles.en_jp : titles.ja_jp,
                    slug: res.data.attributes.slug,
                };

                this.setState({
                    season: data.season,
                    studio: data.studio,
                    episodes: data.episodes,
                    statusAnime: data.statusAnime,
                    type: data.type,
                    year: data.year,
                    synopsis: data.synopsis,
                    imgAnime: data.imgAnime,
                    title: data.title,
                    alternativeTitle: data.alternativeTitle,
                    slug: data.slug,
                });
            });
    }

    async getElementStatus() {
        const docRef = doc(db, 'users', this.state.userUid);

        await getDoc(docRef).then((res) => {
            this.setState({
                animesInfo: res._document.data.value.mapValue.fields.animesInfo.mapValue.fields
            })

            const animeId = this.props.idUrl;

            const dataExists =
                res._document.data.value.mapValue.fields.animeList.mapValue.fields[
                    animeId
                ] === undefined
                    ? false
                    : true;

            if (dataExists == true) {
                const data =
                    res._document.data.value.mapValue.fields.animeList.mapValue.fields[
                        animeId
                    ].mapValue.fields;

                this.setState({
                    seeLater: data.seeLater.booleanValue,
                    watching: data.watching.booleanValue,
                    favorit: data.favorit.booleanValue,
                    watched: data.watched.booleanValue,
                    dropped: data.dropped.booleanValue,
                });
            } else {
                const animeListItem = 'animeList.' + [animeId];
                const docRef = doc(db, 'users', this.state.userUid);

                updateDoc(docRef, {
                    [animeListItem]: {
                        dropped: false,
                        favorit: false,
                        seeLater: false,
                        watched: false,
                        watching: false,
                    },
                });

            }
        });
    }

    async getElementGlobalStatus(value) {
        const globalRef = doc(db, 'users', 'global');

        await getDoc(globalRef).then((res) => {
            const animeId = this.props.idUrl;

            const dataExists =
                res._document.data.value.mapValue.fields.animeList.mapValue.fields[
                    animeId
                ] === undefined
                    ? false
                    : true;

            if (dataExists == true) {
                getDoc(globalRef).then((res) => {
                    const data =
                        res._document.data.value.mapValue.fields.animeList.mapValue.fields[
                            animeId
                        ].mapValue.fields;
                    this.setState({
                        global: {
                            dropped: data.dropped.integerValue,
                            favorit: data.dropped.integerValue,
                            seeLater: data.dropped.integerValue,
                            watched: data.dropped.integerValue,
                            watching: data.dropped.integerValue,
                        },
                    });
                });
            } else {
                updateDoc(globalRef, {
                    [`animeList.${animeId}`]: {
                        dropped: 0,
                        favorit: 0,
                        seeLater: 0,
                        watched: 0,
                        watching: 0,
                    },
                });
                this.getElementGlobalStatus();
            }
        });
    }

    async handleStatusElement(value, element) {

        const docRef = doc(db, 'users', this.state.userUid);

        const idUrl = this.props.idUrl.toLocaleString();

        //update nos status do anime com relação ao usuário
        await updateDoc(docRef, {
            [`animeList.${idUrl}.${element}`]: value,
        });
        this.setState({
            [element]: value,
        });

        //faz um update no número de "See Later","Favorit"...etc que aquele anime recebeu
        const globalDocRef = doc(db, 'users', 'global');
        const oldValueGlobal = parseInt(this.state.global[element])

        if (value === true) {
            const newGlobalValue = oldValueGlobal + 1;
            updateDoc(globalDocRef, {
                [`animeList.${idUrl}.${element}`]: newGlobalValue,
            })

            this.getElementGlobalStatus();///atualiza o this.state
        } else {
            const newGlobalValue = oldValueGlobal - 1;

            updateDoc(globalDocRef, {
                [`animeList.${idUrl}.${element}`]: newGlobalValue,
            })

            this.getElementGlobalStatus();///atualiza o this.state
        }
        //atualiza a lista "InfoAnimes" do usuario
        if (value === true) {
            await updateDoc(docRef, {
                [`animesInfo.${element}`]: arrayUnion(`${this.props.idUrl}`),
            })
            this.getElementStatus()//atualiza o this.state
        } else {
            await updateDoc(docRef, {
                [`animesInfo.${element}`]: arrayRemove(`${this.props.idUrl}`)
            })
            this.getElementStatus()//atualiza o this.state
        }

    }

    sendStatusAnimeListUser(value, element) {
        if (value === true) {
            this.handleStatusElement(false, element);
        } else {
            this.handleStatusElement(true, element);
        }
    }

    componentDidMount() {
        this.getElementStatus();
        this.getAnimeInfo();
        this.getElementGlobalStatus();
    }
    render() {
        return (
            <>
                <NavBar />
                <Container maxWidth='lg' sx={{ mt: 3 }}>
                    <Box
                        sx={{
                            maxWidth: 1000,
                            p: 2,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                        bgcolor={'#212121'}
                        color={'#fff'}
                        className={'border'}
                    >
                        <Grid container sx={{ justifyContent: 'space-between' }}>
                            <Grid item xs={12} sm={7} md={4} lg={4}>
                                <img src={this.state.imgAnime} width={300} height={400}></img>
                            </Grid>
                            <Grid item xs={0} sm={5} md={4} lg={6} sx={{ display: { xs: 'none', sm: 'inline-flex', md: 'none', lg: 'none', xl: 'none' }, marginTop: 0 }}>
                                <Score numberReviews={500} rating={8.5} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={8}>
                                <Grid
                                    container
                                >
                                    <Grid item md={8} lg={6}>
                                        <Box>
                                            <Typography variant='h1' fontSize={40}>
                                                {this.state.slug}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={6} sx={{ display: { xs: 'inline-flex', sm: 'none', md: 'inline-flex', lg: 'inline-flex', } }}>
                                        <Score numberReviews={500} rating={8.5} />
                                    </Grid>
                                    <Grid item xs={10} sm={12} md={12} lg={12}>
                                        <Box>
                                            <List>
                                                <ListItem>
                                                    <Typography>
                                                        Studio : {this.state.alternativeTitle}
                                                    </Typography>
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <Typography>Episodes : {this.state.episodes}</Typography>
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <Typography>Status : {this.state.statusAnime}</Typography>
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <Typography>Type : {this.state.type}</Typography>
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <Typography>Year : {this.state.year}</Typography>
                                                </ListItem>
                                                <Divider />
                                            </List>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2} sm={12} md={12} lg={12}>
                                        <Box
                                            className={'groupBtnStatus'}
                                        >
                                            <Button
                                                endIcon={
                                                    <AccessTime color='darkBlue' className='iconBtn' />
                                                }
                                                color={`${this.state.seeLater === true ? 'orange' : 'dark'
                                                    }`}
                                                variant='contained'
                                                size='small'
                                                onClick={() =>
                                                    this.sendStatusAnimeListUser(
                                                        this.state.seeLater,
                                                        'seeLater'
                                                    )
                                                }
                                                className={'btnOnlyIcon btnStatus'}
                                            >
                                                <Typography className={'btnNameHide btnNameSize'}>
                                                    See later
                                                </Typography>
                                            </Button>
                                            <Button
                                                endIcon={<Visibility color='white' className='iconBtn' />}
                                                color={`${this.state.watching === true ? 'orange' : 'dark'
                                                    }`}
                                                variant='contained'
                                                size='small'
                                                onClick={() =>
                                                    this.sendStatusAnimeListUser(
                                                        this.state.watching,
                                                        'watching'
                                                    )
                                                }
                                                className={'btnOnlyIcon btnStatus'}
                                            >
                                                <Typography className={'btnNameHide btnNameSize'}>
                                                    Watching
                                                </Typography>
                                            </Button>
                                            <Button
                                                endIcon={<Star color='yellow' className='iconBtn' />}
                                                color={`${this.state.favorit === true ? 'orange' : 'dark'}`}
                                                variant='contained'
                                                size='small'
                                                onClick={() =>
                                                    this.sendStatusAnimeListUser(
                                                        this.state.favorit,
                                                        'favorit'
                                                    )
                                                }
                                                className={'btnOnlyIcon btnStatus'}
                                            >
                                                <Typography className={'btnNameHide btnNameSize'}>
                                                    Favorit
                                                </Typography>
                                            </Button>
                                            <Button
                                                endIcon={<HistorySharp color='teal' className='iconBtn' />}
                                                color={`${this.state.watched === true ? 'orange' : 'dark'}`}
                                                variant='contained'
                                                size='small'
                                                onClick={() =>
                                                    this.sendStatusAnimeListUser(
                                                        this.state.watched,
                                                        'watched'
                                                    )
                                                }
                                                className={'btnOnlyIcon btnStatus'}
                                            >
                                                <Typography className={'btnNameHide btnNameSize'}>
                                                    Watched
                                                </Typography>
                                            </Button>
                                            <Button
                                                endIcon={<Delete color='secondary' className='iconBtn' />}
                                                color={`${this.state.dropped === true ? 'orange' : 'dark'}`}
                                                variant='contained'
                                                size='small'
                                                onClick={() =>
                                                    this.sendStatusAnimeListUser(
                                                        this.state.dropped,
                                                        'dropped'
                                                    )
                                                }
                                                className={'btnOnlyIcon btnStatus'}
                                            >
                                                <Typography className={'btnNameHide btnNameSize'}>
                                                    Dropped
                                                </Typography>
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box >
                            <Typography sx={{ textAlign: 'justify' }}>
                                <b>Synopsis:</b>
                                {this.state.synopsis}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'block', }} className='footer'>
                        <Footer />
                    </Box>
                </Container>

            </>
        );
    }
}

const AnimePage = (props) => {
    const { id } = useParams();
    return (
        <>
            <AnimePageComponent idUrl={id} />
        </>
    );
};

export default AnimePage;