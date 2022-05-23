import { react, Component } from 'react';

import { Box } from '@mui/system';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Input,
  Typography,
} from '@mui/material';

/* CSS */
import './style/style.css';
import CardAnime from '../Card/CardAnime';

/* FIRE BASE */
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Footer from '../Footer/Footer';
import { grey } from '@mui/material/colors';

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationAnimes: [],
      currentPage: 1,
      loadingAnimes: true,
    };
  }
  async pagination(currentPage, limitItems) {
    window.scrollTo(0, 0); //this function makes the page go back to the top
    this.setState({
      paginationAnimes: [],
      loadingAnimes: true,
    });
    var initialPage = currentPage * limitItems - limitItems;
    await fetch(
      `https://kitsu.io/api/edge/anime?page[limit]=${limitItems}&page[offset]=${initialPage}&sort=${this.props.sort}`,
      { method: 'get' }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        var arrayItem = [];
        res.map((item) => {
          arrayItem.push(item);
        });
        console.log('arrayItem', arrayItem);
        this.setState({
          paginationAnimes: arrayItem,
        });
      })
      .then(() => {
        this.setState({
          loadingAnimes: false,
        });
      });
  }

  nextPage(limitItems) {
    const nextPage = this.state.currentPage + 1;
    this.pagination(nextPage, limitItems);
    this.setState({
      currentPage: nextPage,
    });
  }
  prevPage(limitItems) {
    const prevPage = this.state.currentPage - 1;
    this.pagination(prevPage, limitItems);
    this.setState({
      currentPage: prevPage,
    });
  }
  componentDidMount() {
    this.pagination(this.state.currentPage, 8);
  }

  render() {
    const paginationItems = this.state.paginationAnimes;

    return (
      <>
        <Container maxWidth='lg' sx={{ marginTop: 7, minHeight: '100vh' }}>
          <Typography
            variant='h5'
            align='center'
            sx={{ paddingTop: 2, paddingBottom: 2 }}
          >
            {this.props.title}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Box sx={{ minHeight: 900 }}>
            <Grid
              container
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-around'}
              sx={{ minHeight: 530 }}
            >
              <CircularProgress
                sx={{
                  display: `${this.state.loadingAnimes === true ? 'inline' : 'none'
                    }`,
                  marginTop: 25,
                }}
              />
              {paginationItems.map((anime, index) => {
                const data = {
                  /* Fazer tratamento para quando não encontrar algum dado dos itens abaixo*/
                  name:
                    anime.attributes.titles.en_jp === undefined || null
                      ? anime.attributes.titles.en_us === undefined || null
                        ? anime.attributes.titles.en === undefined || null
                          ? anime.attributes.titles.ja_jp
                          : anime.attributes.titles.en
                        : anime.attributes.titles.en_us
                      : anime.attributes.titles.en_jp,
                  bgImage:
                    anime.attributes.posterImage === null ? 'https://media.kitsu.io/anime/poster_images/9299/large.jpg' :
                      anime.attributes.posterImage.small === null ?
                        anime.attributes.posterImage.large === null
                          ? anime.attributes.posterImage.medium ===
                            null
                            ? anime.attributes.posterImage.original ===
                              null
                              ? anime.attributes.posterImage.tiny === null ? 'Não encontrou nada'
                                : anime.attributes.posterImage.tiny
                              : anime.attributes.posterImage.original
                            : anime.attributes.posterImage.medium
                          : anime.attributes.posterImage.large
                        : anime.attributes.posterImage.small,
                  synopsis:
                    anime.attributes.synopsis === ''
                      ? "Sorry, We don't have a synopsis for this anime"
                      : anime.attributes.synopsis,
                  id: anime.id,
                };

                return (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <CardAnime
                      key={index}
                      name={data.name}
                      bgImage={data.bgImage}
                      synopsis={data.synopsis}
                      id={data.id}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <ButtonGroup sx={{ mb: 1 }}>
              <Button
                variant='contained'
                disabled={this.state.currentPage === 1 ? true : false}
                onClick={() => this.prevPage(8)}
              >
                Prev
              </Button>
              <Button variant='contained' color='warning'>
                {`${this.state.currentPage}`}
              </Button>
              <Button variant='contained' onClick={() => this.nextPage(8)}>
                Next
              </Button>
            </ButtonGroup>
          </Box>
        </Container>
        <Box sx={{ justifyContent: 'end', display: 'flex' }}>
          <Footer />
        </Box>
      </>
    );
  }
}
export default Section;
