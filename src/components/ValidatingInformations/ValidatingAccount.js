import './ValidatingAccount.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AutoComplete from './AutoComplete'
import axios from 'axios'
import { AiOutlineLoading } from 'react-icons/ai'

function HqForm() {
    const [hqAddress, setHqAddress] = useState({ social: null, siret: null, address1: null, address2: null, zip: null, city: null });
    const [confirmed, setConfirmed] = useState({ kbis: false, id: false });
    const [kbis, setKbis] = useState('');
    const [data, setData] = useState('');
    const [autocomplete, setAutoComplete] = useState(false)
    const [inputs, setInputs] = useState({ siege: { adresse_ligne_1: '', code_postal: '', siret_formate: '', adresse_ligne_2: '', ville: '' } });
    const [disabledInputs, setDisabledInputs] = useState(false);
    const [inputsPlaceholder, setInputsPlaceholder] = useState({ siege: '' });
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState('');
    const [address, setAddress] = useState({
        city: '',
        zip: ''
    })
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getData(data)
        }
    }

    useEffect(() => {
        if (data.length > 0) {
            const timeOutId = setTimeout(() => {
                getData(data);
                setLoading('');
            }, 1500);
            return () => { clearTimeout(timeOutId) };
        }
    }, [data]);

    const handleOnChange = (e) => {
        if (e.target.value === '') {
            setInputs({ siege: { adresse_ligne_1: ' ', code_postal: '', siret_formate: ' ', adresse_ligne_2: ' ', ville: ' ' } })
            setDisabledInputs(false)
        }
        if (data !== e.target.value) {
            setAutoComplete(false)
            setDisabledInputs(false)
            setLoading('Recherche...')
            setData(e.target.value);
        }
        else if (inputs.length > 0 && inputs.siren.length > 0) {
            setAutoComplete(false)
        }
    }

    const getData = async (query) => {
        const results = await axios(
            `https://suggestions.pappers.fr/v2?q=${query}`,
        )
        setResult(results.data.resultats_nom_entreprise)
    }

    const getKbis = async (token) => {
        setKbis(await axios(
            `https://api.pappers.fr/v2/document/telechargement?api_token=4903a4d9aad033da2d7057e8c961859b2053fd859d86494b&token=${token}`
        ))
        console.log(kbis)
    }

    const getDataFromSiret = async (query, isSiret) => {
        let resultsSiret = []
        if (isSiret) {
            if (query.length === 14)
                resultsSiret = await axios(
                    `https://api.pappers.fr/v2/entreprise?api_token=4903a4d9aad033da2d7057e8c961859b2053fd859d86494b&siret=${query}`,
                )
            else return false
        }
        else
            resultsSiret = await axios(
                `https://api.pappers.fr/v2/entreprise?api_token=4903a4d9aad033da2d7057e8c961859b2053fd859d86494b&siret=${query.siege.siret}`,
            )
        getKbis(resultsSiret.data.extrait_immatriculation.token)
        setDisabledInputs(true)
        setData(resultsSiret.data.nom_entreprise)
        setInputs(resultsSiret.data)
        setInputsPlaceholder({ siege: { adresse_ligne_1: ' ', code_postal: '', siret_formate: ' ', adresse_ligne_2: ' ', ville: ' ' } })
        setAutoComplete(true)
    }
    return (
        <div className="containerValidatinAccount">
            <div className="rightCol">
                <div className="sideContainer">
                    <h3>Documents</h3>
                    <ul>
                        <li>K-BIS<div className={confirmed.kbis === true ? "confirmed" : "unconfirmed"}></div></li>
                        <li>Pièce d'identité<div className={confirmed.id === true ? "confirmed" : "unconfirmed"}></div></li>
                    </ul>
                </div>
                <Link to="/dashboard/my-commands/token" className={confirmed.kbis === false || confirmed.id === false ? "disabled" : ""}>
                    <button className="blueBtn">Signer mon contrat</button>
                </Link>
            </div>
            <div className="leftCol">
                <h2>Adresse du siège social</h2>
                <span>Merci de confirmer vos coordonnées servant à la facturation de votre commande</span>
                <form>
                    <div className="formLeft">
                        <div className="firstRow">
                            <div className="inputDiv">
                                <input type="text" value={data} onChange={handleOnChange} onKeyDown={(e) => handleKeyDown(e)} />
                                <label>Raison sociale</label>
                                {data.length > 0 && autocomplete === false && <>
                                    <div className="autoCompleteDiv">
                                        <ul>
                                            {loading.length > 0 && <>
                                                <AiOutlineLoading className="loading" />
                                            </>}
                                            {result.length > 0 && result.map((item, index) => {
                                                return (
                                                    <li key={index} onMouseOver={() => setInputsPlaceholder(item)} onClick={() => { getDataFromSiret(item, false); setResult([]); setAutoComplete(false) }}>
                                                        <div className="flexDiv">
                                                            <h4>{item.nom_entreprise}</h4>
                                                        </div>
                                                        <div>
                                                            {item.siege.code_postal ? <>
                                                                <span>({item.siege.code_postal})</span>
                                                            </> : null}
                                                            <span className="libelle">{item.libelle_code_naf}</span>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div></>}
                            </div>
                            <div className="inputDiv">
                                <input type="text"
                                    name="siret"
                                    placeholder={inputsPlaceholder.siege.siret_formate}
                                    disabled={disabledInputs}
                                    defaultValue={inputs.siege.siret_formate}
                                    onChange={(e) => getDataFromSiret(e.target.value, true)}
                                />
                                <label>SIRET</label>
                            </div>
                        </div>
                        <div className="inputDiv">
                            <AutoComplete value={address} handleChange={setAddress} />
                            <label>Adresse</label>
                        </div>
                        <div className="inputDiv">
                            <input type="text" value={address[1]} onChange={(e) => setHqAddress({ ...hqAddress, zip: e.target.value })} />
                            <label>Code postal</label>
                        </div>
                    </div>
                    <div className="formRight">
                        <div className="inputDiv">
                            <input type="text" onChange={(e) => setHqAddress({ ...hqAddress, address2: e.target.value })} />
                            <label>Complément</label>
                        </div>
                        <div className="inputDiv">
                            <input type="text" value={address[2]} onChange={(e) => setHqAddress({ ...hqAddress, city: e.target.value })} />
                            <label>Ville</label>
                        </div>
                    </div>
                </form>
                <h3>K-BIS</h3>
                <span>Joindre un certificat d’immatriculation de moins de 3 moins</span>
                <button className="whiteBtn" onClick={() => setConfirmed({ ...confirmed, kbis: true })}>Joindre</button>
                <h2>Adresse de facturation</h2>
                <span>À renseigner uniquement si différente du siège social</span>
                <form>
                    <div className="formLeft">
                        <div className="firstRow">
                            <div className="inputDiv">
                                <input type="text" placeholder={hqAddress.social} />
                                <label>Raison sociale</label>
                            </div>
                            <div className="inputDiv">
                                <input type="text" />
                                <label>SIRET</label>
                            </div>
                        </div>
                        <div className="inputDiv">
                            <input type="text" placeholder={hqAddress.address1} />
                            <label>Adresse</label>
                        </div>
                        <div className="inputDiv">
                            <input type="number" placeholder={hqAddress.zip} />
                            <label>Code postal</label>
                        </div>
                    </div>
                    <div className="formRight">
                        <div className="inputDiv">
                            <input type="text" placeholder={hqAddress.address2} />
                            <label>Complément</label>
                        </div>
                        <div className="inputDiv">
                            <input type="text" placeholder={hqAddress.city} />
                            <label>Ville</label>
                        </div>
                    </div>
                </form>
                <h2>Informations personnelles</h2>
                <span>Merci de confirmer vos coordonnées servant à la facturation de votre commande</span>
                <form>
                    <div className="formLeft">
                        <div className="firstRow">
                            <div className="inputDiv">
                                <input type="text" />
                                <label>Nom</label>
                            </div>
                            <div className="inputDiv">
                                <input type="text" />
                                <label>Prénom</label>
                            </div>
                        </div>
                        <div className="inputDiv">
                            <input type="text" />
                            <label>Adresse</label>
                        </div>
                        <div className="inputDiv">
                            <input type="number" />
                            <label>Code postal</label>
                        </div>
                        <div className="inputDiv">
                            <input type="mail" />
                            <label>Adresse e-mail</label>
                        </div>
                    </div>
                    <div className="formRight">
                        <div className="inputDiv">
                            <select className="selectInput">
                                <option></option>
                                <option>Fondateur</option>
                            </select>
                            <label>Role</label>
                        </div>
                        <div className="inputDiv">
                            <input type="text" />
                            <label>Ville</label>
                        </div>
                        <div className="inputDiv">
                            <input type="text" />
                            <label>Numéro de téléphone</label>
                        </div>
                    </div>
                </form>
                <h3>Document d'identité</h3>
                <span>Carte d’identité, Passport, Permit de conduire, Carte de séjour...</span>
                <button className="whiteBtn" onClick={() => setConfirmed({ ...confirmed, id: true })}>Joindre</button>
                <span className="footer">
                    Conformément au Règlement Général sur la Protection des Données (RGPD), les documents transmis seront supprimés après validation de votre inscription. Pour en savoir plus, rendez-vous dans nos Conditions Particulières et Conditions Générales de Services ainsi que notre Politique de
                    Confidentialité
            </span>
            </div>
        </div>
    )
}

export default HqForm;