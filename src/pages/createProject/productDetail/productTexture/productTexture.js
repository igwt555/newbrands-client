import React, { Component, useState, useEffect, useContext } from "react";
import { Layout, Row, Col } from "antd";
import { ContentTitle, ContentSubTitle } from "../../../../components/global";
import NavHeader from "../../../../components/createProject/NavHeader";
import CustomRadio from "../../../../components/createProject/customRadio";
import { AiOutlineSearch } from 'react-icons/ai';

import { getProductMaterials, getProjectRessources } from '../../../../store/service';

import { StoreContext } from '../../../../store/store';

import './index.scss';

const { Content } = Layout;

const ProductMaterials = (props) => {

    const { projectId, product, prodIt } = props;
    const { state, dispatch } = useContext(StoreContext);

    const materialsInStore = state.productMaterials;
    const error = state.error;
    const errorMsg = state.errorMsg;

    const [materials, setMaterials] = useState([]);
    const [found, setFound] = useState([]);
    const [search, setSearch] = useState('');

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const projectRessources = await getProjectRessources(projectId);
            const productMaterials = await getProductMaterials();

            if (productMaterials.status === 200 && projectRessources.status === 200) {
                const result = productMaterials.data;

                result.map((r) => {
                    r.displayed = projectRessources.data.project[0].product[prodIt].matter !== undefined
                        ? projectRessources.data.project[0].product[prodIt].matter.some(matter => {
                            if (matter.idMatter === r.id) {
                                r.quantity = matter.quantity;
                                return true;
                            } else return false;
                    }) : false;
                });
                setMaterials(result);
            }
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        if (search.length > 0) {
            const cpy = [...materials].filter(matter => matter.title && matter.title.toLowerCase().includes(search.toLowerCase()));
            
            console.log(cpy);
            setFound(cpy);
        } else setFound([]);
    }, [search]);

    useEffect(() => {
        const cpyMaterials = [...materialsInStore];
        const cpySelectedMaterials = [...materials].filter(matter => matter.displayed === true);

        cpyMaterials[prodIt] = cpySelectedMaterials;

        dispatch({ type: 'setProductMaterials', productMaterials: cpyMaterials });
    }, [materials]);

    useEffect(() => {
        setErr(error);
        setErrMsg(errorMsg);
    }, [error, errorMsg]);

    const renderMaterialsColumn = (data, materialType) => {
        return <Col span={3}>
            <center>
                <h2 style={{ fontWeight: "bold" }}>{materialType}</h2>
            </center>
            {
                data.map((d, index) => {
                    return <CustomRadio
                        key={index}
                        title={d.title}
                        isSelected={d.displayed}
                        onClick={() => {
                            const cpy = [...materials];
                            const i = materials.indexOf(d);

                            cpy[i].displayed = !cpy[i].displayed;
                            setMaterials(cpy);
                            dispatch({ type: 'setError', error: false, errorMsg: '' });
                        }}>
                    </CustomRadio>
                })
            }
        </Col>
    }

    const renderItems = () => {
        if (found.length === 0 && search.length > 0)
            return <center className="antd-no-result">
                <h2>Aucun résultat, pas de panique ! </h2>
                <textarea
                    placeholder="Donnez-nous des détails sur votre recherche, la matière rechercher peut ne pas avoir été enregistrée dans notre base, l’intitulé peut être différent d’un fournisseur à l’autre... (nom, référence, composition, grammage...)"
                />
            </center>
        else {
            const dataToDisplay = found.length > 0 ? found : materials;
            const synthetic = dataToDisplay.filter(data => data.nameMatterType === 'Synthétique');
            const vegetal = dataToDisplay.filter(data => data.nameMatterType === 'Végétal');
            const animal = dataToDisplay.filter(data => data.nameMatterType === 'Animal');

            return <Row gutter={[24, 24]} style={{ paddingTop: "3rem" }}>
                {
                    renderMaterialsColumn(synthetic, 'Synthétique')
                }
                {
                    renderMaterialsColumn(vegetal, 'Végétal')
                }
                {
                    renderMaterialsColumn(animal, 'Animal')
                }
            </Row>
        }
    }

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
                <ContentTitle>Matières souhaitées</ContentTitle>
                <ContentSubTitle>
                Pour des collections durables, nous vous proposons un large choix de matières à faible impact labélisées  <span style={{color: '#00798c'}}>#GOTS</span> <span style={{color: '#00798c'}}>#OEKOTEX</span>
                </ContentSubTitle>
                <center className="ant-searchBarContainer">
                    <AiOutlineSearch className="ant-searchBar" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="ant-text-input" placeholder="Recherchez par nom, matières ou référence..." />
                    <span href="#" className="ant-search-link" onClick={() => { /*materials.length === 0 ? this.getData() : this.setState({ matters: [] }); counting = []*/ }}>
                        {materials.length === 0 ? "Retour à la recherche" : "Recherche personnalisée ?"}
                    </span>
                </center>
                <div className="materialsListContainer">
                    <p className="errorMessage">{errMsg}</p>
                    {
                        renderItems()
                    }
                </div>
                <div className="antd-count">
                    {materials.filter(material => material.displayed).length} {materials.filter(material => material.displayed).length > 1 ? "matières selectionnées" : "matière selectionnée"}
                </div>

            </Content>
        </Layout>
    );
}

export default ProductMaterials;