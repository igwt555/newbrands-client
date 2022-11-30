import React, { Component } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { TextField, ThemeProvider } from "@material-ui/core";
import { CustomLabelInput } from "../global";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#00798C",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const CustomTextField = (props) => {

    const { value, label, onInput, handleKeyDown, multiline, rows, type, pattern, required, disabled } = props;

    return (
        <ThemeProvider theme={theme}>
            <TextField
            value={value}
            fullWidth
            id="filled-secondary"
            label={<CustomLabelInput>{label}</CustomLabelInput>}
            variant="outlined"
            color="primary"
            onInput={onInput}
            multiline={multiline}
            rows={rows}
            type={type}
            pattern={pattern}
            required={required}
            disabled={disabled}
            onKeyDown={handleKeyDown}
            />
        </ThemeProvider>
    );
}

export default CustomTextField;
