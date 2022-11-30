import Title from 'antd/lib/skeleton/Title';
import React, { useState, useEffect } from 'react';
import './index.scss';

export const ModalManufacturer = (props) => {
    const { active, setActive } = props;

    let [choiceProto, setChoiceProto] = useState('');
    let [choiceProd, setChoiceProd] = useState('');
    let [choiceIndus, setChoiceIndus] = useState('');

    const handleClickStep = (el, setChoice, key, choice) => {
        console.log()
        if(key === choice.key)
            setChoice('')
        else
            setChoice(el);
    }

    const dataProto = [
        {
            title: 'Atelier de Valpré',
            type: 'Manufacture',
            piece: '1',
            price: '567,89€',
            spec: 'Confection à façon',
            pos: 'Luxe, Haute-Gamme',
            effec: '19',
            loc: 'Angers, France',
            key: 0,
        },
    ];

    useEffect(() => {
        if(choiceProto !== '' && choiceProd !== '' && choiceIndus !== '' )
            setActive(!active);

    }, [choiceProto, choiceProd, choiceIndus])

    const generateProtoList = () => {
        return dataProto.map((el, i) => {
            return <div key={i} className="containerProducer">
                        <div className="firstLine">
                            <div className="containerImg">
                                <img />
                                <p className="title">
                                    {el.title} <br />                          
                                    <span className="type">{el.type}</span>
                                </p>
                            </div>
                            <p>
                                {el.piece} / piece <span> {el.price} H.T</span>
                            </p>
                        </div>
                        <div className="secondLine">
                            <p>
                                Spécialisation <br />
                                <span>{el.spec}</span>
                            </p>
                            <p>
                                Positionnement <br />
                                <span>{el.pos}</span>
                            </p>
                            <p>
                                Effectif <br />
                                <span>{el.effec}</span>
                            </p>
                            <p>
                                Localisation <br />
                                <span>{el.loc}</span>
                            </p>
                            <button 
                                onClick={ () => {handleClickStep(el, setChoiceProto, i, choiceProto)}}
                                className={`${choiceProto !== '' && choiceProto.key === i ? 'selected' : ''}`}
                            >Sélectionner</button>
                        </div>
                    </div>
        })
    };


    const dataProd = [
        {
            title: 'World textil',
            type: 'Fournisseurs Molleton Semi-Brossé',
            country: 'France',
            loc: 'Lyon, France',
            time: '2',
            delivery: 'Non précisé',
            ksp1: '1500',
            ksp2: '100',
            price: '975,00',
            stock: 'Oui',
            certif: 'Gots, Oeko-tex',
            key: 0,
        },
        {
            title: 'Tintex',
            type: 'Fournisseurs Jersey Coton',
            country: 'France',
            loc: 'Lyon, France',
            time: '4',
            delivery: 'Non précisé',
            ksp1: '100',
            ksp2: '100',
            price: '190,00',
            stock: 'Oui',
            certif: 'Gots, Oeko-tex',
            key: 1,
        }
    ];

    const generateProducerList = () => {
        return dataProd.map((el, i) => {
            return  <div key={i} className="containerProducer">
                        <div className="firstLine">
                            <div className="containerImg">
                                <img />
                                <p className="title">
                                    {el.title} <br />                          
                                    <span className="type">{el.type}</span>
                                </p>
                            </div>
                            <p>
                                {el.ksp1}m {el.ksp2}gr/m2 <span> {el.price}€ H.T</span>
                            </p>
                        </div>
                        <p className="livraison">
                            Temps de confection : <span>{el.time} semaines</span>
                            Livraison estimé le : <span>{el.delivery}</span>
                        </p>
                        <div className="secondLine">
                            <p>
                                Stock service <br />
                                <span>{el.stock}</span>
                            </p>
                            <p>
                                Certification <br />
                                <span>{el.certif}</span>
                            </p>
                            <p>
                                Pays <br />
                                <span>{el.country}</span>
                            </p>
                            <p>
                                Localisation <br />
                                <span>{el.loc}</span>
                            </p>
                            <button className="first">Échantillon</button>
                            <button 
                                onClick={ () => {handleClickStep(el, setChoiceProd, i, choiceProd)} }
                                className={`${choiceProd !== '' && choiceProd.key === i ? 'selected' : ''}`}
                            >Sélectionner</button>
                        </div>
                    </div>
        });
    }

    const dataIndus = [
        {
            title: 'Campelo Sá Leading Innovation',
            type: 'Fournisseurs Molleton Semi-Brossé',
            country: 'Portugal',
            loc: 'Viana do Castelo, France',
            time: '2,7',
            delivery: 'Non précisé',
            ksp1: '250',
            price: '2875,00',
            prod: 'Hoodie',
            certif: 'Gots, Oeko-tex',
            key: 0,
        },
        {
            title: 'Confection Boischaut Nord',
            type: 'Fournisseurs Jersey Coton',
            country: 'France',
            loc: 'Lyon, France',
            time: '4,1',
            delivery: 'Non précisé',
            ksp1: '250',
            price: '11 997,50',
            prod: 'Hoodie',
            certif: 'Gots, Oeko-tex',
            key: 1,
        }
    ];

    const generateIndustry = () => {
        return dataIndus.map((el, i) => {
            return  <div key={i} className="containerProducer">
                        <div className="firstLine">
                            <div className="containerImg">
                                <img />
                                <p className="title">
                                    {el.title} <br />                          
                                    <span className="type">{el.type}</span>
                                </p>
                            </div>
                            <p>
                                {el.ksp1}m <span> {el.price}€ H.T</span>
                            </p>
                        </div>
                        <p className="livraison">
                            Temps de confection : <span>{el.time} semaines</span>
                            Livraison estimé le : <span>{el.delivery}</span>
                        </p>
                        <div className="secondLine">
                            <p>
                                Produit.s<br />
                                <span>{el.prod}</span>
                            </p>
                            <p>
                                Certification <br />
                                <span>{el.certif}</span>
                            </p>
                            <p>
                                Pays <br />
                                <span>{el.country}</span>
                            </p>
                            <p>
                                Localisation <br />
                                <span>{el.loc}</span>
                            </p>
                            <button 
                                onClick={ () => {handleClickStep(el, setChoiceIndus, i, choiceIndus)} }
                                className={`${choiceIndus !== '' && choiceIndus.key === i ? 'selected' : ''}`}
                            >Sélectionner</button>
                        </div>
                    </div>
        });
    };
    return (
        <div className={`modalManufacturerContainer ${active === true ? 'active' : ''}`}>
            <div className="containerTitle">
                <h2>Nom du projet</h2>
                <p>Prix</p>
            </div>
            <div className="containerBorder">

                <div className={`containerStep ${choiceProto !== '' ? 'selected' : ''}`}>
                    <h3>Bureau d'étude (Prototypage)</h3>
                    <div className="containerChoice">
                        {generateProtoList()}
                    </div>
                </div>

                <div className={`containerStep ${choiceProto !== '' ? 'selected' : ''}`}>
                    <h3>Transport</h3>
                    <div className="containerChoice">
                        <div className="containerTransport">
                            <div className="containerWho">
                                <p>Ce transport sera traité par :
                                    <br/>
                                    <span>Appel d'offre en cours...</span>
                                </p>
                            </div>
                            <div className="containerWhen">
                                <p>Non planifiée | </p>
                            </div>
                        </div>
                        <div className="containerTransport">
                            <div className="containerWho">
                                <p>Ce transport sera traité par :
                                    <br/>
                                    <span>Appel d'offre en cours...</span>
                                </p>
                            </div>
                            <div className="containerWhen">
                                <p>Non planifiée | </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`containerStep ${choiceProd !== '' ? 'selected' : ''}`}>
                    <h3>Fournisseurs</h3>
                    <div className="containerChoice">
                        {generateProducerList()}
                    </div>
                </div>

                <div className={`containerStep ${choiceProd !== '' ? 'selected' : ''}`}>
                    <h3>Transport</h3>
                    <div className="containerChoice">
                        <div className="containerTransport">
                            <div className="containerWho">
                                <p>Ce transport sera traité par :
                                    <br/>
                                    <span>Appel d'offre en cours...</span>
                                </p>
                            </div>
                            <div className="containerWhen">
                                <p>Non planifiée | </p>
                            </div>
                        </div>
                        <div className="containerTransport">
                            <div className="containerWho">
                                <p>Ce transport sera traité par :
                                    <br/>
                                    <span>Appel d'offre en cours...</span>
                                </p>
                            </div>
                            <div className="containerWhen">
                                <p>Non planifiée | </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`containerStep ${choiceIndus !== '' ? 'selected' : ''}`}>
                    <h3>Fournisseurs</h3>
                    <div className="containerChoice">
                        {generateIndustry()}
                    </div>
                </div>
            </div>

        </div>
    )
}