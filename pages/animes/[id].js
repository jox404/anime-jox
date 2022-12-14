import { CircularProgress, LinearProgress } from "@mui/material";
import { bgcolor, Box, Stack } from "@mui/system";
import { useRouter } from "next/router";
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
  try {
    const id = context.params.id;
    const data = await getAnimeData(id);
    console.log(id, data, "id & data");
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
  console.log(id, "id");
  console.log(router.isFallback, " router.isFallback,");
  console.log(props.data, "props.data");
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* {props.data === undefined ? (
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
        <AnimePage id={id} animeData={props.data} />
      )} */}
    </>
  );
}
