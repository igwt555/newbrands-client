import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router';
import { useLocation, useHistory } from 'react-router-dom';
import './Billing.scss';
import { RiVisaLine, RiMastercardFill } from 'react-icons/ri';
// import { MERCURE } from '../../config';
// import { EventSourcePolyfill } from 'event-source-polyfill';
import {
    getPriceAboData, postSocialAddress, sendSignContract,
    sendGetUrlPaiement, getSignContract, recurrentPayment, getAddressSocial, getMercureAccess
} from '../../store/service';
import debounce from "lodash.debounce";

import { Footer } from '../../components/Footer/footer';
import SidePricing from '../../components/Billing/SidePricing/sidePricing';
import { ButtonLink } from '../../components/UI/Button/ButtonLink';

import Mastercard from '../../assets/img/mastercard.svg';

export const Billing = () => {
    //const loggedIn = localStorage.getItem('session') ? localStorage.getItem('session') : "";
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState(0);
    const [complement, setComplement] = useState("");
    const [city, setCity] = useState("");
    const [mensuel, setMensuel] = useState(true);
    const [dataPrice, setDataPrice] = useState([]);
    const [dataSidePrice, setDataSidePrice] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [nbUser, setNbUser] = useState(1);
    const [activePrice, setActivePrice] = useState("");
    const [disabledChoice, setDisabledChoice] = useState(0);
    const [urlPaiement, setUrlPaiement] = useState();
    const [signatureDisabled, setSignatureDisabled] = useState(true);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    // const [mercureAccess, setMercureAccess] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    // const [tokenMercure, setTokenMercure] = useState("");
    const [urlContract, setUrlContract] = useState("");
    const [indexAbo, setIndexAbo] = useState();

    const location = useLocation();
    const history = useHistory();

    let userId;
    let companyId;
    let isLoggedIn;

    const userRole = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userLevel : 2;

    if(userRole !== 2) history.replace("/dashboard");

    if (localStorage.getItem('user')) {
        userId = JSON.parse(localStorage.getItem('user')).id;
        isLoggedIn = true;
    } else
        userId = localStorage.getItem("idUserNewBrands");
    
    if (localStorage.getItem('user'))
        companyId = JSON.parse(localStorage.getItem('user')).company.id;
    else
        companyId = localStorage.getItem('idCompanyUserNewBrands');
    
    useEffect(() => {

        if(location.state) {
            const fare = location.state.fare;
            handleClickPrice({ origin: fare }, fare === "abo1" ? 0 : fare === "abo2" ? 1 : 2);
        }

        getPriceAboData({duree: 0, nbUser: nbUser}).then((res) => {
            if (res.status === 200) setDataPrice(res.data.price)
        }).catch(err => console.log(err));

        // getMercureAccess(userId).then(res => {
        //     if (res.status === 200) {
        //         setMercureAccess(true);
        //         setTokenMercure(res.data.token);
        //     }
        // }).catch(err => {
        //     console.log(err);
        //     alert("Une erreur est survenue. Veuillez recharger la page.")
        //     setMercureAccess(false);
        // });

        if(isLoggedIn) {
            getAddressSocial().then(res => {
                setAddress(res.data.social.address);
                setPostalCode(res.data.social.postalCode);
                setComplement(res.data.social.complement);
                setCity(res.data.social.city);
            });

            setFirstName(JSON.parse(localStorage.getItem('user')).firstName);
            setLastName(JSON.parse(localStorage.getItem('user')).lastName);
        }
        
    }, []);
    
    const generatePriceAbo = () => {
        if (dataPrice !== null && typeof dataPrice !== 'undefined')
            return dataPrice.map((el, i) => {
                return <div key={i} className={`priceCard ${activePrice === el.origin ? 'active' : 'disactive'}` } onClick={() => handleClickPrice(el, i)}>
                    <h4>
                        {el.price}€ <span>/mois</span>
                    </h4>
                    <span>{el.size}.</span>
                    <p>{el.desc}.</p>
                </div>
            });
    }

    const handleClickPrice = (abo, index) => {
        let cpyNbUser = 0;

        if (index === 0) {
            cpyNbUser = 1;
            setNbUser(1);
        }
        else if (index === 1) {
            cpyNbUser = 5;
            setNbUser(5);
        }
        else {
            cpyNbUser = 15;
            setNbUser(15);
        }
        setActivePrice(abo.origin);
        setIndexAbo(index);
        fetchData(mensuel, cpyNbUser, index);
    };

    const handleClickMensuel = (param) => {
        setMensuel(param);
        if(activePrice.length !== 0)
            fetchData(param, nbUser, indexAbo);
    }

    // const handleChoiceUser = (value) => {
    //     setNbUser(value)
    //     let index = parseInt(activePrice.replace(/\D+/g, '')) - 1;
    //     let valueParse = parseInt(value);

    //     if(valueParse === 1) {
    //         setDisabledChoice(0)
    //         setActivePrice('abo1')
    //         fetchData(mensuel, value, 0)
    //     }
    //     else if(valueParse === 5) {
    //         setDisabledChoice(1)
    //         setActivePrice('abo2')
    //         fetchData(mensuel, value, 1)
    //     }
    //     else if(valueParse === 15) {
    //         setDisabledChoice(2)
    //         setActivePrice('abo3')
    //         fetchData(mensuel, value, 2)
    //     }
    //     if(activePrice.length !== 0 && value.length !== 0) {
    //         fetchData(mensuel, value, index)
    //     }
    // }

    const fetchData = (mensuel, nbUser, index) => {
        getPriceAboData({duree: mensuel ? 0 : 1, nbUser: parseInt(nbUser)}).then((res) => {
            setDataPrice(res.data.price)
            setDataSidePrice(res.data.price[index]);
        });
    }

    const sendQuery = () => {
        const data = { address: address, complement: complement, postalCode: postalCode, city: city, userId: userId };

        if (city.length !== 0) {
            setLoading(true);

            postSocialAddress(data)
            .then(() => {})
            .finally(() => setLoading(false))
        }
    };

    const updateQuery = () => sendQuery({address, complement, postalCode, city, companyId });

    const delayedQuery = useCallback(debounce(updateQuery, 500), [address, complement, postalCode, city]);

    useEffect(() => {
        delayedQuery();
        return delayedQuery.cancel;
    }, [address, complement, postalCode, city]);

    useEffect(() => {
        if (/[a-zA-Z]/g.test(postalCode)) setError('Vous devez renseigner un code postal valide');
        else setError();
    }, [postalCode]);

    useEffect(() => {
        // if (lastName.length > 0 && firstName.length > 0 && address.length > 0
        // && parseInt(postalCode) > 0 && city.length > 0 && !error && activePrice.length > 0)
        //     setSignatureDisabled(false);
        // else setSignatureDisabled(true);

        if (lastName.length > 0 && firstName.length > 0 && address.length > 0
        && parseInt(postalCode) > 0 && city.length > 0 && !error && activePrice.length > 0) {

            let priceTTC;

            dataPrice.forEach((el, i) => {
                if (el.origin === activePrice)
                    priceTTC = el.priceTTC;
            });

            const request = {
                userId: userId,
                price: parseFloat(priceTTC),
                duree: mensuel ? 0 : 1,
                companyId: companyId,
                nbrLicences: nbUser
            }
    
            recurrentPayment(request).then((result) => {
                if(result.status === 200) {
                    console.log(result.data.url);
                    setUrlPaiement(result.data.url);
                    setDisabled(false);
                }
            });
        }
        else setDisabled(true);
        
    }, [lastName, firstName, address, postalCode, city, activePrice, error]);

    const handlePaiementClick = () => {
        if(urlPaiement !== 'undefined' && urlPaiement !== null && urlPaiement !== "null") window.location.assign(urlPaiement);
        else alert("Une erreur est survenue. Veuillez nous excuser pour la gêne occasionée.");
    }

    // const handleContractSign = () => {
    //     let priceTTC;
    //     let priceHt;

    //     dataPrice.forEach((el, i) => {
    //         if (el.origin === activePrice) {
    //             priceTTC = el.priceTTC;
    //             priceHt = el.priceHt
    //         }
    //     });

    //     const request = {
    //         userId: userId,
    //         price: priceHt,
    //         duree: mensuel ? 0 : 1,
    //         nbUser: nbUser,
    //         city: city
    //     }

    //     const url = new URL(MERCURE);

    //     url.searchParams.append('topic', `http://nb_docusign.fr/${userId}`);

    //     // const eventSource = new EventSource(url, { withCredentials: true });

    //     const eventSource = new EventSourcePolyfill(url, {
    //         headers: {
    //             'Authorization': 'Bearer ' + tokenMercure,
    //         }
    //     });

    //     eventSource.onmessage = (e) => {
    //         console.log("mercure", JSON.parse(e.data))
    //         if(JSON.parse(e.data).status === "docusign success") {

    //             const request = {
    //                 userId: userId,
    //                 price: parseFloat(priceTTC),
    //                 duree: mensuel ? 0 : 1,
    //                 companyId: companyId,
    //                 nbrLicences: nbUser
    //             }

    //             recurrentPayment(request).then((result) => {
    //                 if (result.status === 200) {
    //                     console.log(result.data.url);
    //                     setUrlPaiement(result.data.url);
    //                     setShowPopup(false);
    //                     if(mercureAccess) setDisabled(false);
    //                 }
    //             });

    //             eventSource.close();
    //         }
    //     }

    //     sendSignContract(request).then((result) => {
    //         setUrlContract(result.data);
    //         setShowPopup(true);

    //         let a = document.createElement("a");
    //         a.setAttribute("href", result.data);
    //         a.setAttribute("target", "_blank");
    //         a.click();
    //     });
    // }

    if (!userId || !companyId)
        return <Redirect to="/" />

    return (
        <>
            <div className="mainContainer">
                <div className="containerLeft">
                    <div className="containerAbo">
                        <h1>Votre abonnement</h1>
                        <div className="containerSubInfo">
                            <span>Merci de confirmer vos coordonnées servant à la facturation de votre commande</span>
                            <div className="containerSwitchReccurency">
                                <div className={`mensuel ${mensuel === true ? 'active' : ''}`} onClick={ () => handleClickMensuel(true) }>Mensuel</div>
                                <div className={`annuel ${mensuel === false ? 'active' : ''}`} onClick={ () => handleClickMensuel(false) }>Annuel</div>
                            </div>
                        </div>
                        <div className="containerListPriceCard">
                            <div className="containerList">
                                {generatePriceAbo()}
                            </div>
                            {/* <div className="containerInputUser">
                                <div className="inputDiv">
                                    <input type="text" id="codePromo" value={nbUser} onChange={(e) => handleChoiceUser(e.target.value) } />
                                    <label htmlFor="codePromo">Code Promo</label>
                                </div>
                                <div className="inputDiv">
                                    <input type="number" min="1" max="15" id="nbUser" value={nbUser} onChange={(e) => handleChoiceUser(e.target.value) } />
                                    <label htmlFor="nbUser">Nombres utilisateurs</label>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="containerBillingForm">
                        <h2>Adresse de facturation</h2>
                        <span>Merci de confirmer vos coordonnées servant à la facturation de votre commande</span>
                        
                        <form className="billingForm" autoComplete="new-password">
                            <div className="billingName">
                                <div className="inputDiv">
                                    <input type="text" id="name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    <label htmlFor="name">Nom</label>
                                </div>
                                <div className="inputDiv">
                                    <input type="text" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    <label htmlFor="firstname">Prénom</label>
                                </div>
                            </div>

                            <div className="containerAddress">
                                <div className="billingAddress">
                                    <div className="inputDiv">
                                        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        <label htmlFor="address">Adresse</label>
                                    </div>
                                    <div className="inputDiv">
                                        <input type="text" id="zipCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                                        <label htmlFor="zipCode">Code postal</label>
                                    </div>
                                </div>

                                <div className="billingAddress">
                                    <div className="inputDiv">
                                        <input type="text" id="completeAddress" value={complement} onChange={(e) => setComplement(e.target.value)} />
                                        <label htmlFor="completeAddress">Complément</label>
                                    </div>
                                    <div className="inputDiv">
                                        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                                        <label htmlFor="city">Ville</label>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <p className="errorMessage">{error}</p>
                    </div>

                    <div className="containerPaymentMethod">
                        <h2>Méthode de paiement</h2>
                        <span>Effectuez un paiement sécurisé par carte bancaire via notre partenaire <span className="bold">Monetico</span></span>
                        
                        <div className="paymentMethods">
                            <div className="method">
                                <RiVisaLine className="visa" />
                                <img className="mastercard" src={Mastercard} alt="mastercard" />
                            </div>
                        </div>

                        {/* <p className="paymentTypeText">Type de paiement</p>
                        <form>
                            <div className="paymentType">
                                <input type="radio" id="mensuel" name="payment" value="mensuel" defaultChecked onClick={() => {setTypePayment(monthPayment); setPaymentChoose(1)}} />
                                <label htmlFor="mensuel">Mensuel</label>
                            
                                <input type="radio" id="annuel" name="payment" value="annuel" onClick={() => {setTypePayment(yearPayment); setPaymentChoose(0)}} />
                                <label htmlFor="annuel">Annuel</label>
                            </div>
                        </form> */}
                    </div>
                    
                    {/* <div className="containerContractSignature">
                        <h2>Signature du contrat</h2>
                        <span>Pour accepter notre proposition commercial, vous devez signer le contrat via notre partenaire sécurisé <span className="bold">DocuSign</span></span>
                        <button disabled={signatureDisabled} className={`btn blueBtn ${signatureDisabled === true ? 'disabledSign' : ''}`} onClick={() => handleContractSign()}>Signer mon contrat</button>
                    </div> */}
                </div>

                <div className="asideContainer">
                    {/* <div> */}
                        <SidePricing data={dataSidePrice} />
                        <button className={`${"btnPayment"} ${(disabled || loading) === true ? "locked" : ""}`} onClick={() => handlePaiementClick()}>Paiement</button>
                        {/* { (disabled || loading) && <span className="mustSign">Vous devez d'abord signer le contrat.</span> } */}
                    {/* </div> */}
                </div>
            </div>

            {showPopup &&
            <div id='popupDocusignWait'>
                <div className="popupBody">
                    <p>En attente de Docusign...
                        <br/>Ne quittez pas cette page.
                    </p>

                    <p><b>Si vous n'êtes pas redirigé</b> au bout de quelques secondes, appuyez sur ce bouton :</p>
                    <ButtonLink value="Signer mon contrat" href={urlContract} color="light" external target="_blank" />

                    <p>Une fois que le contrat est signé, patientez sur cette page pour pouvoir procéder au paiement.</p>
                </div>
            </div>
            }

            <Footer />
        </>
    )
}
