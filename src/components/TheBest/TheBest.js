import { react, Component } from 'react';

/* MUI COMPONENTS */
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Input,
  Typography,
} from '@mui/material';

/* MY COMPONENTS */
import CardAnime from '../Card/CardAnime';
import NavBar from '../NavBar/NavBar';

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
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore';
import { db } from '../../connections/firebase';

class TheBest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animesList: [],
      loadingAnimes: true,
      pages:
      {
        nextPage: undefined,
        prevPage: undefined,
        firstPage: undefined,
      },
      currentPage: undefined,
      animesId: []
    };
  }

  async getAnimesId() {

    const collectionGlobalRef = collection(db, "global")
    const mostFavorites = query(collectionGlobalRef, orderBy("idUrl.metrics.favorit", "desc"), limit(17))

    const querySnapshot = (await getDocs(mostFavorites)).docs

    var animesId = []
    querySnapshot.map((doc) => {
      const data = doc.data()
      animesId.push(doc.id)
      this.setState({
        animesId: this.state.animesId.push(doc.id)
      })
    })
  }

  async pagination(link, limitItems, animesId) {
    window.scrollTo(0, 0);
    this.setState({
      animesList: [],
      loadingAnimes: true,
    });
    /* console.log(link) */

    const currentPage = link === undefined ? `https://kitsu.io/api/edge/anime?filter%5BID%5D=${animesId}&page[limit]=${limitItems}%5Boffset%5D=0`
      : link;

    const pageCount = Number(currentPage.substring(currentPage.indexOf('%5Boffset%5D=') + 13))

    const countPages = pageCount === 0 ? 1 : (pageCount / limitItems) + 1
    console.log(limitItems)
    this.setState({
      currentPage: countPages
    })

    await fetch(
      currentPage,
      { method: 'get' }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          pages: {
            nextPage: res.links.next,
            prevPage: res.links.prev,
            firstPage: res.links.first,
          }
        })

        return res.data;
      })
      .then((res) => {
        var arrayItem = [];
        res.map((item) => {
          arrayItem.push(item);
        });
        this.setState({
          animesList: arrayItem,
        });
      })
      .then(() => {
        this.setState({
          loadingAnimes: false,
        });
      });
  }


  async componentDidMount() {
    await this.getAnimesId().then(async () => {
      await this.pagination(undefined, 8, this.state.animesId);
    })

  }

  render() {
    const paginationItems = this.state.animesList;

    return (
      <>
        <NavBar />
        <Container maxWidth='lg' sx={{ marginTop: 7, minHeight: '100vh' }}>
          <Typography
            variant='h5'
            align='center'
            sx={{ paddingTop: 2, paddingBottom: 2 }}
          >
            THE BEST ANIMES
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'
            sx={{ paddingTop: 2, paddingBottom: 2 }}>
            The best animes according to estimates of the most favorites by you
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
                disabled={(this.state.pages.prevPage === undefined ? true : false)}
                onClick={() => this.pagination(this.state.pages.prevPage, 8)}
              >
                Prev
              </Button>
              <Button variant='contained' color='warning'>
                {`${this.state.currentPage}`}
              </Button>
              <Button variant='contained' disabled={this.state.pages.nextPage === undefined ? true : false} onClick={() => this.pagination(this.state.pages.nextPage, 8)}>
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
export default TheBest;

