import { useState, useEffect, useCallback } from 'react';

import { Footer } from '../../components/Footer/footer';

import Mastercard from '../../assets/img/mastercard.svg'

import SidePricing from '../../components/Billing/SidePricing/sidePricing';

import debounce from "lodash.debounce";
import { useHistory } from 'react-router';
import { result } from 'lodash';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { RiVisaLine, RiMastercardFill } from 'react-icons/ri';
import SyncLoader from 'react-spinners/SyncLoader';

import { MERCURE } from '../../config';

import { postSocialAddress, sendSignContract,
    sendGetUrlPaiement, getSignContract, getContract, recurrentPayment, getProjectDetails, deferredPayment, getMercureAccess, makeProjectGoToNextStep } from '../../store/service';

import './index.scss';

const DeferredPayment = (props) => {
    //const loggedIn = localStorage.getItem('session') ? localStorage.getItem('session') : "";
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [complement, setComplement] = useState("");
    const [city, setCity] = useState("");
    const [idCompany, setIdCompany] = useState();
    const [dataSidePrice, setDataSidePrice] = useState();
    const [disabled, setDisabled] = useState(true);
    const [projectDetails, setProjectDetails] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [tokenMercure, setTokenMercure] = useState("");
    const [mercureAccess, setMercureAccess] = useState(false);
    const [priceIsValid, setPriceIsValid] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const history = useHistory();

    let userId;

    if (localStorage.getItem('user')) userId = JSON.parse(localStorage.getItem('user')).id;
    
    useEffect(() => {
        getMercureAccess(userId).then(res => {
            if (res.status === 200) {
                setMercureAccess(true);
                setTokenMercure(res.data.token);
            }
        }).catch(err => {
            console.log(err);
            alert("Une erreur est survenue. Veuillez recharger la page.")
            setMercureAccess(false);
        });

        getProjectDetails({ id: props.match.params.id }).then(res => {
            if (res.status === 200) {
                setProjectDetails(res.data.project[0]);
                setDataSidePrice({ priceHt: res.data.project[0].priceHT, tva: res.data.project[0].priceTVA, priceTtc: res.data.project[0].priceTTC });
                setIdCompany(res.data.project[0].company[0].id);
            }
        });
    }, []);

    const sendQuery = () => {
        const data = { address: address, complement: complement, postalCode: postalCode, city: city, siret: "", name: "" };

        if (city.length > 0 && dataSidePrice && lastName.length > 0 && firstName.length > 0 && address.length > 0
            && postalCode.length > 0 && !error) {
            setLoading(true);
            data.postalCode = parseInt(data.postalCode);
            postSocialAddress(data).then((res) => {
                if (res.status === 200) setDisabled(false);
            }).finally(() => setLoading(false));
        }
    };

    const updateQuery = () => sendQuery({address, complement, postalCode, city, idCompany });

    const delayedQuery = useCallback(debounce(updateQuery, 500), [city, lastName, firstName, address, postalCode, complement]);

    useEffect(() => {
        delayedQuery();
        return delayedQuery.cancel;
    }, [city, lastName, firstName, address, postalCode, complement]);

    useEffect(() => {
        if (/[a-zA-Z]/g.test(postalCode)) setError('Vous devez renseigner un code postal valide');
        else setError();
    }, [postalCode]);

    useEffect(() => {
        if (dataSidePrice && dataSidePrice.priceTtc > 0) setPriceIsValid(true);
    }, [dataSidePrice]);

    const handlePaiementClick = () => {
        const url = new URL(MERCURE);
        let newWindow;

        url.searchParams.append('topic', `http://nb_monetico_differe.fr/${userId}`);

        const eventSource = new EventSourcePolyfill(url, {
            headers: {
                'Authorization': 'Bearer ' + tokenMercure,
            }
        });

        eventSource.onmessage = (e) => {
            if (JSON.parse(e.data).status === "monetico success") {
                makeProjectGoToNextStep({ step: parseInt(projectDetails.step) + 1 }, projectDetails.id).then(res => {
                    if (newWindow) newWindow.close();
                    //history.replace('/dashboard');
                    setIsPaid(true);
                }).finally(() => setLoading(false));
                eventSource.close();
            }
        }

        deferredPayment({ price: dataSidePrice.priceTtc }).then(res => {
            if (res.status === 200) {
                if (typeof res.data.url !== 'undefined') {
                    newWindow = window.open(res.data.url, '');
                    //window.location.href = res.data.url;
                }
            }
        }).finally(() => {
            setDisabled(false);
            setLoading(false);
        });
    }

    return (
        <>
            {
                isPaid
                ?
                <div className="mainContainer paymentPageDone">
                    <h1>Le projet a bien été payé</h1>

                    <button className="btn blueBtn" onClick={() => { history.replace('/dashboard') }}>
                        Revenir au dashboard
                    </button>
                </div>
                :
                <div className="mainContainer">
                    <div className="containerLeft">
                        <div className="containerAbo">
                            <h1>Votre abonnement</h1>
                            <div className="containerSubInfo">
                                <span>Merci de confirmer vos coordonnées servant à la facturation de votre commande</span>
                            </div>
                        </div>
                        <div className="containerDeferredPaymentForm">
                            <h2>Adresse de facturation</h2>
                            <span>Merci de confirmer vos coordonnées servant à la facturation de votre commande</span>
                            
                            <form className="deferredPaymentForm" autoComplete="new-password">
                                <div className="deferredPaymentName">
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
                                    <div className="deferredPaymentAddress">
                                        <div className="inputDiv">
                                            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            <label htmlFor="address">Adresse</label>
                                        </div>
                                        <div className="inputDiv">
                                            <input type="text" id="zipCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                                            <label htmlFor="zipCode">Code postal</label>
                                        </div>
                                    </div>

                                    <div className="deferredPaymentAddress">
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
                        </div>
                        
                    </div>

                    <div className="asideContainer">
                        {
                            dataSidePrice && <SidePricing 
                                data={dataSidePrice} 
                            />
                        }
                        <button className={`${"btnPayment"} ${disabled || !priceIsValid ? "locked" : ""}`} onClick={() => {handlePaiementClick()}}>
                            {
                                loading
                                ?
                                <SyncLoader color={'#FFF'} loading={loading} size={8} margin={2} />
                                :
                                'Paiement'
                            }
                        </button>
                        {
                            disabled && <span className="mustSign">Vous devez d'abord remplir tous les champs</span>
                        }
                    </div>
                </div>
            }

            <Footer />
        </>
    )
}

export default DeferredPayment;