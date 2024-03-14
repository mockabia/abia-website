import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
//import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { teal } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { MenuItem, Popper, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ColorSortButton } from "../../../components/FormStyle";
import "../../Style/GeneralDirectory.css";
import * as GeneralJS from "../General";

function handleClick(event) {
  event.preventDefault();
}

const linkStyle = {
  textDecorationLine: "none", // Set text-decoration-line to none
  fontFamily: "Raleway",
};
const ColorSearchButton = styled(Button)(({ theme }) => ({
  display: "flex", // Display the button when the screen size is 600px or larger
  color: theme.palette.getContrastText(teal[500]),
  backgroundColor: teal[200],
  border: "1px solid #a3a3a3",
  borderRadius: "0px",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: teal[500],
  },
}));
const AutoCompleteStyle = styled(Autocomplete)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "0px",
    width: "230px",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "Manrope, sans-serif",
  },
  "& .MuiFormLabel-root": {
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "Manrope, sans-serif",
    zIndex: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiInputBase-root": {
      width: "140px",
    },
  },
}));

const PopperMy = function (props) {
  return <Popper {...props} style={{ width: 300 }} placement="bottom-start" />;
};

const SearchSection = (props) => {
  const navigate                              = useNavigate();
  const formvalues                            = props.formvalues;
  const setFormvalues                         = props.setFormvalues;
  const [errors, setErrors]                   = React.useState({});
  const setStateOptions                       = props.setStateOptions;
  const [locationOptions, setLocationOptions] = useState([]);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [locationOpt, setLocationOpt]         = useState(false);
  const location                              = useLocation();
  const pathname                              = location.pathname;
  
  useEffect(() => {
    GeneralJS.fetchDirectoryDropdowns(setServicesOptions,setLocationOptions,setStateOptions,pathname,setFormvalues);
  }, []);
 
  /* useEffect(() => {

  }, [pathname]); */
  useEffect(() => {
    let locationOpt = locationOptions.length>0 && locationOptions.filter(
        (option) => {
          if(option.regionsUrl === formvalues.locations){
            return option;
          }
        }
    )
    setLocationOpt(locationOpt[0])
  }, [formvalues.locations]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    GeneralJS.customJS.handleChange(name, value, setFormvalues, setErrors)
  };
  const handleInputChangeVal = (name, value) => {
    GeneralJS.customJS.handleChange(name, value, setFormvalues, setErrors)
  };
  const handleSubmit = () => {
    let newUrl = '';
    if(formvalues.category!=undefined){
      newUrl += '/'+formvalues.category;
    }
    if(formvalues.state!=undefined){
      newUrl += '/'+formvalues.state;
    }
    if(formvalues.locations!=undefined){
      newUrl += '/'+formvalues.locations;
    }
    navigate(newUrl)
  };

  const BreadCrumbsComponent = () => {
    return (
        <div>
            <div className="directory-breadcrumbs">
                <Breadcrumbs
                separator={<NavigateNextIcon fontSize="14px" color="#515151" />}
                aria-label="breadcrumb"
                >
                    
                <Link key="1" color="#515151" fontSize="14px" onClick={handleClick} style={linkStyle} >
                    <span className="no-underline">Home</span>
                </Link>
                ,
                <Link key="2" color="#515151" fontSize="14px" onClick={handleClick} style={linkStyle} >
                    <span className="no-underline ">Wedding-Venues</span>
                </Link>
                ,
                {formvalues.formvalues && (
                    <Typography key="3" color="#515151" fontSize="14px" style={linkStyle} >
                    {formvalues.formvalues}
                    </Typography>
                )}
                {formvalues.regions && (
                    <Typography key="4" color="#515151" fontSize="14px" style={linkStyle} >
                    {formvalues.regions}
                    </Typography>
                )}
                </Breadcrumbs>
            </div>
            {/* mobile */}
            <div className="directory-breadcrumbs-mob ">
                <Breadcrumbs aria-label="breadcrumb">
                <Link key="1" color="#515151" fontSize="14px" onClick={handleClick} style={linkStyle} >
                    Home
                </Link>
                ,
                <Link key="2" color="#515151" fontSize="14px" onClick={handleClick} style={linkStyle} >
                    Wedding-Venues
                </Link>
                ,
                {formvalues.formvalues && (
                    <Typography key="3" color="#515151" fontSize="14px" style={linkStyle} >
                    {formvalues.formvalues}
                    </Typography>
                )}
                {formvalues.regions && (
                    <Typography key="4" color="#515151" fontSize="14px" style={linkStyle} >
                    {formvalues.regions}
                    </Typography>
                )}
                </Breadcrumbs>
            </div>
        </div>
    )
  }
  

  const SearchFields = () => {
    const mainCity = "";
    return (
        <div className="main-section">
            <div className="directory-main-grid">
                <h1 className="main-content-header">
                <span>{mainCity} </span> {""}Wedding Venues
                </h1>
            </div>
            <p className="directory-main-grid main-content-desc">
                Find the most popular <span>{mainCity}</span> Wedding Venues in
                Australia. You'll find a variety of ABIA-Awarded venues ranging from
                beach-front, hinterland, private estates, vineyards, luxury venues and
                more.
                <br />
                <br />
                Be sure to research you favourites and read their customer-reviews, if
                you like what you read, you can send them a direct email to organise
                your site-visit.{" "}
            </p>
            <div className="directory-main-grid filter-section">
                <div className="dirmain-search-button ">
                    <AutoCompleteStyle
                        disablePortal
                        name="category"
                        id="grouped-demo"
                        options={servicesOptions}
                        PopperComponent={PopperMy}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                        value={formvalues.category}
                        onChange={(event, newValue) => {
                            handleInputChangeVal('category',newValue.value)
                        }}
                        disableClearable={true}
                        renderOption={(props, option) => (
                        <div
                            {...props}
                            style={{
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            fontSize: "14px",
                            color: "#515151",
                            fontFamily: "Manrope",
                            fontWeight: "500",
                            borderBottom: "1px solid #EFEFEF",
                            }}
                        >
                            {option.label}
                        </div>
                        )}
                    />
                    {/* <pre>{JSON.stringify(locationOptions, null, 2)}</pre> */}
                    <AutoCompleteStyle
                        disablePortal
                        id="combo-box-demo"
                        name="locations"
                        options={locationOptions}
                        groupBy={(option) => option.state}
                        getOptionLabel={(option) => `${option.regions}, ${option.url}`}
                        PopperComponent={PopperMy}
                        renderInput={(params) => <TextField {...params} label="Location" />}
                        renderGroup={(params) => (
                        <Box key={params.key} bac>
                            <Accordion>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                borderTop: "1px solid #EFEFEF",
                                height: "25px",
                                }}
                            >
                                <Typography
                                fontSize={14}
                                fontStyle="normal"
                                fontWeight="600"
                                fontFamily="Manrope"
                                p={1}
                                >
                                {params.group}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                style={{
                                fontSize: "14px",
                                fontFamily: "Manrope",
                                fontWeight: "500",
                                }}
                            >
                                {/* {params.children} */}
                                {params.children.map((child, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && (
                                    <div
                                        style={{
                                        borderTop: "1px solid #EFEFEF",
                                        }}
                                    />
                                    )}
                                    {child}
                                </React.Fragment>
                                ))}
                            </AccordionDetails>
                            </Accordion>
                        </Box>
                        )}
                        value={locationOpt}
                        onChange={(event, newValue) => {
                            handleInputChangeVal('state',newValue.url)
                            handleInputChangeVal('locations',newValue.regionsUrl)
                        }}
                        disableClearable={true}
                    />

                    <ColorSearchButton clas variant="outlined" onClick={handleSubmit}>
                        <SearchRoundedIcon sx={{ fontSize: 30, color: "white" }} />
                    </ColorSearchButton>
                </div>
            </div>
            <div className="directory-main-grid sort-section">
            <div className="">
                <h5 className="sort-header text-[10px] mb-[0.5rem]">Sort By</h5>
                <div className="dir-sortfilter  text-[12px] space-x-3">
                    <ColorSortButton variant="contained" onClick={(e) => { handleInputChangeVal('sort','R'); }} >Recently Reviewed</ColorSortButton>
                    <div style={{ margin: "5px" }} />
                    <ColorSortButton variant="contained" onClick={(e) => { handleInputChangeVal('sort','N'); }} >Most Reviewed</ColorSortButton>
                    <div style={{ margin: "5px" }} />
                    <ColorSortButton variant="contained" onClick={(e) => { handleInputChangeVal('sort','A'); }} >Most Awarded</ColorSortButton>
                </div>
                </div>
            </div>
        </div>
    )
  }
  return (
    <>
        <BreadCrumbsComponent />
        <SearchFields />
    </>
  );
};

export default SearchSection;
