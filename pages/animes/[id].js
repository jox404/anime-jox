import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimePage } from "../../src/components/index";
import getAnimeData from "../../src/connections/kitsuApi/getAnimeData";

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
      {
        params: {
          id: "2",
        },
      },
      {
        params: {
          id: "3",
        },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const data = await getAnimeData(id);
  return {
    props: {
      data: data,
    },
  };
}

export default function Anime(props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      {props.data === undefined ? (
        <></>
      ) : (
        <AnimePage id={id} animeData={props.data} />
      )}
    </>
  );
}
