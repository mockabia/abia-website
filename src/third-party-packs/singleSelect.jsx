import React, { useEffect, useState } from "react";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
// import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./dropDown.css";
// fontawesome.library.add(faCaretDown);

const SingleSelect = ({ options, onFormSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    console.log(selected);
  };

  useEffect(() => {
    return () => {
      setSelectedOptions(null);
    };
  }, [onFormSubmit]);

  // const Option = (props) => {
  //   return (
  //     <div>
  //       <components.Option {...props}>
  //         <label className="label-checkbox">
  //           <input
  //             type="checkbox"
  //             checked={props.isSelected}
  //             onChange={() => null}
  //             className="custom-inputcheckbox"
  //           />
  //           <span className="checkbox-indicator"></span>
  //           {props.label}
  //         </label>
  //       </components.Option>
  //     </div>
  //   );
  // };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #c3bebe",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #c3bebe",
      },
      borderRadius: "10px",
      background: "#fafafa",
      padding: "5px",
      width: "100%",
      // maxHeight: "50px",
      maxWidth: "100%",
      "@media (min-width: 1190px)": {
        width: "96%",
        maxWidth: "96%",
      },
      // boxShadow: state.isFocused ? "0 0 0 2px lightblue" : "none",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "10px",
      borderRadius: "20px",
      padding: "15px",
      border: "1px solid #c3bebe",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#e7f5f4"
        : state.isFocused
        ? "#e7f5f4"
        : "white",
      color: state.isSelected ? "black" : "inherit",
      padding: "12px",
    }),
    indicatorSeparator: (defaultStyles) => {
      return {
        ...defaultStyles,
        display: "none",
      };
    },
    input: (provided) => ({
      ...provided,
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      inputMode: "none",
      tabIndex: "0",
    }),
  };

  const inputProps = {
    inputMode: "none",
  };

  const formatOptionLabel = ({ label }) => {
    return `${selectedOptions.length} items selected`;
  };
  //multi value
  const MultiValue = ({ index, getValue, ...props }) => {
    const maxToShow = 1;
    const overflow = getValue()
      .slice(maxToShow)
      .map((x) => x.label);

    return index < maxToShow ? (
      <components.MultiValue {...props} />
    ) : index === maxToShow ? (
      <MoreSelectedBadge items={overflow} />
    ) : null;
  };

  const MoreSelectedBadge = ({ items }) => {
    const style = {
      marginLeft: "auto",
      background: "#E8CF82",
      borderRadius: "15px",
      fontSize: "14px",
      fontWeight: "500",
      padding: "5px",
      // order: 99,
    };

    const title = items.join(", ");
    const length = items.length;
    const label = `+ ${length} item${length !== 1 ? "s" : ""} selected`;

    return (
      <div style={style} title={title}>
        {label}
      </div>
    );
  };

  return (
    <div>
      <style></style>
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please select account(s)"
      >
        <ReactSelect
          options={options}
          placeholder
          // isSearchable={true}
          inputProps={inputProps}
          isClearable={false}
          hideSelectedOptions={false}
          allowSelectAll={true}
          value={selectedOptions}
          onChange={handleSelectChange}
          styles={customStyles}
          components={{
            DropdownIndicator: () => (
              <div>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="dropDown-position"
                  style={{ color: "#7c7c7c" }}
                />
              </div>
            ),
            // Option,
          }}
        />
      </span>
    </div>
  );
};

export default SingleSelect;

// import React, { useEffect, useState } from "react";
// import { components } from "react-select";
// import { default as ReactSelect } from "react-select";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import "./singleSelect.css";

// const SingleSelect = ({ options, onFormSubmit }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleSelectChange = (selected) => {
//     setSelectedOptions(selected);
//     console.log(selected);
//   };

//   useEffect(() => {
//     return () => {
//       setSelectedOptions(null);
//     };
//   }, [onFormSubmit]);

//   const Option = (props) => {
//     return (
//       <div>
//         <components.Option {...props}>
//           <label className="label-checkbox">
//             {/* <input
//               type="checkbox"
//               checked={props.isSelected}
//               onChange={() => null}
//               className="custom-inputcheckbox"
//             />
//             <span className="checkbox-indicator"></span> */}
//             {props.label}
//           </label>
//         </components.Option>
//       </div>
//     );
//   };

//   const customStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       border: "1px solid #c3bebe",
//       boxShadow: "none",
//       "&:hover": {
//         border: "1px solid #c3bebe",
//       },
//       borderRadius: "10px",
//       background: "#fafafa",
//       padding: "10px",
//       width: "100%",
//       maxWidth: "100%",
//       "@media (min-width: 1190px)": {
//         width: "96%",
//         maxWidth: "96%",
//       },
//       // boxShadow: state.isFocused ? "0 0 0 2px lightblue" : "none",
//     }),
//     menu: (provided) => ({
//       ...provided,
//       // marginTop: "5px",
//       borderRadius: "20px",
//       border: "1px solid #c3bebe",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected
//         ? "#e7f5f4"
//         : state.isFocused
//         ? "#e7f5f4"
//         : "white",
//       color: state.isSelected ? "black" : "inherit",
//     }),
//     indicatorSeparator: (defaultStyles: any) => {
//       return {
//         ...defaultStyles,
//         display: "none",
//       };
//     },
//     input: (provided) => ({
//       ...provided,
//       WebkitUserSelect: "none",
//       MozUserSelect: "none",
//       msUserSelect: "none",
//       userSelect: "none",
//       // inputMode: "none",
//       // tabIndex: "0",
//     }),
//   };

//   return (
//     <div>
//       <style></style>
//       <span
//         className="d-inline-block"
//         data-toggle="popover"
//         data-trigger="focus"
//         data-content="Please select account(s)"
//       >
//         <ReactSelect
//           options={options}
//           placeholder
//           defaultValue={options[1]}
//           isSearchable={true}
//           isClearable={false}
//           hideSelectedOptions={false}
//           allowSelectAll={true}
//           value={selectedOptions}
//           onChange={handleSelectChange}
//           styles={customStyles}
//           components={{
//             DropdownIndicator: () => (
//               <div>
//                 <FontAwesomeIcon
//                   icon={faCaretDown}
//                   className="dropDown-position"
//                   style={{ color: "#7c7c7c" }}
//                 />
//               </div>
//             ),
//             Option,
//           }}
//           tabIndex={0}
//         />
//       </span>
//     </div>
//   );
// };

// export default SingleSelect;
