import React, { useEffect } from "react";

import SearchSection from "./Directory/SearchSection";
import RenderList from "./Directory/RenderList";
import Main from "./GeneralDirectory/Main";
import Cards from "./GeneralDirectory/Cards";
import CardGrid from "./GeneralDirectory/Cards";
import { useState } from "react";
import BottomFilter from "../../components/layouts/BottomFilter";
import "../Style/GeneralDirectory.css";
import * as GeneralJS from "./General";

const Directory = () => {

  const [stateOptions, setStateOptions]       = useState([]);
  const [formvalues, setFormvalues]           = useState({});
  
  useEffect(() => {
    
  }, []);

  return (
    <div className="directory-page-container">
      <SearchSection formvalues={formvalues} setFormvalues={setFormvalues} setStateOptions={setStateOptions}/>
      {/* <Main
        onChangeCity={handleIndeCity}
        onChangeSubUrb={handleIndexSubUrb}
      /> */}
      <RenderList formvalues={formvalues} stateOptions={stateOptions}/>
      <BottomFilter />
    </div>
  );
};

export default Directory;
