import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../../Style/GeneralDirectory.css";

function handleClick(event) {
  event.preventDefault();
}

const linkStyle = {
  textDecorationLine: "none", // Set text-decoration-line to none
  fontFamily: "Raleway",
};

const BreadCrumbs = ({ mainCity, suburb }) => {
  return (
    <div>
      <div className="directory-breadcrumbs">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="14px" color="#515151" />}
          aria-label="breadcrumb"
        >
          <Link
            key="1"
            color="#515151"
            fontSize="14px"
            onClick={handleClick}
            style={linkStyle}
          >
            <span className="no-underline">Home</span>
          </Link>
          ,
          <Link
            key="2"
            color="#515151"
            fontSize="14px"
            onClick={handleClick}
            style={linkStyle}
          >
            <span className="no-underline ">Wedding-Venues</span>
          </Link>
          ,
          {mainCity && (
            <Typography
              key="3"
              color="#515151"
              fontSize="14px"
              style={linkStyle}
            >
              {mainCity}
            </Typography>
          )}
          {suburb && (
            <Typography
              key="4"
              color="#515151"
              fontSize="14px"
              style={linkStyle}
            >
              {suburb}
            </Typography>
          )}
        </Breadcrumbs>
      </div>
      {/* mobile */}
      <div className="directory-breadcrumbs-mob ">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            key="1"
            color="#515151"
            fontSize="14px"
            onClick={handleClick}
            style={linkStyle}
          >
            Home
          </Link>
          ,
          <Link
            key="2"
            color="#515151"
            fontSize="14px"
            onClick={handleClick}
            style={linkStyle}
          >
            Wedding-Venues
          </Link>
          ,
          {mainCity && (
            <Typography
              key="3"
              color="#515151"
              fontSize="14px"
              style={linkStyle}
            >
              {mainCity}
            </Typography>
          )}
          {suburb && (
            <Typography
              key="4"
              color="#515151"
              fontSize="14px"
              style={linkStyle}
            >
              {suburb}
            </Typography>
          )}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default BreadCrumbs;
