import { useEffect, useState, useContext } from "react";
import { Layout, Row, Col } from "antd";
import { ContentTitle, ContentSubTitle } from "../../../components/global";
import NavHeader from "../../../components/createProject/NavHeader";
import styled from "styled-components";
import axios from 'axios';
import './typeProject.scss';
import "../../../assets/icons/typeIcons/css/typeicons.css";

import { getTypesList } from '../../../store/service';
import { StoreContext } from '../../../store/store';

const { Content } = Layout;

// let typesSelection = {};

axios.defaults.headers.common['Authorization'] = localStorage.getItem("session");

const TypeProject = () => {

    const { state, dispatch } = useContext(StoreContext);

    const typesSelectionInStore = state.typesSelection;

    const [types, setTypes] = useState([]);
    const [typesSelection, setTypesSelection] = useState([]);
    const [disabledBoxes, setDisabledBoxes] = useState([false, false, false, false]);

    // console.log("all types : ", types)
    // console.log("types selectionnes : ", typesSelection)
    // console.log("types dans store : ", typesSelectionInStore)

    useEffect(() => {

        getTypesList().then(res => {
            if (res.status === 200)
                setTypes(res.data);
        });

    }, []);

    useEffect(() => {
        console.log("hello : ", typesSelectionInStore);
        // setTypesSelection(typesSelectionInStore);
    }, [typesSelectionInStore]);

    useEffect(() => {
        let isChecked = [false, false, false, false];
        let cpyDisabledBoxes = [...disabledBoxes];

        typesSelection.forEach((t) => {
            const index = types.findIndex((type) => type.id === t.id);

            if (index !== -1) isChecked[index] = true;
        });

        // if ((isChecked[0] === false && isChecked[1] === false && isChecked[2] === false && isChecked[3] === false)
        // || (isChecked[0] === false && isChecked[1] === true && isChecked[2] === false && isChecked[3] === false)
        // || (isChecked[0] === false && isChecked[1] === false && isChecked[2] === false && isChecked[3] === true)) {
        //     cpyDisabledBoxes = [false, false, false, false];
        // } else if (isChecked[0] === true && !isChecked[1] && !isChecked[2] && !isChecked[3]) {
        //     cpyDisabledBoxes = [false, false, true, false];
        // } else if (!isChecked[0] && !isChecked[1] && isChecked[2] === true && !isChecked[3]) {
        //     cpyDisabledBoxes = [true, false, false, false];
        // }

        if(isChecked[0] && !isChecked[1] && !isChecked[2] && !isChecked[3]) cpyDisabledBoxes = [false, false, true, false];
        else if(!isChecked[0] && !isChecked[1] && isChecked[2] && !isChecked[3]) cpyDisabledBoxes = [true, false, false, false];
        else cpyDisabledBoxes = [false, false, false, false];

        if(typesSelection.length === 2 && types.length > 0) {
          if((typesSelection[0].id === types[0].id && typesSelection[1].id === types[2].id)
          || (typesSelection[0].id === types[2].id && typesSelection[1].id === types[0].id)) {
            let cpyTypesSelection = typesSelection.slice();
            cpyTypesSelection.pop();
            console.log('nope')
            setTypesSelection(cpyTypesSelection);
            dispatch({type: 'setTypesSelection', typesSelection: cpyTypesSelection});
          }
        }

        setDisabledBoxes(cpyDisabledBoxes);
    }, [typesSelection]);

    // useEffect(() => {
    //     console.log(typesSelectionInStore, types);
    // }, [typesSelectionInStore]);

    const handleCheckboxes = (e, index, isChecked) => {
        if (e.target.checked === true) {
            let cpyTypesSelection;

            if (typesSelection.length > 0)
                cpyTypesSelection = typesSelection.concat({ id: e.target.value });
            else
                cpyTypesSelection = [{id: e.target.value}];
            setTypesSelection(cpyTypesSelection);
            dispatch({type: 'setTypesSelection', typesSelection: cpyTypesSelection});
        }
        else {
            const cpyTypesSelection = typesSelection.filter(type => {
                return type.id !== e.target.value
            })
            setTypesSelection(cpyTypesSelection);
            dispatch({type: 'setTypesSelection', typesSelection: cpyTypesSelection});
        }

        /*if (!isChecked[0] && !isChecked[1] && !isChecked[2] && isChecked[3] === true)
            setDisabledBoxes([true, true, true, false]);*/
    }

    // const buildTypeBoxes = () => {
    //     const isChecked = Array(types.length).fill(false);
    //     const typeBoxes = [];

    //     types.forEach((item, index) => {
    //         isChecked[index] = typesSelectionInStore.some((d, k) => typesSelectionInStore[k].id === item.id);

    //         typeBoxes.push(
    //             <Col span={6} key={index} className="card-checkbox-col">
    //             <input type="checkbox" className="card-checkbox" value={item.id} defaultChecked={isChecked[index]} onChange={(e) => handleCheckboxes(e, index)} />
    //             <BoxType style={{ borderColor: "black" }}>
    //                 <BoxIcon className={`icon-${item.name.toLowerCase()}-icon`} style={{ color: "black" }} />
    //                 <h3 style={{ color: "black" }}>{item.name}</h3>
    //                 <BoxDesc style={{ fontFamily: "Gelion Light" }}>
    //                 {item.content}
    //                 </BoxDesc>
    //             </BoxType>
    //             </Col>
    //         );
    //     });

    //     return typeBoxes;
    // }

    return (
        <Layout>
            <NavHeader title="Produits" />
            <Content
            style={{
                margin: "0",
                padding: "70px 100px 35px 100px",
                minHeight: 280,
                backgroundColor: "white",
            }}
            >
                <ContentTitle>
                Parcours de renseignement des produits
                </ContentTitle>
                <ContentSubTitle>
                Tout au long de ce parcours, plusieurs questions vous seront posées afin de mieux comprendre votre activité et vos attentes. 
                Cet OnBoarding nous permettra d’établir, dès le départ, une offre sur mesure pour votre projet.
                </ContentSubTitle>
                <center
                style={{
                    marginTop: "50px",
                    marginBottom: "0",
                    fontFamily: "Gelion Medium",
                    fontSize: "24px",
                }}
                >
                    <form className="projectTypeSelection" onSubmit={(e) => this.handleSubmit(e)}>
                        <Row>
                            {
                                types.map((value, index) => {
                                    let isChecked = [false, false, false, false];

                                    typesSelectionInStore.some((type, i) => {
                                        if (type.id === value.id) {
                                            isChecked[index] = true;
                                            return true;
                                        }
                                        else
                                            isChecked[index] = false;
                                        return false;
                                    });

                                    return (
                                        <Col span={6} key={index} className={`card-checkbox-col ${disabledBoxes[index] ? 'disabled' : ''}`}>
                                            <input type="checkbox" className="card-checkbox" value={value.id} checked={isChecked[index]}
                                            onChange={(e) => handleCheckboxes(e, index, isChecked)} />
                                            <BoxType style={{ borderColor: "black" }}>
                                                <BoxIcon className={`icon-${value.name.toLowerCase()}-icon`} style={{ color: "black" }} />
                                                <h3 style={{ color: "black" }}>{value.name}</h3>
                                                <BoxDesc style={{ fontFamily: "Gelion Light" }}>
                                                {value.content}
                                                </BoxDesc>
                                            </BoxType>
                                        </Col>
                                    )
                                }
                            )}
                        </Row>
                    </form>
                </center>
            </Content>
        </Layout>
    );
}

export default TypeProject;

const BoxIcon = styled.i`
  font-size: 50px;
  color: black;
  margin-bottom: 10px;
  font-family: "typeicons";
`;

const BoxDesc = styled.p`
  font-size: 16px;
  font-family: Gelion;
  color: black;
`;

const BoxType = styled.div`
  padding: 10px 10px;
  margin: 10px;
  border: 1px solid #dddddd;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;