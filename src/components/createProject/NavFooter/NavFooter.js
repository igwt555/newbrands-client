import React, { Component } from "react";
import { Layout, Row, Col, Progress } from "antd";
import { Link } from "react-router-dom";
import { ButtonFooter, ButtonFooterOutlined } from "../../global";
import ClipLoader from 'react-spinners/ClipLoader';

import './index.scss';

const { Footer } = Layout;

class NavFooter extends Component {
  render() {
    return (
      <Footer
        style={{
          backgroundColor: "white",
          height: "120px",
          zIndex: "3",
          position: "fixed",
          bottom: "0",
          width: "calc(100% - 300px)",
        }}
      >
        <Progress
          percent={this.props.percent}
          showInfo={false}
          strokeColor="#00798c"
          type="line"
          strokeWidth="2px"
          style={{ marginBottom: "5px" }}
        />
        <Row justify="space-between">
          <div className="navFooterButton">
            <Col>
            {this.props.percent !== 0 && <>
              <Link to={this.props.prev}>
                {
                  this.props.currentStep > 0 && <ButtonFooterOutlined disabled={this.props.loading} style={this.props.loading ? {background: 'lightgray', border: 'none'} : {}} onClick={this.props.goPrev}>
                    <ClipLoader color={'#00798C'} loading={this.props.isSpinnerActive} size={20} /> Retour
                  </ButtonFooterOutlined>
                }
              </Link>
              </>}
            </Col>
          </div>
          <div className="navFooterButton">
            <Col>
              {this.props.isFinished ? (
                <a href="/dashboard">
                  <ButtonFooter>Continuer</ButtonFooter>
                </a>
              ) : this.props.next  &&(
                <Link to={
                  {
                    pathname: this.props.next,
                    key: Date(), // we could use Math.random, but that's not guaranteed unique.
                    state: {
                      applied: true
                    }
                  }}>
                  {
                    ((this.props.percent === 100 && this.props.stepsNumber === 1) || this.props.percent !== 100) && <ButtonFooter disabled={this.props.loading} style={this.props.loading ? {background: 'lightgray', border: 'none'} : {}} onClick={this.props.goNext}>
                      <ClipLoader color={'#fff'} loading={this.props.isSpinnerActive} size={20} /> Continuer
                    </ButtonFooter>
                  }
                </Link>
              )}
            </Col>
          </div>
        </Row>
      </Footer>
    );
  }
}

export default NavFooter;
