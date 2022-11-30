import React, { Component } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { CheckCircleFilled } from "@ant-design/icons";
import { TextField, ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

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

const CustomRadioInput = (props) => {

    const { isSelected, value, onClick, onInput, title, onChange } = props;

    return (
        <CustomRadioInputBtn
          onClick={onClick}
          style={{
            borderColor: isSelected ? "#00798C" : "#dddddd",
            color: isSelected ? "#00798C" : "#000",
          }}
        >
            <Row type="flex" align="middle" gutter={24}>
                <Col>
                <CheckCircleFilled
                    style={{
                    color: isSelected ? "#00798C" : "transparent",
                    fontSize: "29px",
                    border: isSelected ? "1px solid #fff" : "1px solid #dddddd",
                    marginTop: "7px",
                    borderRadius: "500px",
                    }}
                />
                </Col>
                <Col>
                {isSelected ? (
                    <ThemeProvider theme={theme}>
                    <TextField
                        fullWidth
                        id="filled-secondary"
                        variant="outlined"
                        color="primary"
                        value={value}
                        onInput={onInput}
                        onChange={(e) => {
                            onChange(e);
                        }}
                        type="date"
                    />
                    </ThemeProvider>
                ) : (
                    <div>{title}</div>
                )}
                </Col>
            </Row>
        </CustomRadioInputBtn>
    );
}

/*class CustomRadioInput extends Component {
  render() {
    const { isSelected } = this.props;
    return (
      <CustomRadioInputBtn
        onClick={this.props.onClick}
        style={{
          borderColor: isSelected ? "#00798C" : "#dddddd",
          color: isSelected ? "#00798C" : "#000",
        }}
      >
        <Row type="flex" align="middle" gutter={24}>
          <Col>
            <CheckCircleFilled
              style={{
                color: isSelected ? "#00798C" : "transparent",
                fontSize: "29px",
                border: isSelected ? "1px solid #fff" : "1px solid #dddddd",
                marginTop: "7px",
                borderRadius: "500px",
              }}
            />
          </Col>
          <Col>
            {isSelected ? (
              <ThemeProvider theme={theme}>
                <TextField
                  fullWidth
                  id="filled-secondary"
                  variant="outlined"
                  color="primary"
                  onInput={this.props.onInput}
                  type="date"
                />
              </ThemeProvider>
            ) : (
              <div>{this.props.title}</div>
            )}
          </Col>
        </Row>
      </CustomRadioInputBtn>
    );
  }
}*/

export default CustomRadioInput;

const CustomRadioInputBtn = styled.button`
  margin: 5px 0;
  font-size: 24px;
  text-align: left;
  padding: 0px 50px;
  height: 80px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #dddddd;
  cursor: pointer;

  &:hover {
    border-color: #00798c !important;
    color: #00798c !important;
    transition: all ease-out 0.2s !important;
  }
`;
