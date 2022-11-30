import { useContext, useState } from 'react';
import { API } from '../../../config';
import { Redirect } from 'react-router';
import './SignIn.scss';
import { Link } from 'react-router-dom';

import { UserStoreContext } from '../../../store/userStore';
import { login, getProfileInformation, saveLogin } from '../../../store/service';

import { Footer } from '../../../components/Footer/footer';

import commandConfirmedImg from '../../../assets/img/commandconfirmed.png';

export const SignIn = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [loginMsg, setLoginMsg] = useState("Connexion");
    const [error, setError] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch } = useContext(UserStoreContext);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginMsg("Connexion en cours...");
        setError("");

        const request = { username: mail, password: password };

        login(request).then((res) => {
            localStorage.clear();
            localStorage.setItem("session", res.data.token);
            saveLogin();
            setError("");
            setLoggedIn(true);

            getProfileInformation().then((res) => {
                const d = JSON.stringify(res.data[0]);

                // if(!d.isActive) return <Redirect to="/sign-in" />

                localStorage.setItem("userId", res.data[0].id);
                localStorage.setItem("user", d);
                dispatch({ type: 'setUser', user: res.data[0] });

                if (res.data[0].picture)
                    dispatch({ type: 'setProfilePic', picture: `${API}/upload/user/${res.data[0].id}/${res.data[0].picture}` });
            });
        }).catch((err) => {
            setError("Une erreur s'est produite. Veuillez vérifier vos identifiants et rééssayer.");
            setLoginMsg("Connexion");
        });
    }

    if(loggedIn)
        return (<Redirect to="/dashboard" />);
        
    return (
    <>
        <div className="containerSignIn">
            <div className="contentDiv">
                <div className="dottedDiv">
                    <div className="MainDiv">
                        <div className="mainDivContent">
                            <h1>Connexion</h1>

                            <div className="subtitleDiv">
                                <h2>Ravis de vous revoir</h2>
                            </div>
                            <p>Entrez votre adresse e-mail afin d'accéder à votre compte NewBrands !</p>
                            <form onSubmit={(e) => handleLogin(e)}>
                                <div className="inputDiv">
                                    <input type="mail" id="mail" value={mail} onChange={(e) => setMail(e.target.value)} required />
                                    <label htmlFor="mail">Adresse e-mail</label>
                                </div>
                                <div className="inputDiv">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" required />
                                    <label htmlFor="password">Mot de passe</label>
                                </div>
                                <button className="filledBtn" onClick={(e) => handleLogin(e)}>{loginMsg}</button>
                                {error}
                            </form>
                            <p className="textRedirectingToRegister">
                                Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link><br/>
                                <Link to="forgot-password" className='mdp-oublie'>Mot de passe oublié ?</Link>
                            </p>
                        </div>
                    </div>
                    <span className="lengthSpan">46</span>
                </div>
                <div className="imgDiv">
                    <img className="img" src={commandConfirmedImg} alt="confirmed" />
                </div>
            </div>
        </div>

        <Footer />
    </>
    )
}