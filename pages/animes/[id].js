import { async } from "@firebase/util";
import { CircularProgress, LinearProgress } from "@mui/material";
import { bgcolor, Box, Stack } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimePage } from "../../src/components/index";
import getAnimeData from "../../src/connections/kitsuApi/getAnimeData";

/* export async function getStaticPaths() {
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
  try {
    const id = context.params.id;
    const data = await getAnimeData(id);

    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
} */

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;
    const data = null; /* await getAnimeData(id); */

    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default function Anime(props) {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const result = await getAnimeData(id);
      setData(result);
    })();
  }, []);

  return (
    <>
      {!data ? (
        <>
          <Box
            sx={{
              height: "100vh",
              width: "calc(100vw - 300px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <LinearProgress
              sx={{ width: "40%", height: "2px", marginBottom: "100px" }}
              variant={"indeterminate"}
              color={"dark"}
            />
          </Box>
        </>
      ) : (
        <AnimePage id={id} animeData={data} />
      )}
    </>
  );
}
