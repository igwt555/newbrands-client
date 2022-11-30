import React, { Component, useState, useEffect, useContext } from "react";
import { Layout } from "antd";
import { ContentTitle, ContentSubTitle } from "../../../components/global";
import NavHeader from "../../../components/createProject/NavHeader";

import CustomRadio from "../../../components/createProject/customRadio";
import CustomRadioInput from "../../../components/createProject/customRadioInput";

import { StoreContext } from '../../../store/store';

const { Content } = Layout;

const baseDate = new Date().getTime();

const ProductDelay = () => {

    const { state, dispatch } = useContext(StoreContext);

    const delayInStore = state.delay;

    const [delay, setDelay] = useState('');
    const [date, setDate] = useState("");

    const proposedDelays = [1, 3, 6, 12];

    const convertDateToYyyyMmDdFormat = (d) => {
        let cpy = d.split('/').reverse();

        if (cpy[2] && cpy[2].length === 1) cpy[2] = `0${cpy[2]}`;

        return cpy.join('-');
    }

    const convertDateToDdMmYyyyFormat = (d) => {
        return d.split('-').reverse().join('/');
    }

    const getDateToDdMmYyyyFormat = (d) => {
        let newFormattedDate = new Date(d).getDate() + '/' + ('0' + (new Date(d).getMonth() + 1)).slice(-2) + '/' + new Date(d).getFullYear();

        return newFormattedDate;
    }

    useEffect(() => {
        if (delayInStore !== undefined && delayInStore.length > 0) {
            console.log(delayInStore);
            setDate(delayInStore);
        } else {
            console.log('DIDNT FIND A DATE');
            setDelay(getDateToDdMmYyyyFormat(baseDate + 2629743000));
        }
    }, []);

    useEffect(() => {
        console.log(delay);
        dispatch({type: 'setDelay', delay: delay});
    }, [delay]);

    useEffect(() => {
        console.log(date);
        dispatch({type: 'setDelay', delay: date});
    }, [date]);

    return (
        <Layout>
            <NavHeader title="Délais attendus" />
            <Content
                style={{
                margin: "0",
                padding: "70px 100px 10px 100px",
                minHeight: 280,
                backgroundColor: "white",
                }}
            >
                <ContentTitle>Délais attendus</ContentTitle>
                <ContentSubTitle>
                Dans un souci de faisabilité et d’adaptation à vos attentes, renseignez ci-dessous les délais de production souhaités.
                </ContentSubTitle>
                <center
                style={{
                    fontFamily: "Gelion Medium",
                    padding: "40px 100px 0 100px",
                }}
                >
                    {
                        proposedDelays.map((d, i) => {
                            return <CustomRadio
                            key={i}
                            onClick={() => {
                                const fDate = getDateToDdMmYyyyFormat(baseDate + d * 2629743000);

                                setDelay(fDate);
                            }}
                            isSelected={delay === getDateToDdMmYyyyFormat(baseDate + d * 2629743000)}
                            title={`Dans ${d} mois`}
                            />
                        })
                    }
                    <CustomRadioInput
                        isSelected={delay === ''}
                        onClick={() => setDelay('')}
                        title="Ajouter une date précise"
                        onChange={(e) => setDate(convertDateToDdMmYyyyFormat(e.target.value))}
                        value={convertDateToYyyyMmDdFormat(date)}
                        onInput={null}
                    />
                </center>
            </Content>
        </Layout>
    );
}

export default ProductDelay;
