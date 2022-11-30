import React, { useEffect, useState, useContext } from "react";
import { Layout, Row, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { ContentTitle } from "../../../components/global";
import NavHeader from "../../../components/createProject/NavHeader";
import "./numberProduct.scss";
import RowNumberProduct from "../../../components/createProject/RowNumberProduct";
import { CustomLabelInput } from '../../../components/global';
import { createMuiTheme } from "@material-ui/core/styles";
import { TextField, ThemeProvider } from '@material-ui/core';

import { StoreContext } from '../../../store/store';

const { Content } = Layout;

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

const NumberProduct = () => {

    const [data, setData] = useState([]);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const { state, dispatch } = useContext(StoreContext);

    const productListInStore = state.productList;
    const projectTypesInStore = state.typesSelection;
    const error = state.error;
    const errorMsg = state.errorMsg;

    useEffect(() => {
        if (productListInStore !== undefined && productListInStore.length > 0)
            setData(productListInStore);
        else
            setData(
                [
                    projectTypesInStore.length === 1 && projectTypesInStore[0].name === 'Stylisme' ?
                    {
                        name: '',
                        color: '',
                        numberOfVariants: ''
                    }
                    :
                    {
                        name: '',
                        quantity: '',
                        size: ''
                    }
                ]
            );
    }, []);

    useEffect(() => {
        dispatch({ type: 'setError', error: false, errorMsg: '' });
    }, [JSON.stringify(data)]);

    useEffect(() => {
        setErr(error);
        setErrMsg(errorMsg);
    }, [error, errorMsg]);

    return (
        <Layout>
            <NavHeader title="Noms et nombre de produit" />
            <Content
            style={{
                margin: "0",
                padding: "70px 100px",
                minHeight: 280,
                backgroundColor: "white",
            }}
            >
                <ContentTitle>
                    Quels sont vos produits ?
                </ContentTitle>
                <Row justify="center" align="middle">
                    <Button
                    style={{
                        backgroundColor: "#00798C",
                        color: "white",
                        outline: "none",
                        border: "none",
                        boxShadow: "0 0 0 0 red",
                    }}
                    shape="circle"
                    icon={<MinusOutlined />}
                    size="large"
                    onClick={() => {
                        const cpy = [...data];

                        if (data.length > 1) cpy.pop();
                        setData(cpy);
                        dispatch({ type: 'setProductList', productList: cpy });
                    }}
                    />
                    <ContentTitle style={{ margin: "10px 30px" }}>
                        {data.length}
                    </ContentTitle>

                    <Button
                    style={{
                        backgroundColor: "#00798C",
                        color: "white",
                        outline: "none",
                        border: "none",
                    }}
                    shape="circle"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => {
                        const cpy = [...data];

                        cpy.push(
                            projectTypesInStore.length === 1 && projectTypesInStore[0].name === 'Stylisme' ?
                            {
                                name: '',
                                color: '',
                                numberOfVariants: ''
                            }
                            :
                            {
                                name: '',
                                quantity: '',
                                size: ''
                            }
                        );

                        setData(cpy);
                        dispatch({ type: 'setProductList', productList: cpy });
                    }}
                    />
                </Row>
                <center
                    style={{
                    padding: "100px 0",
                    fontFamily: "Gelion Medium",
                    fontSize: "24px",
                    }}
                >
                    {
                        data.length > 0 && data.map((d, index) => (
                            projectTypesInStore.length === 1 && projectTypesInStore[0].name === 'Stylisme'
                            ?
                            <div className="inputGroupContainer" key={`product-${index}`}>
                                <div className={`inputFieldContainer ${err && d.name.length === 0 ? 'error' : ''}`}>
                                    <TextField
                                    key={0}
                                    fullWidth
                                    id="filled-secondary"
                                    label={<CustomLabelInput>Nom du produit</CustomLabelInput>}
                                    variant="outlined"
                                    color="primary"
                                    onChange={(e) => {
                                        const cpy = data;

                                        cpy[index].name = e.target.value;
                                        setData(cpy);
                                        dispatch({ type: 'setProductList', productList: cpy });
                                    }}
                                    value={d.name}
                                    />
                                </div>

                                <div className={`inputFieldContainer ${err && d.color === '' ? 'error' : ''}`}>
                                    <TextField
                                    key={0}
                                    fullWidth
                                    id="filled-secondary"
                                    label={<CustomLabelInput>Couleur</CustomLabelInput>}
                                    variant="outlined"
                                    color="primary"
                                    onChange={(e) => {
                                        const cpy = data;

                                        cpy[index].color = e.target.value;
                                        setData(cpy);
                                        dispatch({ type: 'setProductList', productList: cpy });
                                    }}
                                    value={d.color}
                                    />
                                </div>

                                <div className={`inputFieldContainer ${err && (d.numberOfVariants === '' || d.numberOfVariants === 0) ? 'error' : ''}`}>
                                    <TextField
                                    key={0}
                                    fullWidth
                                    id="filled-secondary"
                                    label={<CustomLabelInput>Nombre de variantes</CustomLabelInput>}
                                    variant="outlined"
                                    color="primary"
                                    onChange={(e) => {
                                        const cpy = data;

                                        e.target.value.replace(/\D/g,'');

                                        cpy[index].numberOfVariants = (!isNaN(e.target.value) && e.target.value.length > 0) ? parseInt(e.target.value) : '';
                                        setData(cpy);
                                        dispatch({ type: 'setProductList', productList: cpy });
                                    }}
                                    value={d.numberOfVariants}
                                    />
                                </div>
                            </div>
                            :
                            <div className="inputGroupContainer" key={`product-${index}`}>
                                <div className={`inputFieldContainer ${err && d.name.length === 0 ? 'error' : ''}`}>
                                    <TextField
                                    key={0}
                                    fullWidth
                                    id="filled-secondary"
                                    label={<CustomLabelInput>Nom du produit</CustomLabelInput>}
                                    variant="outlined"
                                    color="primary"
                                    onChange={(e) => {
                                        const cpy = data;

                                        cpy[index].name = e.target.value;
                                        setData(cpy);
                                        dispatch({ type: 'setProductList', productList: cpy });
                                    }}
                                    value={d.name}
                                    />
                                </div>

                                <div className={`inputFieldContainer ${err && (d.quantity === '' || d.quantity === 0) ? 'error' : ''}`}>
                                    <TextField
                                    key={0}
                                    fullWidth
                                    id="filled-secondary"
                                    label={<CustomLabelInput>Nombre</CustomLabelInput>}
                                    variant="outlined"
                                    color="primary"
                                    onChange={(e) => {
                                        const cpy = data;

                                        e.target.value.replace(/\D/g,'');

                                        cpy[index].quantity = (!isNaN(e.target.value) && e.target.value.length > 0) ? parseInt(e.target.value) : '';
                                        setData(cpy);
                                        dispatch({ type: 'setProductList', productList: cpy });
                                    }}
                                    value={d.quantity}
                                    />
                                </div>

                                <div className={`inputFieldContainer ${err && d.size.length === 0 ? 'error' : ''}`}>
                                    <select className="selectInput" value={d.size} onChange={(e) => {
                                        const cpy = data;

                                        cpy[index].size = e.target.value;
                                        setData(cpy);
                                        dispatch({ type: 'setProductList', productList: cpy });
                                    }}>
                                        <option value="">Choisissez une taille</option>
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                </div>
                            </div>
                        ))
                    }
                    <p className="numberProductsErrorMsg">{errMsg}</p>
                </center>
            </Content>
        </Layout>
    );
}

export default NumberProduct;