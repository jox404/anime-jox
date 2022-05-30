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
            animesName: []
        };
    }

    async getAnimesInfo() {
        const arrayOfId = this.props.animesId[0]

        var animeList = []

        fetch(`https://kitsu.io/api/edge/anime?filter%5BID%5D=${arrayOfId}`, {
            method: 'get',
        }).then((res) => {
            return res.json();
        })
            .then((res) => {
                console.log('resposta', res)

                this.setState({
                    animesName: res.data,
                });

            })

    }

    redirectPage(id) {
        window.location.replace(`#/anime/${id}`)
    }

    async componentDidMount() {
        console.log('chamou02')
        this.getAnimesInfo();
    }
    render() {
        const dataAnime = this.state.animesName
        console.log('dataAnime', this.state.animesName)
        return (
            <>
                <Box className='containerAnimesInfo'>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: this.props.color }}>
                                    <TableCell colSpan={2} sx={{ textAlign: 'center' }}>
                                        {this.props.title}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.animesName.map((anime, index) => {
                                    console.log('anime :', anime)
                                    return (
                                        <TableRow key={index}>
                                            <TableCell key={`cell01${index}`}>{anime.attributes.slug}</TableCell>
                                            <TableCell key={`cell02${index}`}>
                                                <Button key={`btn${index}`} variant='contained' onClick={() => this.redirectPage(anime.id)}>See</Button>
                                            </TableCell>
                                        </TableRow>
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
