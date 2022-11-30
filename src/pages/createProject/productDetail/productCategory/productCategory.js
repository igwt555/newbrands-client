import React, { useState, useEffect, useContext } from "react";
import { Col, Layout, Row } from "antd";
import { ContentTitle, ContentSubTitle } from "../../../../components/global";
import NavHeader from "../../../../components/createProject/NavHeader";
import CustomRadio from "../../../../components/createProject/customRadio";

import { getProductCategories, getProjectRessources } from '../../../../store/service';

import { StoreContext } from '../../../../store/store';

import './index.scss';

const { Content } = Layout;

const ProductCategory = (props) => {

    const { projectId, product, prodIt } = props;
    const { state, dispatch } = useContext(StoreContext);

    const [productItems, setProductItems] = useState(product);
    const [categories, setCategories] = useState([]);

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const categoriesInStore = state.productCategories;
    const error = state.error;
    const errorMsg = state.errorMsg;

    useEffect(() => {
        const fetchProducts = async () => {
            console.log('HEYYYY')
            const projectRessources = await getProjectRessources(projectId);
            const productCategories = await getProductCategories();

            if (productCategories.status === 200 && projectRessources.status === 200) {
                const result = productCategories.data;

                result.map((r) => {
                    r.displayed = projectRessources.data.project[0].product[prodIt].category !== undefined
                        ? projectRessources.data.project[0].product[prodIt].category.some(category => {
                            if (category.id === r.id) return true;

                            return false;
                    }) : false;
                });
                setCategories(result);
            }
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        const cpyCategories = [...categoriesInStore];
        const cpySelectedCategories = [...categories].filter(category => category.displayed === true);

        cpyCategories[prodIt] = cpySelectedCategories;
        
        dispatch({ type: 'setProductCategories', productCategories: cpyCategories });
    }, [categories]);

    useEffect(() => {
        setProductItems(product);
    }, [product]);

    useEffect(() => {
        setErr(error);
        setErrMsg(errorMsg);
    }, [error, errorMsg]);

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
                <ContentTitle>Catégorie de votre produit</ContentTitle>
                <ContentSubTitle>
                Indiquez ci-dessous la catégorie de produit correspondant à  <strong>“{product?.name}”</strong>
                </ContentSubTitle>
                <div className="categoriesListContainer">
                    <p className="errorMessage">{errMsg}</p>
                    <Row gutter={[24, 24]} style={{ paddingTop: "3rem" }}>
                        {categories?.map((category, index) => {
                            return (
                                <Col span={3} key={index}>
                                    <CustomRadio
                                        //key={this.state.displayCategories[0].id}
                                        title={category.name}
                                        onClick={() => {
                                            const cpy = [...categories];

                                            cpy.forEach((c) => c.displayed = false);

                                            cpy[index].displayed = true;
                                            setCategories(cpy);
                                            dispatch({ type: 'setError', error: false, errorMsg: '' });
                                        }}
                                        isSelected={category.displayed}
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default ProductCategory;