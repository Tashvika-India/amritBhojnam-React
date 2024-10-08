import * as React from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#F26722", // Set to your theme color
        opacity: 1,
        border: 0,
        ...theme.palette.mode === "dark" && {
          backgroundColor: "#FF8F52", // Lighter shade for dark mode
        },
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#F26722", // Thumb color on focus
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.palette.mode === "dark" && {
        color: theme.palette.grey[600],
      },
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.palette.mode === "dark" && {
        opacity: 0.3,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.palette.mode === "dark" && {
      backgroundColor: "#39393D",
    },
  },
}));

export default function IosSwitch({ name,checked,onChange }) {
  return (
    <FormControlLabel sx={{ m: 0 }}
      name={name}
      control={<IOSSwitch checked={checked}
        onChange={onChange} sx={{ m: 1 }}  />}
    />
  );
}
