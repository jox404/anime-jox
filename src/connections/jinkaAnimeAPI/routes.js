export default async function getAnime(idManga) {
  await fetch(`https://api.jikan.moe/v4/anime/30`, {
    method: 'get',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(typeof res);
      return res;
    });
}

/* class RouteJinka extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mangaData: '',
    };
  }

  render() {
    var name = this.state.mangaData.data.mal_id;
    console.log(name);
    return (
      <>
        <button onClick={() => this.getManga(30)}>teste</button>
        <CardManga
          name={'name'}
          author={'author'}
          publisher={'publisher'}
          bgImage={'bgImage'}
          resume={'resume'}
        />
      </>
    );
  }
} */
