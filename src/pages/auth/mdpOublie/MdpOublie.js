import { useState } from 'react';
import '../SignIn/SignIn.scss';

import { forgotPwd } from '../../../store/service';

import { Footer } from '../../../components/Footer/footer';
import { Button } from '../../../components/UI/Button/Button';

export const MdpOublie = () => {

    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [mail, setMail] = useState("");
    const [loading, setLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        forgotPwd(mail).then(() => {
            setLoading(false);
            setSent(true);
        }).catch(() => {
            setLoading(false);
            setError("Une erreur s'est produite. Veuillez vérifier votre adresse e-mail et rééssayer.");
        });
    }
        
    return (
    <>
        <div className="containerMdpOublie">
            <h1>Mot de passe oublié</h1>
            {!sent ? <>
            <h2>Pas d'inquiétude ! Saisissez votre adresse e-mail ci-dessous, nous vous enverront un mail avec un lien pour réinitialiser votre mot de passe.</h2>
            <form onSubmit={(e) => sendEmail(e)}>
                <div className="inputDiv">
                    <input type="email" id="mail" value={mail} onChange={(e) => setMail(e.target.value)} required />
                    <label htmlFor="mail">Adresse e-mail</label>
                </div>
                <span className='error'>{error}</span>
                <Button
                handleClick={(e) => sendEmail(e)}
                loading={loading}
                value="Envoyer"
                disabled={mail === ""}
                />
            </form>
            </> :
            <h2>
                Un e-mail vous a été envoyé à l'adresse <b>{mail}</b>.<br/>
                Suivez les instructions pour réinitialiser votre mot de passe. Pensez à vérifier vos spams.
            </h2>
            }
        </div>

        <Footer />
    </>
    )
}