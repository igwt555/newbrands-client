import payementSuccessImg from '../../../assets/img/paymentsuccess.png'
import Checkmark from '../../../assets/img/checkmarkround.svg'
import './paymentcomplete.scss';
import { ButtonLink } from '../../UI/Button/ButtonLink';

export const PaymentComplete = () => {
    return (
        <div className="containerPaymentComplet">
            <div className="contentDiv">
                <div className="dottedDiv">
                    <div className="MainDiv">
                        <div className="mainDivContent">
                            <h1>
                                <img src={Checkmark} alt="checkmark" />
                                Paiement validé, merci !
                            </h1>
                            <ButtonLink
                                href="/dashboard"
                                value="Dashboard"
                                color="white"
                            />
                        </div>
                    </div>
                    <span className="lengthSpan">46</span>
                </div>
                <div className="imgDiv">
                    <img className="img" src={payementSuccessImg} alt="success" />
                </div>
            </div>
            <p className="tagline">
                Nous espérons que notre offre correspondra à vos attentes.
                Celle-ci peut toujours être renégociée par téléphone avec l’un de nos conseillers.
                Sachez que nos services et tarifs sont agiles afin de toujours s’adapter à votre activité et vos besoins.
            </p>
            {/* <div className="btnDiv">
                <Route
                    render={({ history }) => (
                        <button className="outlineBtn" onClick={() => history.goBack()}>
                            Annuler
                        </button>
                    )}
                />
                <span className="endSpan">
                    Terminé !
                </span>
            </div> */}
        </div>
    )
}