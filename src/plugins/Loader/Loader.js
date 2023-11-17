import React from "react";
import Loading from "./Loading-transparent.gif";
const Loader = (props) => {
  return (
    <React.Fragment>
      <div className={`${props.active ? " " : "hidden"} text-center `}>
        <img
          src={Loading}
          alt="loading"
          style={{
            width: "50%",
            backgroundColor: "transparent",
          }}
          className="mx-auto"
        />
      </div>
    </React.Fragment>
  );
};

export default Loader;
/* import LoadingOverlay from "react-loading-overlay";
const Loader = ({ active, children }) => {
  return (
    <LoadingOverlay
      active={active}
      spinner
      text="Loading"
    >
      {children}
    </LoadingOverlay>
  );
};
export default Loader; */
   