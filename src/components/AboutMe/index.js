import { Divider, Typography, Box } from "@mui/material";

export default function AboutMe() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        m: "50px 0px",
      }}
    >
      <Typography variant="h1" fontSize={30} mb={3} fontWeight={500}>
        About Me
      </Typography>
      <Typography variant="body2" fontSize={18}>
        Estou em busca do meu primeiro sim, para dar andamento na busca pelos
        meus sonhos. Sou desenvolvedor full stack/junior, moro em São Paulo/SP
        Sou formado em Analise e desenvolvimento de sistemas pela Estácio de Sá.
        Hoje meu foco é no estudo das tecnologias que cercam o Javascript tanto
        no front quanto no back.
      </Typography>
    </Box>
  );
}
