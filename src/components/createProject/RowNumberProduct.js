import React, { Component } from "react";
import { Row, Col } from "antd";
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

class RowNumberProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {defaultValue1: props.defaultValue1, defaultValue2: props.defaultValue2, defaultValue3: props.defaultValue3}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({defaultValue1: this.props.defaultValue1, defaultValue2: this.props.defaultValue2, defaultValue3: this.props.defaultValue3})
    }, 200)
  }

  render() {
    return (
      <Row gutter={12} justify="center" style={{ margin: "15px 0" }} 
      key={this.state?.defaultValue1}>
        <Col span={3}>
          <ThemeProvider theme={theme}>
            <TextField
              key={this.state?.defaultValue1}
              fullWidth
              id="filled-secondary"
              label={<CustomLabelInput>Nom du produit</CustomLabelInput>}
              variant="outlined"
              color="primary"
              onChange={this.props.onInput1}
              defaultValue={this.state?.defaultValue1}
            />
          </ThemeProvider>
        </Col>
        <Col span={3}>
          <ThemeProvider theme={theme}>
            <TextField
              type="number"
              min="1"
              max="999"
              fullWidth
              id="filled-secondary"
              label={<CustomLabelInput>Nombre de pièces</CustomLabelInput>}
              variant="outlined"
              color="primary"
              onChange={this.props.onInput2}
              defaultValue={this.props.defaultValue2}
            />
          </ThemeProvider>
        </Col>
        <Col span={3}>
          <ThemeProvider theme={theme}>
            <TextField
              type="text"
              fullWidth
              id="filled-third"
              label={<CustomLabelInput>Taille</CustomLabelInput>}
              variant="outlined"
              color="primary"
              onChange={this.props.onInput3}
              defaultValue={this.props.defaultValue3}
            />
          </ThemeProvider>
        </Col>
      </Row>
    );
  }
}

export default RowNumberProduct;
