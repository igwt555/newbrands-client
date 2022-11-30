import React, { Component } from "react";
import { Layout, Row } from "antd";
import { ContentTitle } from "../../../components/global";
import NavHeader from "../../../components/createProject/NavHeader";

const { Content } = Layout;

class ProductDetail extends Component {
  render() {
    return (
      <Layout>
        <NavHeader title="Produits" />
        <Content
          style={{
            margin: "0",
            padding: "70px 100px",
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          <ContentTitle>
            Ici le système de renseignement des produits
          </ContentTitle>
          <center
            style={{
              padding: "100px 0",
              fontFamily: "Gelion Medium",
              fontSize: "24px",
            }}
          >
            <Row>Produits</Row>
          </center>
        </Content>
      </Layout>
    );
  }
}

export default ProductDetail;
