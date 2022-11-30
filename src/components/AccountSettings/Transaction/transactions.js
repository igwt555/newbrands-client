import React, { useEffect, useState } from 'react';
import './transactions.scss';
import { BsArrowRight } from 'react-icons/bs';
import { getOrderInformation } from '../../../store/service';

const treatmentAPI = [
    ["Remboursement", "123456", "Remboursement au titre de votre projet", "Nom projet", "132456", 11333.33],
    ["Paiement CB", "123456", "Paiement au titre de votre abonnement", null, null, -99.99],
    ["Virement bancaire", "123456", "Paiement au titre de votre sourcing de matière", null, "123456", -11333.33],
    ["Virement bancaire", "123456", "Paiement au titre de votre projet", "Nom projet", "123456", -11333.33],
]
const passedAPI = [
    ["Mardi 14 février 2021", "Remboursement", "123456", "Remboursement au titre de votre projet", "Nom projet", "132456", 11333.33, null],
    ["Lundi 11 Janvier 2021", "Paiement CB", "123456", "Paiement au titre de votre abonnement", null, null, -99.99, null],
    [null, "Virement bancaire", "123456", "Paiement au titre de votre sourcing de matière", null, "123456", -11333.33, "invoiceID"],
    ["Samedi 9 Décembre 2020", "Virement bancaire", "123456", "Paiement au titre de votre projet", "Nom projet", "123456", -11333.33, null],
]

const Transactions = () => {

    const [orders, setOrders] = useState();

    const paymentTypes = [
        'Paiement',
        'Remboursement'
    ];

    const paymentMethods = {
        'CB': 'Paiement en CB',
        'paypal': 'Virement Paypal'
    };

    useEffect(() => {
        getOrderInformation().then(res => {
            if (res.status === 200)
                setOrders(res.data);
        });
    }, []);

    const getFullDate = (dateToConvert) => {
        
        const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];

        const dateToNewFormat = new Date(dateToConvert);
        const day = days[(((dateToNewFormat.getDay() - 1) % 7) + 7) % 7];
        const date = dateToNewFormat.getDate();
        const month = months[dateToNewFormat.getMonth()];
        const year = dateToNewFormat.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

    const renderOrdersInProgress = () => {
        if (orders && orders.listOrderInProgress)
            return orders.listOrderInProgress.map((elem, i) => {
                return <li key={i} className="cardPending">
                    <div>
                        <h4>{paymentMethods[elem.moneticoInfo.paymentKind]} #{elem.ref}</h4>
                        <span className="paymentDescr">{paymentTypes[elem.type]} au nom de votre projet <strong>{elem.project ? elem.project.title : 'unknown'}</strong></span>
                    </div>
                    <span className="price">{elem.priceHT}€</span>
                </li>
            });
        else
            return [];
    }

    const renderCompletedOrders = () => {
        if (orders && orders.listOrderFinish)
            return orders.listOrderFinish.map((elem, i) => {
                return <li key={i} className="cardHistoryContainer">
                    <span className="date">{getFullDate(elem.date)}</span>
                    <div className="cardHistory">
                        <div>
                            <h4>{getFullDate(elem.date)} #{elem.moneticoInfo ? paymentMethods[elem.moneticoInfo.paymentKind] : 'Test'}</h4>
                            <span className="paymentDescr">{paymentTypes[elem.type]} au nom de votre projet <strong>{elem.project ? elem.project.title : 'unknown'}</strong></span>
                        </div>
                        <span className="price">{elem.priceHT}€</span>
                    </div>
                    {elem.invoice ? <>
                        <button className="whiteBtn">Cliquez ici pour télécharger la facture associée</button>
                    </> : null}
                </li>
            });
        else
            return [];
    }

    let treatmentCards = [];
    for (const [index, value] of treatmentAPI.entries()) {
        treatmentCards.push(
            <li key={index} className="cardPending">
                <div>
                    <h4>{value[0]} #{value[1]}</h4>
                    <span className="paymentDescr">{value[2]}{value[3]}{value[4]}</span>
                </div>
                <span className="price">{value[5]}€</span>
            </li>
        )
    }
    let passedBills = [];
    for (const [index, value] of passedAPI.entries()) {
        passedBills.push(
            <li key={index} className="cardHistoryContainer">
                {value[0] !== null ? <>
                    <span className="date">{value[0]}</span>
                </> : null}
                <div className="cardHistory">
                    <div>
                        <h4>{value[0]} #{value[1]}</h4>
                        <span className="paymentDescr">{value[3]}{value[4]}{value[5]}</span>
                    </div>
                    <span className="price">{value[6]}€</span>
                </div>
                {value[7] !== null ? <>
                    <button className="whiteBtn">Cliquez ici pour télécharger la facture associée {value[7]}</button>
                </> : null}
            </li>
        )
    }

    const totalWaiting = () => {
        let total = 0;
        orders.listOrderInProgress.forEach(o => total += o.priceHT);
        total = total.toFixed(2);
        return <span className="price">
            {total.split('.')[0]}<small>,{total.split('.')[1]}</small>
        </span>;
    }

    return (
        <div className="containerTransaction">
            <div className="mainContent">
                <h2>Coup d’œil rapide</h2>
                <div className="pendingPayment">
                    <span>En attente de paiement</span>
                    <div className="hr"></div>
                    <span className="price">{orders && orders.listOrderInProgress && totalWaiting()} €</span>
                </div>
                <a href="/bills" className="seeBills">Voir les factures en attente de paiement <BsArrowRight /></a>
                <h2>En cours de traitement</h2>
                <ul>
                    {/*treatmentCards*/}
                    {renderOrdersInProgress()}
                </ul>
                <h2>Terminé</h2>
                <ul>
                    {/*passedBills*/}
                    {renderCompletedOrders()}
                </ul>
            </div>
        </div>
    )
}

export default Transactions;