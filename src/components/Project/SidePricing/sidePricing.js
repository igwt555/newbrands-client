import { useState, useEffect } from 'react';

import './sidepricing.scss';

import { Route } from "react-router-dom";

import { makeProjectGoToNextStep } from '../../../store/service';

import { steps } from '../../../constants/projectSteps';

const SidePricing = (props) => {

    const { price, step, projectId } = props;

    const [loading, setLoading] = useState(false);
    const [stepName, setStepName] = useState('');

    useEffect(() => {
        console.log('OODODOD');
        if (step) {
            setStepName(steps[step].stepName);
        }
    }, []);

    const validateProposition = (history) => {
        setLoading(true);
        makeProjectGoToNextStep({ step: parseInt(step) + 1 }, projectId).then(res => {
            if (res.status === 200) history.push('/deferred-payment/' + projectId);
        }).finally(() => setLoading(false));
    }

    return (
        <div className="containerSidePricing">
            <h4>{stepName}</h4>
            {console.log(price)}
            {
                price && step && step < 5 && <div className="grid">
                    <div className="firstCol">
                        {/*<span>Sous-total</span>
                        <span>Remise</span>*/}
                        <span>Total H.T</span>
                        <div className="totals">
                            <span>TVA (20%) </span>
                            <span>Total TTC</span>
                        </div>
                    </div>
                    <div className="secondCol">
                        <span>{price.priceHt.toFixed(2)} €</span>
                        <div className="totals">
                            <span>{price.tva.toFixed(2)} €</span>
                            <span>{price.priceTtc.toFixed(2)} €</span>
                        </div>
                    </div>

                    {
                        stepName === 'Proposition' &&
                        <Route render={({ history }) => (
                            <button className="btn blueBtn" onClick={() => validateProposition(history)}>Valider la proposition</button>
                        )} />
                    }
                    {
                        stepName === 'En attente de paiement' &&
                        <Route render={({ history }) => (
                            <button className="btn blueBtn" onClick={() => history.push('/deferred-payment/' + projectId)}>Procéder au paiement</button>
                        )} />
                    }
                </div>
            }
            {/*<button className={classes.blueBtn}>Télécharger ma facture</button>*/}
        </div>
    )
}

export default SidePricing;