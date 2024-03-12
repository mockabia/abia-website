import React, { useEffect,useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { BpIcon, BpCheckedIcon } from "../components/FormStyle";

export default function ControlledCheckbox(props) {
  const [checked, setChecked] = React.useState(true);

  useEffect(() => {
      setChecked(props.value=='1' ? true : false)
  }, [props.value]);

  const handleChange = (e) => {
    const targetName  = e.target.name;
    const targetValue = e.target.checked ? 1 : 0;
    setChecked(e.target.checked);
    props.onChange(targetName, targetValue);
  };

  // Inspired by blueprintjs
  function BpCheckbox(props) {
    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
          transform: "scale(1.5)",
        }}
        disableRipple
        checked={checked}
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }

  return (
    <BpCheckbox
      name={props.name || 'checkbox'}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
