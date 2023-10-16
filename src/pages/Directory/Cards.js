import React from "react";
import Card from "./Card";
import "./style.css";
import Card2 from "./Card2";
import Card3 from "./Card3";

const CardGrid = () => {
  return (
    <div>
      <div className="cards-grid-container">
        <Card />
        <Card2 />
        <Card3 />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default CardGrid;
