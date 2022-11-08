import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimePage } from "../../src/components/index";
import getAnimeData from "../../src/connections/kitsuApi/getAnimeData";

export default function Anime() {
  const router = useRouter();
  const [animeData, setDataAnime] = useState();

  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    } else {
      const fetchAnimeById = async () => {
        const response = await getAnimeData(id);
        setDataAnime(response);
      };
      fetchAnimeById();
    }
  }, [id]);
  return (
    <>
      {animeData === undefined ? (
        <></>
      ) : (
        <AnimePage id={id} animeData={animeData} />
      )}
    </>
  );
}
