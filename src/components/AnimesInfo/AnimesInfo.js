import {
    Box,
    Button,
    List,
    ListItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Component, react } from 'react';

/* CSS */
import './style/style.css';

class AnimesInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animesName: [],
        };
    }

    getAnimesInfo() {
        console.log('getAnimesInfo', typeof this.props.animesId)
        const arrayOfId = this.props.animesId
        console.log('arrayOfId', arrayOfId)
        arrayOfId.map((id) => {
            console.log(id)
            const idAnime = id
            fetch(`https://kitsu.io/api/edge/anime/${id}`, {
                method: 'get',
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    const id = res.data.id;
                    const name = res.data.attributes.slug;
                    this.setState({
                        animesName: this.state.animesName.concat({ name: name, id: id }),
                    });
                })
                .then(() => {
                    this.state.animesName.map((nameId) => console.log(nameId.name));
                });
        });
    }

    redirectPage(id) {
        window.location.replace(`#/anime/${id}`)
    }

    componentDidMount() {
        this.getAnimesInfo();
    }
    render() {
        return (
            <>
                <Box className='containerAnimesInfo'>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: this.props.color }}>
                                    <TableCell colSpan={2} sx={{ textAlign: 'center' }}>
                                        {this.props.title}LALALA
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.animesName.map((anime, index) => {
                                    return (
                                        <>
                                            <TableRow key={index}>
                                                <TableCell key={`cell01${index}`}>{anime.name}</TableCell>
                                                <TableCell key={`cell02${index}`}>
                                                    <Button key={`btn${index}`} variant='contained' onClick={() => this.redirectPage(anime.id)}>See</Button>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <Table></Table>
                    </TableContainer>
                </Box>
            </>
        );
    }
}

export default AnimesInfo;
