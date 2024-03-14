import React, { useEffect } from "react";

import SearchSection from "./Directory/SearchSection";
import RenderList from "./Directory/RenderList";
import { useState } from "react";
import BottomFilter from "../../components/layouts/BottomFilter";
import "../Style/GeneralDirectory.css";

const Directory = () => {

  const [stateOptions, setStateOptions]       = useState([]);
  const [formvalues, setFormvalues]           = useState({});
  
  useEffect(() => {
    //setFormvalues(values => ({...values,['sort']: 'N' }))
  }, []);

  return (
    <div className="directory-page-container">
      <SearchSection formvalues={formvalues} setFormvalues={setFormvalues} setStateOptions={setStateOptions}/>
      {Object.keys(formvalues).length>0 && <RenderList formvalues={formvalues} stateOptions={stateOptions}/>}
      <BottomFilter />
    </div>
  );
};

export default Directory;
