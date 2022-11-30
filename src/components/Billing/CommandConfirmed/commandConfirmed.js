import React, { useState } from 'react';
import commandConfirmedImg from '../../../assets/img/commandconfirmed.png'
import './commandconfirmed.scss'
import { Route } from "react-router-dom"
import { editPassword } from '../../../store/service';

function CommandConfirmed() {
    let [password, setPassword] = useState("");
    let idUser = localStorage.getItem("userId");

    const handleChange = (input, value) => {
        setPassword(value);
    }
    const handleSubmit = () => {
        let data = {
            idUser: idUser,
            password: password,
        }
        editPassword(data).then((res) => {
            if(res.status === 200)
                window.location.href = '/sign-in';
        });
    }

    return (
        <div className="containerCommandConfirmed">
            <div className="contentDiv">
                <div className="dottedDiv">
                    <div className="MainDiv">
                        <div className="mainDivContent">
                            <h1>
                                John Dupont <span className="companyName">Zara</span><span className="country">France</span>
                            </h1>
                            <p>Merci d’ajouter un mot de passe pour créer votre compte afin d’accéder à NewBrands !</p>
                            <div className="inputDiv">
                                <input type="password" id="password" onChange={(e) => handleChange('password', e.target.value)} value={password}/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            <Route render={({ history }) => (
                                <button className="filledBtn" disabled={password.length === 0 ? true : false} onClick={() => handleSubmit()}>Valider le mot de passe</button>
                            )} />
                        </div>
                    </div>
                    <span className="lengthSpan">46</span>
                </div>
                <div className="imgDiv">
                    <img className="img" src={commandConfirmedImg} alt="confirmed" />
                </div>
            </div>
        </div>
    )
}

export default CommandConfirmed;
