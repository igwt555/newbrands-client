import React, { useState, useEffect, useContext } from "react";
import { Layout, Row, Col } from "antd";
import { ContentTitle, ContentSubTitle } from "../../../../components/global";
import NavHeader from "../../../../components/createProject/NavHeader";
import CustomTextField from "../../../../components/createProject/customTextField";


import { StoreContext } from '../../../../store/store';

const { Content } = Layout;
let index = document.location.pathname.split('/').pop();

const ProductWeight = (props) => {

    const { product, prodIt } = props;
    const { state, dispatch } = useContext(StoreContext);

    const materialsInStore = state.productMaterials;

    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const cpy = [...materialsInStore][prodIt];

        cpy.map((material) => {
            if (material.quantity === undefined)
                material.quantity = 0;
        });
        setMaterials(cpy);
    }, []);

    useEffect(() => {
        const cpyMaterials = [...materialsInStore];

        cpyMaterials[prodIt] = materials;
        dispatch({ type: 'setProductMaterials', productMaterials: cpyMaterials });
    }, [materials]);

    return (
        <Layout>
            <NavHeader title={`${product?.name} : catégorie`} />
            <Content
                style={{
                    margin: "0",
                    padding: "70px 100px 10px 100px",
                    minHeight: 280,
                    backgroundColor: "white",
                }}
            >
                <ContentSubTitle>
                {product?.name} ({product?.quantity} pièce{`${product?.quantity > 1 ? 's' : ''}`})
                </ContentSubTitle>
                <ContentTitle>Grammages souhaitées</ContentTitle>
                <ContentSubTitle>
                Afin de préciser qualité et spécificités de votre vêtement, nous vous proposons d'indiquer ci-dessous vos préférences de grammage.
                </ContentSubTitle>
                <center>
                    {
                        materials.map((material, index) => {
                            return <Row gutter={[24, 24]} style={{ paddingTop: "1rem" }} justify="center" key={`product-weight-${index}`}>
                                <Col span={12}>
                                    <CustomTextField
                                        key={index}
                                        value={material.title}
                                        label="Nom_matiere_X"
                                        required={false}
                                    />
                                </Col>
                                <Col span={6}>
                                    <CustomTextField
                                        value={material.quantity !== undefined ? material.quantity : 0}
                                        onInput={(e) => {
                                            const cpy = [...materials];

                                            cpy[index].quantity = e.target.value;
                                            setMaterials(cpy);
                                        }}
                                        label="(g/m2)"
                                    />
                                </Col>
                            </Row>
                        })
                    }
                </center>
            </Content>
        </Layout>
    );
}

export default ProductWeight;