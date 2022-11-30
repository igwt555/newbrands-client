import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../SignIn/SignIn.scss';

import { resetPwd } from '../../../store/service';

import { Footer } from '../../../components/Footer/footer';
import { Button } from '../../../components/UI/Button/Button';
import { ButtonLink } from '../../../components/UI/Button/ButtonLink';

export const MdpReset = () => {

    const { token } = useParams();

    const [pwdUpdated, setPwdUpdated] = useState(false);
    const [error, setError] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [loading, setLoading] = useState(false);

    const resetPassword = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        resetPwd(pwd, token).then(() => {
            setLoading(false);
            setPwdUpdated(true);
        }).catch(() => {
            setLoading(false);
            setError(`Une erreur s'est produite. Vérifiez que l'url correspond bien au lien dans le mail. Si oui, votre demande a probablement expiré. Vous devez recommencer la démarche pour réinitialiser votre mot de passe.`);
        });
    }
        
    return (
    <>
        <div className="containerMdpReset">
            <h1>Réinitialser votre mot de passe</h1>
            {!pwdUpdated ? <>
            <h2>Veuillez saisir votre nouveau mot de passe.</h2>
            <form onSubmit={(e) => resetPassword(e)}>
                <div className="inputDiv">
                    <input type="password" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} required />
                    <label htmlFor="pwd">Mot de passe</label>
                </div>
                <div className="inputDiv">
                    <input type="password" id="confirmPwd" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} required />
                    <label htmlFor="confirmPwd">Confirmer le mot de passe</label>
                </div>
                {error !== "" ? <>
                <span className='error'>
                    {error.split(".")[0]}.{error.split(".")[1]}.<br/>{error.split(".")[2]}.{error.split(".")[3]}.
                </span>
                <ButtonLink href="/forgot-password" value="Mot de passe oublié"/>
                </> :
                <Button
                handleClick={(e) => resetPassword(e)}
                loading={loading}
                value="Changer"
                disabled={pwd === "" || pwd !== confirmPwd}
                />
                }
            </form>
            </> : <>
            <h2>Votre mot de passe a bien été changé ! Connectez-vous avec votre nouveau mot de passe.</h2>
            <ButtonLink href="/sign-in" value="Connexion"/>
            </>
            }
        </div>

        <Footer />
    </>
    )
}