import React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function PasswordInput({ formik, name, ifError }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { values, handleChange, handleBlur , errors } = formik;

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="">
      <FormControl variant="outlined" sx={{ width: "100%" }}>
        <TextField
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          name={name}
          placeholder="Enter Password"
          error={ifError(name)}
          helperText={ifError(name) && errors[name]}
          type={showPassword ? "text" : "password"}
          fullWidth
          className="w-100"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </div>
  );
}

export default PasswordInput;
