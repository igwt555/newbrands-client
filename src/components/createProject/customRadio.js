import React, { Component } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { CheckCircleFilled } from "@ant-design/icons";
import { HiOutlineInformationCircle } from 'react-icons/hi'

class CustomRadio extends Component {
  render() {
    const { isSelected } = this.props;
    return (
      <CustomRadioBtn
      title={this.props.title}
        onClick={this.props.onClick}
        style={{
          borderColor: isSelected ? "#00798C" : "#dddddd",
          color: isSelected ? "#00798C" : "#000",
        }}
      >
        <Row type="flex" style={{ marginLeft: "0!important", marginRight: "0!important" }} gutter={24}>
          <Col>
            <CheckCircleFilled
              style={{
                color: isSelected ? "#00798C" : "transparent",
                fontSize: "1.5rem",
                border: isSelected ? "1px solid #fff" : "1px solid #dddddd",
                borderRadius: "500px",
              }}
            />
          </Col>
          <Col>{this.props.title}</Col>
          {this.props.info && <>
            <Col style={{
              marginLeft: "auto",
              marginRight: "0",
            }}>
              <HiOutlineInformationCircle style={{
                position: "relative",
                zIndex: "2",
                cursor: "default",
                color: "#ddd",
                fontSize: "1.5rem",
                borderRadius: "500px",
              }}
              /></Col>
          </>}
        </Row>
      </CustomRadioBtn>
    );
  }
}

export default CustomRadio;

const CustomRadioBtn = styled.button`
  margin: 5px 0;
  font-size: 1.2rem;
  text-align: left;
  div {
    margin-left: 0;
    margin-right: 0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-items: flex-start;
  }
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
