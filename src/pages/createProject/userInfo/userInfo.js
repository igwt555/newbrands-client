import { useState, useEffect, useContext } from "react";
import { Layout } from "antd";
import './index.scss';
import { AiOutlineLoading } from "react-icons/ai";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";

import { ContentTitle, ContentSubTitle } from "../../../components/global";
import NavHeader from "../../../components/createProject/NavHeader";
import CustomTextField from "../../../components/createProject/customTextField";
import { CompanyInput } from "../../../components/UI/Inputs/CompanyInput/CompanyInput";

import { getEnterpriseData } from "../../../store/service";
import { StoreContext } from '../../../store/store';
import { checkIfEmailIsValid, checkIfPhoneIsValid } from '../../../utils/formInputCheckers';

const { Content } = Layout;

const UserInfo = (props) => {

    const { errorQuickbook } = props;

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [society, setSociety] = useState('');
    const [role, setRole] = useState('');
    const [siret, setSiret] = useState('');
    const [country, setCountry] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [siren, setSiren] = useState("");
    const [companyNaf, setCompanyNaf] = useState("");
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [validCompany, setValidCompany] = useState(false);

    const { state, dispatch } = useContext(StoreContext);

    const infoInStore = state.info;
    const error = state.error;
    const errorMsg = state.errorMsg;

    useEffect(() => {
        console.log(infoInStore);
        if (infoInStore !== undefined && infoInStore !== null) {
            infoInStore.firstName && setFirstname(infoInStore.firstName);
            infoInStore.lastName && setLastname(infoInStore.lastName);
            infoInStore.email && setEmail(infoInStore.email);
            infoInStore.phone && setPhone(infoInStore.phone);
            infoInStore.companyName && setSociety(infoInStore.companyName);
            infoInStore.fonction && setRole(infoInStore.fonction);
            infoInStore.siret && setSiret(infoInStore.siret);
            infoInStore.pays && setCountry(infoInStore.pays);
        }
    }, []);

    useEffect(() => {
        const cpy = infoInStore;

        cpy.firstName = firstname;
        dispatch({ type: 'setInfo', info: cpy });
    }, [firstname]);

    useEffect(() => {
        const cpy = infoInStore;

        cpy.lastName = lastname;
        dispatch({ type: 'setInfo', info: cpy });
    }, [lastname]);

    useEffect(() => {
        const cpy = infoInStore;

        cpy.email = email;
        dispatch({ type: 'setInfo', info: cpy });
    }, [email]);

    useEffect(() => {
        const cpy = infoInStore;

        cpy.phone = phone;
        dispatch({ type: 'setInfo', info: cpy });
    }, [phone]);

    // useEffect(() => {
    //     const cpy = infoInStore;

    //     cpy.companyName = society;
    //     dispatch({ type: 'setInfo', info: cpy });
    // }, [society]);

    useEffect(() => {
        const cpy = infoInStore;

        cpy.companyName = society;
        cpy.validCompany = validCompany;
        dispatch({ type: 'setInfo', info: cpy });
    }, [validCompany]);

    useEffect(() => {
        const cpy = infoInStore;

        cpy.fonction = role;
        dispatch({ type: 'setInfo', info: cpy });
    }, [role]);

    useEffect(() => {
        const cpy = infoInStore;

        cpy.siret = siret;
        dispatch({ type: 'setInfo', info: cpy });
    }, [siret]);

    useEffect(() => {
        const cpy = infoInStore;

        cpy.pays = country;
        dispatch({ type: 'setInfo', info: cpy });
    }, [country]);

    useEffect(() => {
        setErr(error);
        setErrMsg(errorMsg);
    }, [error, errorMsg]);

    useEffect(() => {
        if (err) dispatch({ type: 'setError', error: false, errorMsg: '' });
    }, [firstname, lastname, email, phone, society, role, siret, country]);

    return (
        <Layout>
            <NavHeader title="Coordonnées" />
            <Content
            style={{
                margin: "0",
                padding: "70px 100px 20px 100px",
                minHeight: 280,
                backgroundColor: "white",
            }}
            >
                <ContentTitle>Vos coordonnées</ContentTitle>
                <ContentSubTitle>
                    Merci de nous transmettre vos coordonnées afin de vous recontacter
                </ContentSubTitle>
                <center
                    style={{
                    padding: "40px 100px 0 100px",
                    fontFamily: "Gelion Medium",
                    fontSize: "24px",
                    }}
                >
                    <div className="userInfoInputContainer">
                        <div className={`${err && (!firstname || firstname.length === 0) ? 'error' : ''}`}>
                            <CustomTextField
                            value={firstname}
                            onInput={(e) => setFirstname(e.target.value)}
                            label="Prénom"
                            />
                        </div>
                        <div className={`${err && (!lastname || lastname.length === 0) ? 'error' : ''}`}>
                            <CustomTextField
                            value={lastname}
                            onInput={(e) => setLastname(e.target.value)}
                            label="Nom"
                            />
                        </div>
                        <div className={`${err && (!email || email.length === 0 || checkIfEmailIsValid(email)) ? 'error' : ''}`}>
                            <CustomTextField
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                            label="Email professionnel"
                            />
                        </div>
                        <div className={`${err && (!phone || phone.length === 0 || checkIfPhoneIsValid(phone)) ? 'error' : ''}`}>
                            <PhoneInput
                            country={'fr'}
                            value={phone}
                            onChange={(p) => setPhone(p)}
                            />
                        </div>
                        <div className={`${err && (!society || society.length === 0) ? 'error' : ''} inputDiv`}>
                            <CompanyInput
                            value={society}
                            handleChange={(v) => setSociety(v)}
                            handleSelect={(s) => {
                                setSociety(s.nom_entreprise);
                                setSiret(s.siege.siret_formate);
                                setSiren(s.siren);
                                setCompanyNaf(s.code_naf);
                                setCompanyCity(s.villes[0]);
                            }}
                            validate={v => setValidCompany(v)}
                            valid={validCompany}
                            />
                        </div>
                        <div className={`${err && (!role || role.length === 0) ? 'error' : ''}`}>
                            <CustomTextField
                            value={role}
                            onInput={(e) => setRole(e.target.value)}
                            label="Fonction"
                            />
                        </div>
                        <div className={`${err && (!siret || siret.length === 0) ? 'error' : ''}`}>
                            <CustomTextField
                            value={siret}
                            onInput={(e) => setSiret(e.target.value)}
                            label="SIRET / DUNS"
                            />
                        </div>
                        <div className={`${err && (!country || country.length === 0) ? 'error' : ''}`}>
                            {/*<CustomTextField
                            value={country}
                            onInput={(e) => setCountry(e.target.value)}
                            label="Pays"
                            />*/}
                            <select className="selectInput" value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value="">Pays</option>
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
                        </div>
                    </div>

                    <p className="userInfoErrorMessage">{errMsg}</p>
                    { errorQuickbook && <p className="userInfoErrorMessage">Une erreur est survenue. Veuillez réessayer.</p>}
                </center>
            </Content>
        </Layout>
    );
}

export default UserInfo;
