import './index.scss';
import React, { useState, useEffect, useContext } from 'react';
import { Layout } from "antd";
import { ContentTitle, ContentSubTitle } from "../../../components/global";
import NavHeader from "../../../components/createProject/NavHeader";
import { createMuiTheme } from "@material-ui/core/styles";
import { TextField, ThemeProvider } from '@material-ui/core';
import { CustomLabelInput } from '../../../components/global';

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
        error: {
            light: "#ff0000",
            main: "#fff000",
            dark: "#fff000",
            contrastText: "#ff0",
        }
    },
});

const ProjectName = () => {

    const [val, setVal] = useState('');
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const { state, dispatch } = useContext(StoreContext);

    const projectNameInStore = state.projectName;
    const error = state.error;
    const errorMsg = state.errorMsg;

    useEffect(() => {
        if (projectNameInStore) setVal(projectNameInStore);
    }, []);

    useEffect(() => {
        setErr(error);
        setErrMsg(errorMsg);
    }, [error, errorMsg]);

	return (
        <Layout>
            <NavHeader title="Nom du projet" />
            <Content
                style={{
                    margin: "0",
                    padding: "70px 100px 10px 100px",
                    minHeight: 280,
                    backgroundColor: "white",
                }}
            >
                <center
                    style={{
                    padding: "100px 0",
                    fontFamily: "Gelion Medium",
                    fontSize: "24px",
                    }}
                >
                    <div className={`projectNameInputContainer ${err ? 'error' : ''}`}>
                        <ThemeProvider theme={theme}>
                            <TextField
                            key={0}
                            fullWidth
                            id="filled-secondary"
                            label={<CustomLabelInput>Nom du projet</CustomLabelInput>}
                            variant="outlined"
                            color="primary"
                            onChange={(e) => {
                                dispatch({ type: 'setProjectName', projectName: e.target.value });
                                if (e.target.value && e.target.value.length > 0)
                                    dispatch({ type: 'setError', error: false, errorMsg: '' });
                                setVal(e.target.value);
                            }}
                            value={val}
                            />
                        </ThemeProvider>

                        <p className="errorMessage">{errMsg}</p>
                    </div>
                </center>
            </Content>
        </Layout>
    );
}

export default ProjectName;