import React, { Component } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styles from "../../../styles/Card.module.scss";
import SendIcon from "@mui/icons-material/SendOutlined";

/* DAR UMA PASTA SÓ PARA RadioRating */
class RadioRating extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Radio
          sx={{ bgcolor: "transparent" }}
          checkedIcon={<StarIcon sx={{ color: "#FFD32D" }} />}
          icon={
            Number(this.props.value) < this.props.rating ||
            Number(this.props.value) === this.props.rating ? (
              <StarIcon sx={{ color: "#FFD32D" }} />
            ) : (
              <StarBorderIcon sx={{ color: "#fff" }} />
            )
          }
          {...this.props}
        />
      </>
    );
  }
}

class RatingBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Box
          className={styles.bgRatingBar}
          sx={{
            position: "absolute",
            mt: 30,
            width: { xs: 350, sm: 280, md: 280, lg: 280, xl: 280 },
            color: "#fff",
            justifyContent: "space-around",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <FormControl>
            <Typography
              variant="body2"
              align="center"
              sx={{
                opacity: 5,
              }}
            >
              RATING
            </Typography>
            <RadioGroup
              name="radio-buttons-group"
              value={this.props.rating}
              onChange={this.props.funSaveRating}
              sx={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                className={styles.formControlLabel}
                value={1}
                control={<RadioRating value={1} rating={this.props.rating} />}
                label={""}
              />
              <FormControlLabel
                className={styles.formControlLabel}
                value={2}
                control={<RadioRating value={2} rating={this.props.rating} />}
                label={""}
              />
              <FormControlLabel
                className={styles.formControlLabel}
                value={3}
                control={<RadioRating value={3} rating={this.props.rating} />}
                label={""}
              />
              <FormControlLabel
                className={styles.formControlLabel}
                value={4}
                control={<RadioRating value={4} rating={this.props.rating} />}
                label={""}
              />
              <FormControlLabel
                className={styles.formControlLabel}
                value={5}
                control={<RadioRating value={5} rating={this.props.rating} />}
                label={""}
              />
            </RadioGroup>
            {/* <IconButton color='error' size='small'>
              <SendIcon />
            </IconButton> */}
          </FormControl>
        </Box>
      </>
    );
  }
}
export default RatingBar;
