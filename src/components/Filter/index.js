import {
  Checkbox,
  Typography,
  Box,
  ThemeProvider,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  createTheme,
} from "@mui/material";
import styles from "../../../styles/Filter.module.scss";
import limitCharacters from "../../Tools/limitCharacters";

const filter = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#111111",
          padding: 0,
          padding: "0px 5px",
          height: 300,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#212121",
          color: "#fff",
          margin: "2px 2px",
          borderRadius: 5,
          minHeight: 1,
          height: 35,
          padding: "2px 5px",
          ":hover": {
            backgroundColor: "#606060",
          },
          zIndex: 1,
          "&.Mui-focusVisible": {
            backgroundColor: "#808080",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          ".MuiOutlinedInput-input": { padding: "5px 20px 5px 20px" },
          color: "#808080",
          borderRadius: 10,

          textAlign: "center",
          transition: "0.5s",
          /*   backgroundColor: "#303030", */
          svg: {
            color: "#808080",
            transition: "0.5s",
          },
          ":hover": {
            /* backgroundColor: "#606060", */
            transition: "0.5s",
            color: "#fff",
            svg: {
              color: "#fff",
              transition: "0.5s",
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Quicksand",
          fontWeight: 500,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          backgroundColor: "#202020",
          color: "#fff",
          width: 0,
          height: 0,
          margin: "0px 5px",
        },
      },
    },
  },
});

export default function Filter(props) {
  const { title, list, setData, value } = props;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event.target.value);
    setData(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <ThemeProvider theme={filter}>
      <FormControl sx={{ m: 1, width: 200 }}>
        <Select
          multiple
          value={value}
          renderValue={() => `${title}`}
          variant={"outlined"}
          onChange={handleChange}
        >
          {list.map((filterName, index) => {
            return (
              <MenuItem key={index} value={filterName}>
                <ListItemText>{limitCharacters(filterName, 20)}</ListItemText>
                <Checkbox checked={value.indexOf(filterName) > -1} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
