import { useState, useEffect } from "react";

import { Layout, Row } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import { ContentTitle, ContentSubTitle } from "../../../components/global";
import NavHeader from "../../../components/createProject/NavHeader";

import { getProjectRessources, postProductFiles, deleteFileById } from "../../../store/service";

import './index.scss';

const { Content } = Layout;

const DocumentsProject = (props) => {

    const { projectId, product, prodIt, loadingFiles } = props;

    const [files, setFiles] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            loadingFiles(true);
            const projectRessources = await getProjectRessources(projectId);

            if (projectRessources.status === 200) {
                if (product !== undefined && prodIt !== undefined) {
                    setFiles(projectRessources.data.project[0].product[prodIt].document);
                } else setFiles(projectRessources.data.project[0].document);
                setProjectName(projectRessources.data.project[0].title);
            }
            loadingFiles(false);
        }

        fetchProducts();
    }, []);

    const uploadFile = (e) => {
        if (e.target.files.length === 0)
            return;

        const formData = new FormData();
        const id = (product !== undefined && prodIt !== undefined) ? product.id : projectId;
        
        formData.append('files', e.target.files[0]);

        if (formData) {
            loadingFiles(true);
            if (product !== undefined && prodIt !== undefined) formData.append('product', true);
            postProductFiles(formData, id).then(res => {
                if (res.status === 200) {
                    const cpy = files ? [...files] : [];

                    res.data.id = res.data.idFile;

                    cpy.push(res.data);
                    setFiles(cpy);
                }
            }).finally(() => loadingFiles(false));
        }
    }

    const deleteFile = (i) => {
        loadingFiles(true);
        deleteFileById(files[i].id).then(res => {
            if (res.status === 200) {
                const cpy = [...files];

                cpy.splice(i, 1);
                setFiles(cpy);
            }
        }).finally(() => loadingFiles(false));
    } 

    const renderFilesInDb = () => {
        return files && files.map((f, i) => {
            return <div key={i} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>
                <label style={{fontSize: 14}}>{f.originalFileName}</label>
                <span style={{fontSize: 12, fontWeight: 'bold', color: 'red', cursor: 'pointer'}} onClick={() => deleteFile(i)}>
                    Supprimer
                </span>
            </div>
        });
    }

    return (
        <Layout>
            <NavHeader title="Photo et documents" />
            <Content
            style={{
                margin: "0",
                padding: "70px 100px",
                minHeight: 280,
                backgroundColor: "white",
            }}
            >
                <ContentTitle>Téléchargez vos documents</ContentTitle>
                <ContentSubTitle>
                Téléchargez ci-dessous vos documents complémentaires : dossiers techniques, cahiers des charges, patrons digitalisés lié au {product !== undefined && prodIt !== undefined ? 'produit' : 'projet'}: <strong>“{product !== undefined && prodIt !== undefined ? product?.name : projectName}”</strong>
                </ContentSubTitle>
                <center
                    style={{
                    padding: "100px 0",
                    fontFamily: "Gelion Medium",
                    fontSize: "24px",
                    }}
                >
                    <Row justify="center">
                        <div className="uploadContainer">
                            <div className={`uploadFileBox ${dragging ? 'dragging' : ''}`}>
                                <label htmlFor="uploadFile" style={{cursor: 'pointer'}}>
                                    <p className="ant-upload-drag-icon">
                                        <PlusCircleFilled style={{ color: "#00798C" }} />
                                    </p>
                                    <p
                                        className="ant-upload-text"
                                        style={{ fontFamily: "Gelion", fontSize: 17 }}
                                    >
                                        Faites glisser-déposer vos documents ou parcourez vos fichiers
                                    </p>
                                </label>
                                <input
                                id="uploadFile"
                                type="file"
                                draggable={true}
                                onDragEnter={(event) => {
                                    setDragging(true);
                                    event.stopPropagation();
                                    event.preventDefault();
                                }}
                                onDrop={(event) => {
                                    setDragging(false);
                                }}
                                onDragLeave={(event) => {
                                    setDragging(false);
                                    event.stopPropagation();
                                    event.preventDefault();
                                }}
                                onChange={uploadFile}
                                />
                            </div>
                            <div>
                            {
                                renderFilesInDb()
                            }
                            </div>
                        </div>
                    </Row>
                </center>
            </Content>
        </Layout>
    );
}

export default DocumentsProject;
