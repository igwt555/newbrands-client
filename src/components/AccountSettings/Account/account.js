import "./account.scss"
import React, { useState, useEffect, useContext } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
// import { AiOutlineLoading } from 'react-icons/ai'
import Picture from '../../../assets/img/default-avatar.png';
import axios from 'axios'
import { getProfileInformation, uploadFile } from '../../../store/service';
import { AddressInfo } from '../InformationsParts/AddressInfo';
// import { BillingAddressInfo } from '../InformationsParts/BillingAddressInfo';
import { PersonalInfo } from '../InformationsParts/PersonalInfo';
import { FileUploader } from '../InformationsParts/FileUploader';
import { UserStoreContext } from "../../../store/userStore";

import { API } from '../../../config';

// import AutoComplete from '../../ValidatingInformations/AutoComplete';

function Dashboard() {
    const [kbis, setKbis] = useState('');
    const [data, setData] = useState('');
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState('');
    const [profileInfo, setProfileInfo] = useState({});
    const [profilePic, setProfilePic] = useState();

    const { state, dispatch } = useContext(UserStoreContext);

    useEffect(() => {
        getProfileInformation().then(res => {
            if (res.status === 200) {
                setProfileInfo(res.data[0]);
                if (res.data[0].picture) {
                    setProfilePic(`${API}/upload/user/${res.data[0].id}/${res.data[0].picture}`);
                    dispatch({ type: 'setProfilePic', picture: `${API}/upload/user/${res.data[0].id}/${res.data[0].picture}` });
                }
            }
        });
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            const timeOutId = setTimeout(() => {
                getData(data);
                setLoading('');
            }, 1500);
            return () => { clearTimeout(timeOutId) };
        }
    }, [data]);

    const getData = async (query) => {
        const results = await axios(
            `https://suggestions.pappers.fr/v2?q=${query}`,
        )
        console.log(query);
        setResult(results.data.resultats_nom_entreprise)
    }

    // const getKbis = async (token) => {
    //     setKbis(await axios(
    //         `https://api.pappers.fr/v2/document/telechargement?api_token=4903a4d9aad033da2d7057e8c961859b2053fd859d86494b&token=${token}`
    //     ))
    //     console.log(kbis)
    // }

    const changeProfilePicture = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('files', file);
        uploadFile(formData, 'user').then(res => {
            if (res.status === 200) {
                setProfilePic(URL.createObjectURL(file));
                dispatch({ type: 'setProfilePic', picture: URL.createObjectURL(file) });
            }
        });
    }

    return (
        <div className="containerAccount">
            <div className="mainContent">

                <div className="profileInfos">
                    <div className="profilePictureDiv">
                        <img src={profilePic ? profilePic : Picture} alt="profile" />
                        <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => changeProfilePicture(e)} />
                        <IoSettingsOutline className="changePicture" color="#FFF" />
                    </div>
                    <div className="profileName">
                        <h2>{`${profileInfo.firstName} ${profileInfo.lastName}`}</h2>
                        <h2><span className="companyName">{profileInfo.company && profileInfo.company.name}</span><span className="country">France</span></h2>
                    </div>
                </div>

                <div className="formContainer">

                    <h2>Adresse du siège social</h2>
                    <span>Merci de confirmer vos coordonnées servant à la facturation de votre commande</span>
                    <AddressInfo addressInfo={profileInfo} />
                    <div className="inline">
                        <div className={kbis.headers && kbis.headers['content-type'] === 'application/pdf' ? "confirmed" : "unconfirmed"}></div> <h3>K-BIS</h3>
                    </div>
                    {!kbis.headers && <FileUploader mode="kbis" />}
                    {/* <div className="uploadLogoDiv">
                        <h3>Pensez à télécharger votre logo</h3>
                        <span>Taille minimum 400 x 400 pixels et de 2 Mo maximum au format JPG ou PNG</span>
                        <FileUploader mode="logo" />
                    </div> */}

                    {/* <h2>Adresse de facturation</h2>
                    <span>À renseigner uniquement si différente du siège social</span>
                    <BillingAddressInfo billingInfo={profileInfo} /> */}
                    
                    <h2 className="mt">Informations personnelles</h2>
                    <span>Merci de confirmer vos coordonnées servant à la facturation de votre commande</span>
                    <PersonalInfo personalInfo={profileInfo} />
                    <div className="inline">
                        <div className="confirmed"></div><h3>Document d'identité</h3>
                    </div>

                    <span className="footer">
                        Conformément au Règlement Général sur la Protection des Données (RGPD), les documents transmis seront supprimés après validation de votre inscription. Pour en savoir plus, rendez-vous dans nos Conditions Particulières et Conditions Générales de Services ainsi que notre Politique de
                        Confidentialité
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;