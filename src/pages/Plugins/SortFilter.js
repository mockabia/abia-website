import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "./style.css";
import { ColorSortButton } from "../../components/FormStyle";

const SortFilter = () => {
  return (
    <div className="">
      <h5 className="sort-header text-[10px] mb-[0.5rem]">Sort By</h5>
      <div className="dir-sortfilter  text-[12px] space-x-3">
        <ColorSortButton variant="contained">Recently Reviewed</ColorSortButton>
        <div style={{ margin: "5px" }} />
        <ColorSortButton variant="contained">Most Reviewed</ColorSortButton>
        <div style={{ margin: "5px" }} />
        <ColorSortButton variant="contained">Most Awarded</ColorSortButton>
      </div>
    </div>
  );
};

export default SortFilter;
