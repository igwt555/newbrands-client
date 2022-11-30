import './ErrorPayment.scss';
import { ButtonLink } from "../../UI/Button/ButtonLink";

export const ErrorPayment = () => {
    return (
        <>
            <div className="containerErrorPayment">
                <h1>Erreur de paiement</h1>
                <span>
                    Une erreur s'est produite lors de votre paiement. Nous vous invitons à prendre contact avec nos équipes pour plus d'informations.
                </span>
                <ButtonLink
                    href="/dashboard"
                    value="Terminer"
                />
            </div>
        </>
    )
}