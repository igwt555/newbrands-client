import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./RegisterForm.scss";
import ClipLoader from 'react-spinners/ClipLoader';

import { checkMail, register, registerInvited } from '../../../store/service';

import { CompanyInput } from '../../UI/Inputs/CompanyInput/CompanyInput';
import { Button } from '../../UI/Button/Button';

import { checkIfEmailIsValid, checkIfPhoneIsValid } from '../../../utils/formInputCheckers';

export const RegisterForm = (props) => {

    const { hasCompany, handleBack, invite = false, email = "", lName = "", fName = "", userId } = props;

    const [firstName, setFirstName] = useState(fName);
    const [lastName, setLastName] = useState(lName);
    const [mail, setMail] = useState(email);
    const [error, setError] = useState("");
    const [phone, setPhone] = useState("");
    const [fonction, setFonction] = useState("");
    const [country, setCountry] = useState("");
    const [companySiret, setCompanySiret] = useState("");
    const [companySiren, setCompanySiren] = useState("");
    const [companyNaf, setCompanyNaf] = useState("");
    const [companyName, setCompanyName] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [validCompany, setValidCompany] = useState(false);

    const history = useHistory();

    /* Check email validity & if in use */
    const verifyMail = async () => {
        if (mail.length !== 0) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))
                return false;
            else
                return await checkMail( { email: mail } ).then((res) => {
                    setError('')
                }).catch((error) => {
                    if (error.response.data.message === "email déjà existant")
                        setError(`Il semblerait que vous ayez déjà un compte.`)
                });
        }
    }

    const verifyForm = () => {
        let msg = '';

        if (firstName.length === 0)
            return `Vous devez indiquer le prénom de l'utilisateur`;
        else if (lastName.length === 0)
            return `Vous devez indiquer le nom de famille de l'utilisateur`;
        else if ((msg = checkIfEmailIsValid(mail)) !== '')
            return msg;
        else if ((msg = checkIfPhoneIsValid(phone)) !== '')
            return msg;
        else if (password.length === 0)
            return `Vous devez spécifier un mot de passe`;
        else if (confPassword !== password)
            return `La confirmation du mot de passe doit être identique au mot de passe`;
        else if ((companyName === "" && !hasCompany && !invite) || (hasCompany && !validCompany))
            return `Vous devez indiquer le nom de l'entreprise`;
        else if (fonction.length === 0)
            return `Vous devez indiquer la fonction de l'utilisateur`;
        else if (companySiret.length === 0 && hasCompany)
            return `Vous devez indiquer le SIRET de l'entreprise`;
        else if (country.length === 0)
            return `Vous devez sélectionner un pays`;
        
        return msg;
    }

    const handleForm = (value, setValue) => {
        setValue(value);
        setError('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const errMsg = verifyForm();

        if (errMsg.length > 0) {
            setError(errMsg);
            return;
        }

        if (window.analytics) {
            window.analytics.identify(null, { email: mail });
            window.analytics.track('formSubmitted');
        }

        let data = {
            email: mail,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            siret: companySiret === "" ? "000000000" : companySiret,
            pays: country,
            fonction: fonction,
            company: companyName,
            password: password,
            siren: companySiren === "" ? "000000000" : companySiren,
            code_naf: companyNaf === "" ? null : companyNaf,
            cityRCS: companyCity === "" ? null : companyCity,
            isnotacompany: !hasCompany
        };

        setFormLoading(true);

        register(data).then((res) => {
            console.log(res);
            if (res.data.code === 900) {
                setError("Une erreur s'est produite");
            } else {
                localStorage.setItem('idUserNewBrands', res.data.userId);
                localStorage.setItem('idCompanyUserNewBrands', res.data.companyId);
                setError('');
                history.push('/billing', history.location.state);
            }
        }).catch((error) => {
            if (error.response.data.status === 500 && error.response.data.message === "email déjà existant")
                setError(`Il semblerait que vous ayez déjà un compte.`)
            else if (error.response.data.status === 500)
                setError(`Erreur`)
        }).finally(() => {
            setFormLoading(false);
        });
    }

    const handleInvite = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const errMsg = verifyForm();

        if (errMsg.length > 0) {
            setError(errMsg);
            return;
        }

        if (window.analytics) {
            window.analytics.identify(null, { email: mail });
            window.analytics.track('formSubmitted');
        }

        let data = {
            email: mail,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            pays: country,
            fonction: fonction,
            password: password
        };

        setFormLoading(true);

        registerInvited(userId, data).then(res => {
            if (res.data.code === "900") {
                setError("Une erreur s'est produite.");
            } else {
                history.replace('/sign-in');
            }
        }).catch((error) => {
            setError(`Une erreur s'est produite.`)
        }).finally(() => {
            setFormLoading(false);
        });
    }

    return (
        <form className="containerForm" style={{maxWidth: '70%'}} onSubmit={(e) => {
            e.preventDefault();
            if(invite) handleInvite(e);
            else handleSubmit(e);
        }}>

            <div className="inputDiv">
                <input type="text" value={firstName} onChange={(e) => handleForm(e.target.value, setFirstName)} />
                <label>Prénom</label>
            </div>

            <div className="inputDiv">
                <input type="text" value={lastName} onChange={(e) => handleForm(e.target.value, setLastName)} />
                <label>Nom</label>
            </div>

            <div className={`${"inputDiv"} ${error.length > 0 && "inputError"}`}>
                <input
                type="email"
                value={mail}
                onChange={(e) => {handleForm(e.target.value, setMail)} }
                onBlur={(e) => verifyMail()}
                disabled={invite}
                />
                <label>Email professionnel</label>
            </div>

            <div className="inputDiv">
                <input type="tel" value={phone} onChange={(e) => {handleForm(e.target.value, setPhone)} } />
                <label>Numéro de téléphone</label>
            </div>

            <div className="inputDiv">
                <input type="password" value={password} onChange={(e) => {handleForm(e.target.value, setPassword)} } />
                <label>Mot de passe</label>
            </div>

            <div className="inputDiv">
                <input type="password" value={confPassword} onChange={(e) => {handleForm(e.target.value, setConfPassword)} } />
                <label>Confirmation mot de passe</label>
            </div>

            {hasCompany ? 
            <div className="inputDiv">
                <CompanyInput
                value={companyName}
                handleChange={(v) => setCompanyName(v)}
                handleSelect={(s) => {
                    setCompanyName(s.nom_entreprise);
                    setCompanySiret(s.siege.siret_formate);
                    setCompanySiren(s.siren);
                    setCompanyNaf(s.code_naf);
                    setCompanyCity(s.villes[0]);
                }}
                validate={v => setValidCompany(v)}
                valid={validCompany}
                />
                <label>Société</label>
            </div>
            : !invite &&
            <div className="inputDiv">
                <input type="text" value={companyName} onChange={(e) => handleForm(e.target.value, setCompanyName)} />
                <label>Nom de votre future entreprise</label>
            </div>
            }

            <div className="inputDiv">
                <select className="selectInput" value={fonction} onChange={(e) => handleForm(e.target.value, setFonction)}>
                    <option></option>
                    <option>Designer</option>
                    <option>Chef de projet</option>
                    <option>Équipe création</option>
                </select>
                <label>Fonction</label>
            </div>
            
            {hasCompany &&
            <div className="inputDiv">
                <input type="text" maxLength={13} value={companySiret} onChange={(e) => handleForm(e.target.value, setCompanySiret)} />
                <label>SIRET / DUNS</label>
            </div>
            }

            <div className="inputDiv">
                <select className="selectInput" value={country} onChange={(e) => handleForm(e.target.value, setCountry)}>
                    <option></option>
                    <optgroup label="North America">
                        <option value="US">United States</option>
                        <option value="UM">United States Minor Outlying Islands</option>
                        <option value="CA">Canada</option>
                        <option value="MX">Mexico</option>
                        <option value="AI">Anguilla</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AW">Aruba</option>
                        <option value="BS">Bahamas</option>
                        <option value="BB">Barbados</option>
                        <option value="BZ">Belize</option>
                        <option value="BM">Bermuda</option>
                        <option value="VG">British Virgin Islands</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CU">Cuba</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="SV">El Salvador</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GT">Guatemala</option>
                        <option value="HT">Haiti</option>
                        <option value="HN">Honduras</option>
                        <option value="JM">Jamaica</option>
                        <option value="MQ">Martinique</option>
                        <option value="MS">Montserrat</option>
                        <option value="AN">Netherlands Antilles</option>
                        <option value="NI">Nicaragua</option>
                        <option value="PA">Panama</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint Lucia</option>
                        <option value="VC">Saint Vincent and the Grenadines</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TC">Turks and Caicos Islands</option>
                        <option value="VI">US Virgin Islands</option>
                    </optgroup>
                    <optgroup label="South America">
                        <option value="AR">Argentina</option>
                        <option value="BO">Bolivia</option>
                        <option value="BR">Brazil</option>
                        <option value="CL">Chile</option>
                        <option value="CO">Colombia</option>
                        <option value="EC">Ecuador</option>
                        <option value="FK">Falkland Islands (Malvinas)</option>
                        <option value="GF">French Guiana</option>
                        <option value="GY">Guyana</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="SR">Suriname</option>
                        <option value="UY">Uruguay</option>
                        <option value="VE">Venezuela</option>
                    </optgroup>
                    <optgroup label="Europe">
                        <option value="GB">United Kingdom</option>
                        <option value="AL">Albania</option>
                        <option value="AD">Andorra</option>
                        <option value="AT">Austria</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BG">Bulgaria</option>
                        <option value="HR">Croatia (Hrvatska)</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="FR">France</option>
                        <option value="GI">Gibraltar</option>
                        <option value="DE">Germany</option>
                        <option value="GR">Greece</option>
                        <option value="VA">Holy See (Vatican City State)</option>
                        <option value="HU">Hungary</option>
                        <option value="IT">Italy</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MK">Macedonia</option>
                        <option value="MT">Malta</option>
                        <option value="MD">Moldova</option>
                        <option value="MC">Monaco</option>
                        <option value="ME">Montenegro</option>
                        <option value="NL">Netherlands</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="RO">Romania</option>
                        <option value="SM">San Marino</option>
                        <option value="RS">Serbia</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="ES">Spain</option>
                        <option value="UA">Ukraine</option>
                        <option value="DK">Denmark</option>
                        <option value="EE">Estonia</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FI">Finland</option>
                        <option value="GL">Greenland</option>
                        <option value="IS">Iceland</option>
                        <option value="IE">Ireland</option>
                        <option value="LV">Latvia</option>
                        <option value="LT">Lithuania</option>
                        <option value="NO">Norway</option>
                        <option value="SJ">Svalbard and Jan Mayen Islands</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="TR">Turkey</option>
                    </optgroup>
                    <optgroup label="Asia">
                        <option value="AF">Afghanistan</option>
                        <option value="AM">Armenia</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BT">Bhutan</option>
                        <option value="IO">British Indian Ocean Territory</option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="KH">Cambodia</option>
                        <option value="CN">China</option>
                        <option value="CX">Christmas Island</option>
                        <option value="CC">Cocos (Keeling) Islands</option>
                        <option value="GE">Georgia</option>
                        <option value="HK">Hong Kong</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran</option>
                        <option value="IQ">Iraq</option>
                        <option value="IL">Israel</option>
                        <option value="JP">Japan</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KP">Korea, Democratic People's Republic of</option>
                        <option value="KR">Korea, Republic of</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Lao</option>
                        <option value="LB">Lebanon</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="MN">Mongolia</option>
                        <option value="MM">Myanmar (Burma)</option>
                        <option value="NP">Nepal</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PH">Philippines</option>
                        <option value="QA">Qatar</option>
                        <option value="RU">Russian Federation</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SG">Singapore</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SY">Syria</option>
                        <option value="TW">Taiwan</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TH">Thailand</option>
                        <option value="TP">East Timor</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VN">Vietnam</option>
                        <option value="YE">Yemen</option>
                    </optgroup>
                    <optgroup label="Australia / Oceania">
                        <option value="AS">American Samoa</option>
                        <option value="AU">Australia</option>
                        <option value="CK">Cook Islands</option>
                        <option value="FJ">Fiji</option>
                        <option value="PF">French Polynesia (Tahiti)</option>
                        <option value="GU">Guam</option>
                        <option value="KB">Kiribati</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="FM">Micronesia, Federated States of</option>
                        <option value="NR">Nauru</option>
                        <option value="NC">New Caledonia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NU">Niue</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="PW">Palau</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PN">Pitcairn</option>
                        <option value="WS">Samoa</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="TK">Tokelau</option>
                        <option value="TO">Tonga</option>
                        <option value="TV">Tuvalu</option>
                        <option value="VU">Vanuatu</option>
                        <option valud="WF">Wallis and Futuna Islands</option>
                    </optgroup>
                    <optgroup label="Africa">
                        <option value="DZ">Algeria</option>
                        <option value="AO">Angola</option>
                        <option value="BJ">Benin</option>
                        <option value="BW">Botswana</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="CM">Cameroon</option>
                        <option value="CV">Cape Verde</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CD">Congo, the Democratic Republic of the</option>
                        <option value="DJ">Dijibouti</option>
                        <option value="EG">Egypt</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="ET">Ethiopia</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GH">Ghana</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="CI">Cote d'Ivoire (Ivory Coast)</option>
                        <option value="KE">Kenya</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="ML">Mali</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="YT">Mayotte</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="NA">Namibia</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="RE">Reunion</option>
                        <option value="RW">Rwanda</option>
                        <option value="ST">Sao Tome and Principe</option>
                        <option value="SH">Saint Helena</option>
                        <option value="SN">Senegal</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="SS">South Sudan</option>
                        <option value="SD">Sudan</option>
                        <option value="SZ">Swaziland</option>
                        <option value="TZ">Tanzania</option>
                        <option value="TG">Togo</option>
                        <option value="TN">Tunisia</option>
                        <option value="UG">Uganda</option>
                        <option value="EH">Western Sahara</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                    </optgroup>
                    <option value="AQ">Antarctica</option>
                </select>
                <label>Pays</label>
            </div>

            <div className="containerRes">
                {error.length > 0 && 
                    <div className="mailError">
                        {error}
                        {error === 'Il semblerait que vous ayez déjà un compte.' &&
                            <a href="/sign-in">Se connecter</a>
                        }
                    </div>
                }
                <br/>

                <div className="buttonsContainer">
                    { !invite && <Button value="&lt;&nbsp; Retour" handleClick={handleBack} color="light" className="back" /> }
                    <button className="btn blueBtn">
                        S'inscrire
                        <ClipLoader color={'#fff'} loading={formLoading} size={20} />
                    </button>
                </div>
            </div>
        </form>
    )
}