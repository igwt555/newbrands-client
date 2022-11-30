import React, { useState, useEffect, useContext } from "react";
import { Layout, Row } from "antd";
import { ContentTitle, ContentSubTitle } from "../../../components/global";
import NavHeader from "../../../components/createProject/NavHeader";
import CustomTextField from "../../../components/createProject/customTextField";
import { createMuiTheme } from "@material-ui/core/styles";
import { TextField, ThemeProvider } from '@material-ui/core';
import { CustomLabelInput } from '../../../components/global';
import PlaceInput from '../../../components/UI/Inputs/PlaceInput/PlaceInput';

import { StoreContext } from '../../../store/store';

import './index.scss';

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
        error: {
            light: "#ff0000",
            main: "#fff000",
            dark: "#fff000",
            contrastText: "#ff0",
        }
    },
});

const PlaceOfShip = () => {

    const [address, setAddress] = useState('');

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const { state, dispatch } = useContext(StoreContext);

    const deliveryPlaceInStore = state.deliveryPlace;
    const error = state.error;
    const errorMsg = state.errorMsg;

    useEffect(() => {
        console.log(deliveryPlaceInStore);
        if (deliveryPlaceInStore !== undefined && deliveryPlaceInStore.length > 0)
            setAddress(deliveryPlaceInStore);
    }, []);

    useEffect(() => {
        dispatch({ type: 'setDeliveryPlace', deliveryPlace: address });
    }, [address]);

    useEffect(() => {
        setErr(error);
        setErrMsg(errorMsg);
    }, [error, errorMsg]);

    return (
        <Layout>
            <NavHeader title="Lieu de livraison" />
            <Content
            style={{
                margin: "0",
                padding: "70px 100px",
                minHeight: 280,
                backgroundColor: "white",
            }}
            >
                <ContentTitle>Lieu de livraison</ContentTitle>
                <ContentSubTitle>
                Dans un souci d’optimisation des transports pour une livraison rapide, renseignez ci-dessous l’adresse à laquelle vous souhaitez recevoir vos produits finaux.
                </ContentSubTitle>
                <center
                    style={{
                    padding: "70px 20%",
                    fontFamily: "Gelion Medium",
                    fontSize: "24px",
                    }}
                >
                    <div className={`placeOfShipContainer ${err ? 'error' : ''}`}>
                        <ThemeProvider theme={theme}>
                            <PlaceInput handleValueChange={(v) => {
                                if (v && v.length > 0)
                                    dispatch({ type: 'setError', error: false, errorMsg: '' });
                                setAddress(v);
                            }} value={address} >
                                <TextField
                                    key={0}
                                    fullWidth
                                    id="filled-secondary"
                                    label={<CustomLabelInput>Adresse postale</CustomLabelInput>}
                                    variant="outlined"
                                    color="primary"
                                />
                            </PlaceInput>
                        </ThemeProvider>

                        <p className="errorMessage">{errMsg}</p>
                    </div>
                </center>
            </Content>
        </Layout>
    );
}

export default PlaceOfShip;
