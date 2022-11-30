import React, { useState, useEffect, useContext } from "react";
import { Col, Layout, Row } from "antd";
import { ContentTitle, ContentSubTitle } from "../../../../components/global";
import NavHeader from "../../../../components/createProject/NavHeader";
import CustomRadio from "../../../../components/createProject/customRadio";
import { AiOutlineSearch } from "react-icons/ai";

import { getCountriesOfManufacture, getProjectRessources } from "../../../../store/service";

import { StoreContext } from '../../../../store/store';

import './index.scss';

const { Content } = Layout;

const ProductCountryOfManufacture = (props) => {

    const { projectId, product, prodIt } = props;
    const { state, dispatch } = useContext(StoreContext);

    const [productItems, setProductItems] = useState(product);
    const [countriesOfManufacture, setCountriesOfManufacture] = useState([]);

    const [search, setSearch] = useState('');
    const [found, setFound] = useState([]);

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const countriesOfManufactureInStore = state.productCountriesOfManufacture;
    const error = state.error;
    const errorMsg = state.errorMsg;

    useEffect(() => {
        const fetchProducts = async () => {
            const projectRessources = await getProjectRessources(projectId);
            const productCountriesOfManufacture = await getCountriesOfManufacture();

            if (productCountriesOfManufacture.status === 200 && projectRessources.status === 200) {
                const result = productCountriesOfManufacture.data;

                result.map((r) => {
                    r.displayed = projectRessources.data.project[0].product[prodIt].country !== undefined
                    && r.name === projectRessources.data.project[0].product[prodIt].country ? true : false;
                });
                setCountriesOfManufacture(result);
            }
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        const cpyCountriesOfManufacture = [...countriesOfManufactureInStore];
        const cpySelectedCountriesOfManufacture = [...countriesOfManufacture].filter(countryOfManufacture => countryOfManufacture.displayed === true).map(filteredCountry => filteredCountry.name);

        cpyCountriesOfManufacture[prodIt] = cpySelectedCountriesOfManufacture[0];

        dispatch({ type: 'setProductCountriesOfManufacture', productCountriesOfManufacture: cpyCountriesOfManufacture });
    }, [countriesOfManufacture]);

    useEffect(() => {
        setProductItems(product);
    }, [product]);

    useEffect(() => {
        if (search.length > 0) {
            console.log(search);
            const cpy = [...countriesOfManufacture].filter(country => country.name && country.name.toLowerCase().includes(search.toLowerCase()));
            
            console.log(cpy);
            setFound(cpy);
        } else setFound([]);
    }, [search]);

    useEffect(() => {
        setErr(error);
        setErrMsg(errorMsg);
    }, [error, errorMsg]);

    const renderItems = () => {
        if (found.length === 0 && search.length > 0)
            return <center className="antd-no-result">
                <h2>Aucun résultat</h2>
            </center>
        else {
            return (found.length > 0 ? found : countriesOfManufacture)?.map((countryOfManufacture, index) => {
                return (
                    <Col span={3} key={index}>
                        <CustomRadio
                            //key={this.state.displaycountriesOfManufacture[0].id}
                            title={countryOfManufacture.name}
                            onClick={() => {
                                const cpy = [...countriesOfManufacture];
                                const i = countriesOfManufacture.indexOf(countryOfManufacture);

                                cpy.forEach((c) => c.displayed = false);

                                cpy[i].displayed = true;
                                setCountriesOfManufacture(cpy);

                                dispatch({ type: 'setError', error: false, errorMsg: '' });
                            }}
                            isSelected={countryOfManufacture.displayed}
                        />
                    </Col>
                )
            })
        }
    }

    return (
        <Layout>
            {/* <NavHeader title={`${product?.name} : catégorie`} /> */}
            <Content
                style={{
                    margin: "0",
                    padding: "70px 100px 10px 100px",
                    minHeight: 280,
                    backgroundColor: "white",
                }}
            >
                {/*<ContentSubTitle>
                    {product?.quantity} (pièces)
                </ContentSubTitle>*/}
                <ContentTitle>Pays de confection</ContentTitle>
                <ContentSubTitle>
                    Durant cet OnBoarding, plusieurs questions vont vous êtres posées afin de comprendre au mieux votre activité afin d’établir une offre correspondant à vos besoins adapté à votre projet.
                </ContentSubTitle>
                <center className="ant-searchBarContainer">
                    <AiOutlineSearch className="ant-searchBar" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="ant-text-input" placeholder="Recherchez un pays" />
                    <span href="#" className="ant-search-link" onClick={() => { /*materials.length === 0 ? this.getData() : this.setState({ matters: [] }); counting = []*/ }}>
                        {countriesOfManufacture.length === 0 ? "Retour à la recherche" : "Recherche personnalisée ?"}
                    </span>
                </center>
                <div className="countriesOfManufactureListContainer">
                    <p className="errorMessage">{errMsg}</p>
                    <Row gutter={[24, 24]} style={{ paddingTop: "3rem" }}>
                        {
                        renderItems()/*countriesOfManufacture?.map((countryOfManufacture, index) => {
                            return (
                                <Col span={3} key={index}>
                                    <CustomRadio
                                        //key={this.state.displaycountriesOfManufacture[0].id}
                                        title={countryOfManufacture.name}
                                        onClick={() => {
                                            const cpy = [...countriesOfManufacture];

                                            cpy.forEach((c) => c.displayed = false);

                                            cpy[index].displayed = true;
                                            setCountriesOfManufacture(cpy);

                                            dispatch({ type: 'setError', error: false, errorMsg: '' });
                                        }}
                                        isSelected={countryOfManufacture.displayed}
                                    />
                                </Col>
                            )
                        })*/}
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default ProductCountryOfManufacture;