import paymentSuccessImg from '../../assets/img/paymentsuccess.png'
import Checkmark from '../../assets/img/checkmarkround.svg'
import './PaymentComplete/paymentcomplete.scss'
import { Route } from "react-router-dom"

function RegisterCompleted() {
    return (
        <div className="containerPaymentComplet">
            <div className="contentDiv">
                <div className="dottedDiv">
                    <div className="MainDiv">
                        <div className="mainDivContent">
                            <h1>
                                <img src={Checkmark} alt="checkmark" />
                                Inscription prise en compte, merci !
                            </h1>
                            <button className="whiteBtn">Mon compte</button>
                        </div>
                    </div>
                    <span className="lengthSpan">46</span>
                </div>
                <div className="imgDiv">
                    <img className="img" src={paymentSuccessImg} alt="success" />
                </div>
            </div>
            <p className="tagline">
                Nous espérons que notre offre correspondra à vos espèrances,
                celle-ci peut toujours être renégociée par téléphone avec l’un de nos conseillers.
                Sachez que, nos services et tarifs sont agiles afin de toujours s’adapter à votre activité et besoins.
            </p>
            <div className="btnDiv">
                <Route
                    render={({ history }) => (
                        <button className="outlineBtn" onClick={() => history.goBack()}>
                            Annuler
                        </button>
                    )}
                />
                <Route
                    render={({ history }) => (
                        <button className="endBtn" onClick={() => history.push('command-success')}>
                            Terminer !
                        </button>
                    )}
                />
            </div>
        </div>
    )
}

export default RegisterCompleted;
