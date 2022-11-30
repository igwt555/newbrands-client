import React, { useEffect, useState, useContext } from "react";
import { Layout, Row } from "antd";
import { ContentTitle } from "../../../components/global";
import NavHeader from "../../../components/createProject/NavHeader";
import CustomTextField from "../../../components/createProject/customTextField";

import { StoreContext } from '../../../store/store';

import './index.scss';

const { Content } = Layout;

const DescriptionProject = (props) => {

    const { product, prodIt } = props;

    const [content, setContent] = useState('');
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const { state, dispatch } = useContext(StoreContext);

    const descriptionInStore = state.description;
    const productDescriptionsInStore = state.productDescriptions;
    const error = state.error;
    const errorMsg = state.errorMsg;

    useEffect(() => {
        if (product !== undefined && prodIt !== undefined) {
            if (productDescriptionsInStore[prodIt] && productDescriptionsInStore[prodIt].length > 0)
                setContent(productDescriptionsInStore[prodIt]);
        } else if (descriptionInStore !== undefined && descriptionInStore.length > 0) {
            setContent(descriptionInStore);
        }
    }, []);

    useEffect(() => {
        setErr(error);
        setErrMsg(errorMsg);
    }, [error, errorMsg]);

    useEffect(() => {
        if (content && content.length > 0)
            dispatch({ type: 'setError', error: false, errorMsg: '' });

        if (product !== undefined && prodIt !== undefined) {
            const cpyProductDescriptions = [...productDescriptionsInStore];
            
            cpyProductDescriptions[prodIt] = content;
            dispatch({ type: 'setProductDescriptions', productDescriptions: cpyProductDescriptions });
        } else
            dispatch({ type: 'setDescription', description: content });
    }, [content]);

    return (
        <Layout>
            <NavHeader title="Description" />
            <Content
                style={{
                margin: "0",
                padding: "70px 100px",
                minHeight: 280,
                backgroundColor: "white",
                }}
            >
                <ContentTitle>
                Quelques mots sur votre {product !== undefined && prodIt !== undefined ? 'produit' : 'projet'}
                </ContentTitle>
                <center
                style={{
                    padding: "40px 10%",
                    fontFamily: "Gelion Medium",
                    fontSize: "24px",
                }}
                >
                    <div className={`descriptionContainer ${err ? 'error' : ''}`}>
                        <CustomTextField
                        value={content}
                        label={`Description de votre ${product !== undefined && prodIt !== undefined ? 'produit' : 'projet'}`}
                        onInput={(e) => {
                            setContent(e.target.value)
                        }}
                        multiline={true}
                        rows={10}
                        />

                        <p className="errorMessage">{errMsg}</p>
                    </div>
                </center>
            </Content>
        </Layout>
    );
}

export default DescriptionProject;
