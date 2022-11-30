import React, { useContext, useEffect, useState } from 'react';
import './subscription.scss';

import { Link } from 'react-router-dom';
import { UserStoreContext } from '../../../store/userStore';

import { stopPayment, getProfileInformation } from '../../../store/service';

const Subscription = () => {

    const [subscriptionInfo, setSubscriptionInfo] = useState();
    const [isSubscribed, setIsSubscribed] = useState();
    const [user, setUser] = useState();

    const { state, dispatch } = useContext(UserStoreContext);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        console.log(user);

        setUser(user);
        setSubscriptionInfo(user.abonnement);
        setIsSubscribed(user.abonnement["abonné"]);

        getProfileInformation().then(res => {
            if (res.status === 200 && res.data[0] !== null) {
                let u = res.data[0];
                setUser(u);
                setSubscriptionInfo(u.abonnement);
                setIsSubscribed(u.abonnement["abonné"]);
            }
        });
    }, []);

    return (
        <div className="containerSubscription">
            <div className="mainContent">
                <h2>Adresse du siège social</h2>
                <span>Merci de confirmer vos coordonnées servant à la facturation de votre commande</span>
                <div className="cardContainer">
                    <div>
                        <h3 className="currentSubscription">Abonnement actuel :</h3>
                        <span className="price">{ !isSubscribed ? "GRATUIT 0€/mois" : `${subscriptionInfo && subscriptionInfo.montantAbo}€/${subscriptionInfo && (subscriptionInfo.dureeAbo === 0 ? 'an' : 'mois')}`}</span>
                    </div>
                    <p className="subscriptionDescription">
                        L’abonnement gratuit vous permet de lancer plusieurs drops ou sourcing en illimité sans le coût fixe d’un abonnement mensuel. À chaque commande effectuée, une commission est facturée et calculée sur le volume total de votre commande allant de 7,0% à 17.5%.
                    </p>
                    {
                        isSubscribed ?
                        /*<button className="blueBtn" onClick={() => {
                        stopPayment().then(res => {
                            if (res.status === 200) {
                                setSubscriptionInfo();
                                setIsSubscribed();
                                if (user) {
                                    const new_user = {...user, abonnement: { "abonné": false, montantAbo: 0, dureeAbo: null }};

                                    setUser(new_user);
                                    dispatch({ type: 'setUser', user: new_user });
                                    localStorage.setItem('user', JSON.stringify(new_user));
                                }
                            }
                        }).catch(err => console.log(err))
                        }}>Stopper l'abonnement</button>*/null
                        :
                        <Link to='/billing'>
                            <button className="blueBtn">S'abonner</button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Subscription;