import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { BpIcon, BpCheckedIcon } from "../components/FormStyle";

export default function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
