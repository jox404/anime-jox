import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { React, Component } from 'react';

import CardAnime from '../Card/CardAnime';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer'

//ICONS
import CircularProgress from '@mui/material/CircularProgress';

//CSS
import './style/style.css';

class CustomizedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationAnimes: [],
      linksButton: [],
      currentPage: 0,
      loadingAnimes: true,
      animeFilters: [],
      selectedGenres: [],
      nextFilter: undefined,
      lastFilter: '',
      loadingGenres: true,
      showGender: false,
      showCategory: false,
      showSeason: false,
    };
  }
  async filterByCategori(filterBy, filters, limitPerPage, link) {
    window.scrollTo(0, 0);
    const filterLink =
      link === undefined
        ? `https://kitsu.io/api/edge/anime?filter%5B${filterBy}%5D=${filters}&page%5Blimit%5D=${limitPerPage}&page%5Boffset%5D=0`
        /*   `https://kitsu.io/api/edge/anime?filter%5B${filterBy}%5D=${filters}&page%5Blimit%5D=${limitPerPage}&page%5Boffset%5D=0` */
        : link;
    const currentPage =
      parseInt(
        filterLink.substring(filterLink.indexOf('&page%5Boffset%5D=') + 18)
      ) /
      limitPerPage +
      1;

    this.setState({ paginationAnimes: [], currentPage: currentPage });
    await fetch(filterLink, { method: 'get' })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          paginationAnimes: this.state.paginationAnimes.concat(res.data),
        });
        this.setState({
          linksButton: res.links,
          loadingAnimes: false,
        });
      });
    this.setState({
      showGender: false,
      showCategory: false,
      showSeason: false,
    })
  }

  async listFiltersAvailable(filter, getValue, sortBy) {
    const firstLink = `https://kitsu.io/api/edge/${filter}?page%5Blimit%5D=10&page%5Boffset%5D=0&sort=${sortBy}`
    var data = []
    //the api provides a request with a limit of 10 filters(genres, category...)
    for (var i = firstLink; i !== undefined; i = this.state.nextFilter) {
      var link =
        this.state.nextFilter === undefined
          ? `https://kitsu.io/api/edge/${filter}?page%5Blimit%5D=10&page%5Boffset%5D=0&sort=${sortBy}`
          : this.state.nextFilter;
      await fetch(link, { method: 'get' })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const filters = res.data.map((element) => {
            const animeFilters = element.attributes[getValue];
            data.push(animeFilters)
          });
          this.setState({
            lastFilter: res.links.last,
            nextFilter: res.links.next,
          });
        });
    }
    this.setState({
      animeFilters: data,
      loadingGenres: false,
    });

  }
  handleSeclectGenres(e) {
    const value = e.target.value
    const checked = e.target.checked
    if (checked === true) {
      this.setState({
        selectedGenres: this.state.selectedGenres.concat(value)
      })
      console.log(this.state.selectedGenres)
    } else {
      this.setState({
        selectedGenres: this.state.selectedGenres.filter(function (e) { return e !== value })
      })
    }
  }

  handleShowFilter(e) {
    const valueState = e.target.value
    if (valueState === 'gender') {
      this.state.showGender === false ? this.setState({ showGender: true }) :
        this.setState({ showGender: false })
    } else if (valueState === 'category') {
      this.state.showCategory === false ? this.setState({ showCategory: true }) :
        this.setState({ showCategory: false })
    } else if (valueState === 'season') {
      this.state.showSeason === false ? this.setState({ showSeason: true }) :
        this.setState({ showSeason: false })
    }
  }

  componentDidMount() {
    this.filterByCategori('genres', 'comedy', 8, undefined);

    /* this.listFiltersAvailable('categories', 'slug', 'id') */
    this.listFiltersAvailable('genres', 'name', 'name')

    console.log(this.state.animeFilters)
  }
  render() {
    return (
      <>
        <NavBar />

        <Container
          sx={{
            marginTop: 7,
            paddingTop: 2,
            bgcolor: '#95989c',
          }}
        >
          <Typography textAlign={'center'} variant='h5' mb={2}>
            CUSTOMIZED SEARCH
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <ButtonGroup>
              <Button variant='contained' value='gender' onClick={(e) => this.handleShowFilter(e)}>Gender</Button>
              <Button variant='contained' value='category' onClick={(e) => this.handleShowFilter(e)}>Category</Button>
              <Button variant='contained' value='season' onClick={(e) => this.handleShowFilter(e)}>Season</Button>
            </ButtonGroup>
          </Box>

          <Box sx={{ minHeight: 470, display: `${this.state.showGender === true ? 'inline' : 'none'}` }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
              <CircularProgress
                sx={{
                  display: `${this.state.loadingGenres === true ? 'flex' : 'none'
                    }`,
                  marginTop: 22

                }}
              />
            </Box>
            <FormGroup>
              <Grid container>
                {this.state.animeFilters.map((category, index) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={2}
                      lg={2}
                      xl={2}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingLeft: { xs: 2, sm: 6, lg: 0, xl: 0 },
                      }}
                      key={index}
                    >
                      <FormControlLabel
                        key={index}
                        control={<Checkbox value={category} onClick={(e) => this.handleSeclectGenres(e)} />}
                        label={category}
                      />
                    </Grid>
                  );
                })}

              </Grid>
              <Box sx={{ display: `${this.state.loadingGenres === true ? 'none' : 'flex'}`, justifyContent: 'space-around' }}>
                <Button variant={'contained'} onClick={() => this.filterByCategori('genres', this.state.selectedGenres, 8, undefined)}>Search</Button>
              </Box>
            </FormGroup>
          </Box>
          <Box mt={2} sx={{ minHeight: 0 }}>
            <Grid container justifyContent={'space-around'}>
              <CircularProgress
                sx={{
                  display: `${this.state.loadingAnimes === true ? 'flex' : 'none'
                    }`,
                  marginTop: 40,
                }}
              />
              {this.state.paginationAnimes.map((anime, index) => {
                const data = {
                  name:
                    anime.attributes.titles.en_jp === undefined || null
                      ? anime.attributes.titles.en_us === undefined || null
                        ? anime.attributes.titles.en === undefined || null
                          ? anime.attributes.titles.ja_jp
                          : anime.attributes.titles.en
                        : anime.attributes.titles.en_us
                      : anime.attributes.titles.en_jp,
                  bgImage: anime.attributes.posterImage.large,
                  synopsis:
                    anime.attributes.synopsis === ''
                      ? "Sorry, We don't have a synopsis for this anime"
                      : anime.attributes.synopsis,
                  id: anime.id,
                };

                return (
                  <Grid
                    item
                    key={index + 'card'}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={3}
                  >
                    <CardAnime
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
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}
          >
            <ButtonGroup>
              <Button
                variant='contained'
                disabled={this.state.currentPage === 1 ? true : false}
                onClick={() =>
                  this.filterByCategori(
                    'categories',
                    'adventure',
                    8,
                    this.state.linksButton.first
                  )
                }
              >
                First
              </Button>
              <Button
                variant='contained'
                disabled={
                  this.state.linksButton.prev === undefined ? true : false
                }
                onClick={() =>
                  this.filterByCategori(
                    'categories',
                    'adventure',
                    8,
                    this.state.linksButton.prev
                  )
                }
              >
                Prev
              </Button>

              <Button variant='contained' color='warning'>
                {this.state.currentPage}
              </Button>

              <Button
                variant='contained'
                disabled={
                  this.state.linksButton.next === undefined ? true : false
                }
                onClick={() =>
                  this.filterByCategori(
                    'categories',
                    'adventure',
                    8,
                    this.state.linksButton.next
                  )
                }
              >
                Next
              </Button>

              <Button
                variant='contained'
                onClick={() =>
                  this.filterByCategori(
                    'categories',
                    'adventure',
                    8,
                    this.state.linksButton.last
                  )
                }
                disabled={
                  this.state.linksButton.last === undefined ? true : false
                }
              >
                Last
              </Button>
            </ButtonGroup>
          </Box>
          <Box>
            <Footer />
          </Box>
        </Container >
      </>
    );
  }
}

export default CustomizedSearch;
