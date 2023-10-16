import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: "#eaad36",
        },
        iconEmpty: {
          color: "#ccc",
        },
      },
    },
  },
});

const RatingInfo = () => {
  const rating = 2.5;
  const votes = 1200;
  const formattedVotes = votes.toLocaleString();
  return (
    <ThemeProvider theme={customTheme}>
      <div className="rating-ifno-div space-x-2">
        <h5 className="font-semibold text-[16px] font-source-pro">4.5</h5>
        <Rating
          name="half-rating-read"
          size="medium"
          precision={0.25}
          value={rating}
          readOnly
        />
        <span className="text-[#8e8e8e] font-source-pro ">
          ({formattedVotes})
        </span>
      </div>
    </ThemeProvider>
  );
};

export default RatingInfo;
