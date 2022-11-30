import { useState, useEffect } from 'react';
import Aos from 'aos';
import { Link } from 'react-router-dom';
import './Fare.scss';

import { FAQ } from '../../components/Home/FAQ/FAQ';
import { Newsletter } from '../../components/Home/Newsletter/Newsletter';
import { LogoList } from '../../components/Home/LogoList/LogoList';
import { Checkbox } from '../../components/UI/Checkbox/Checkbox';
import { ButtonLink } from '../../components/UI/Button/ButtonLink';

// import WeTransfer from '../../assets/img/wetransfer.svg';
// import Stamps from '../../assets/img/stamps.svg';
// import Manter from '../../assets/img/manter.svg';
// import Sugarcane from '../../assets/img/sugarane.svg';
import BlueMagicWand from '../../assets/img/blue-magic-wand-icon.svg';
import ChatIcon from '../../assets/img/chat-icon-2.svg';
import ShieldIcon from '../../assets/img/shield-icon.svg';
// import BlueBackground from '../../assets/img/blue-rectangle-background.svg';
// import BlueStar from '../../assets/img/blue-star.svg';
// import GrayStar from '../../assets/img/gray-star.svg';
// import Author1 from '../../assets/img/profile-picture.svg';
// import Author2 from '../../assets/img/ourTeamSection-picture-3.svg';
// import Author3 from '../../assets/img/ourTeamSection-picture-1.svg';
// import PricingPlanBanner from '../../assets/img/pricing-plan-background-banner.svg';

import {
    getPriceAboData
} from '../../store/service';

export const Fare = () => {

    // const [pricingMode, setPricingMode] = useState('annual');
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        Aos.init({ duration: 2000, once: true });

        getPriceAboData({duree: 0, nbUser: 1}).then((res) => {
            if(res.status === 200)
                setPrices(res.data.price);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="farePageContainer">
            <div className="farePageContent">

                <div className="pricingPlanIntroSection">
                    <p className="pricingPlanTitle uppercase">Nos tarifs</p>

                    <h1 className="pricingPlanCatchPhrase">Découvrez nos tarifs, adaptés à votre entreprises et vos projets</h1>

                    {/* <p className="pricingPlanDetails"></p> */}

                    <button className="btn blueBtn">Découvrir</button>
                </div>

                <div className="pricingSection" data-aos="fade-up">
                    <h1>Des tarifs qui s'adaptent à vos projets</h1>

                    {/* <div className="modeSwitch">
                        <p className={`${pricingMode === 'annual' ? 'active' : ''}`} onClick={() => setPricingMode('annual')}>Annuel</p>
                        <p className={`${pricingMode === 'monthly' ? 'active' : ''}`} onClick={() => setPricingMode('monthly')}>Mensuel</p>
                    </div> */}

                    <div className="pricingList">
                        <div className="pricingInfo">
                            <div className="pricingBox">
                                <p className="pricingType">Individuel</p>
                                <p className="priceText">{prices[0] && prices[0].price}€<span>/mois</span></p>
                                <p className="nbOfUsers">1 Utilisateur unique</p>
                                <Link to={{
                                    pathname: "/register",
                                    state: {
                                        fare: "abo1"
                                    }
                                }}>
                                    <button className="btn lightBlueBtn">Sélectionner</button>
                                </Link>
                            </div>

                            <form>
                                <Checkbox value={'1 Utilisateur unique'} checked={true} readOnly />
                                <Checkbox value={'Accompagnement +'} checked={true} readOnly />
                            </form>
                        </div>

                        <div className="pricingInfo">
                            <div className="pricingBox">
                                <p className="pricingType">Petite équipe</p>
                                <p className="priceText">{prices[1] && prices[1].price}€<span>/mois</span></p>
                                <p className="nbOfUsers">Jusqu'à 5 utilisateurs</p>
                                <Link to={{
                                    pathname: "/register",
                                    state: {
                                        fare: "abo2"
                                    }
                                }}>
                                    <button className="btn lightBlueBtn">Sélectionner</button>
                                </Link>
                            </div>

                            <form>
                                <Checkbox value={'Jusqu’à 5 utilisateurs'} checked={true} readOnly />
                                <Checkbox value={'MarketPlace et échantillonnage'} checked={true} readOnly />
                                <Checkbox value={'Accompagnement ++'} checked={true} readOnly />
                            </form>
                        </div>

                        <div className="pricingInfo">
                            <div className="pricingBox">
                                <p className="pricingType">Intermédiaire</p>
                                <p className="priceText">{prices[2] && prices[2].price}€<span>/mois</span></p>
                                <p className="nbOfUsers">Jusqu'à 15 utilisateurs</p>
                                <Link to={{
                                    pathname: "/register",
                                    state: {
                                        fare: "abo3"
                                    }
                                }}>
                                    <button className="btn lightBlueBtn">Sélectionner</button>
                                </Link>
                            </div>

                            <form>
                                <Checkbox value={'Jusqu’à 15 utilisateurs'} checked={true} readOnly />
                                <Checkbox value={'MarketPlace et échantillonnage'} checked={true} readOnly />
                                <Checkbox value={'Accompagnement ++'} checked={true} readOnly />
                            </form>
                        </div>
                    </div>

                    <div className="optionForBigCompaniesBox">
                        <p>Grandes Entreprises</p>

                        <p className="detailsText">Pour les marques et groupes dépassant les 15 utilisateurs.</p>

                        <ButtonLink
                        href="https://webforms.pipedrive.com/f/1Elwhe0p7HzycbsKtnBx4mGf3WDYbMusYRo7114E6E5iNvi10lOrgYnzQyEstuoQr"
                        value="Nous contacter"
                        external
                        target="_blank"
                        />
                    </div>
                </div>

                {/* <div className="suppliersAndManufacturesSection" data-aos="fade-right" >
                    <p><span>250+</span> fournisseurs et usines dans le réseau NewBrands</p>

                    <ul>
                        <li>
                            <img src={WeTransfer} loading="lazy" />
                        </li>
                        <li>
                            <img src={Stamps} loading="lazy" />
                        </li>
                        <li>
                            <img src={Manter} loading="lazy" />
                        </li>
                        <li>
                            <img src={Sugarcane} loading="lazy" />
                        </li>
                    </ul>
                </div> */}

                <div className="whatWeDoSection" data-aos="fade-left">
                    <div className="descriptionPart">
                        <div className="descriptionBlock">
                            <p className="uppercase">Ehm. Et alors ?</p>

                            <h1>Que faisons-nous ?</h1>

                            <p>
                            Nous mettons un point d'honneur à ne travailler qu'avec des fournisseurs et usines labelisés et audités
                            à travers l'Union Européenne.<br/><br/> 
                            Par ailleurs, notre écosystème est connecté à la Blockchain afin de garantir un niveau de traçabilité
                            et de sécurité de l'information optimal. 
                            </p>
                        </div>

                        <Link to="/register"><button className="btn lightBlueBtn">Lancer un projet</button></Link>
                    </div>

                    <div className="detailsPart">
                        <div>
                            <div>
                                <img src={BlueMagicWand} />

                                <h2>Choix des usines et fournisseurs</h2>

                                <p>Trouvez votre partenaire de confiance parmi nos 250+ fournisseurs et usines présents dans toute l'Europe.</p>

                                <a href='#'>En savoir plus &nbsp; {'>'}</a>
                            </div>

                            <div>
                                <img src={ChatIcon} />

                                <h2>Gestion, suivi et optimisation de la chaîne de production</h2>

                                <p>Profitez de notre technologie innovante et de notre expertise pour optimiser chaque étape de la production et augmenter vos performances.</p>

                                <a href='#'>En savoir plus &nbsp; {'>'}</a>
                            </div>

                            <div>
                                <img src={ShieldIcon} />

                                <h2>Labélisation des produits et traçabilité des fournisseurs</h2>

                                <p>Faites la différence avec des produits labélisés et transparents, le plus de NewBrands.</p>

                                <a href='#'>En savoir plus &nbsp; {'>'}</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="usersOpinionsSection" data-aos="fade-right">
                    <p className="uppercase">Ils donnent leur avis</p>

                    <h1>Nos manufactures parlent de nous</h1>

                    <div className="usersOpinionsDetails">
                        <p>“</p>

                        <div className="detailsBlock">
                            <div className="scoreDiv">
                                <img src={BlueStar} />
                                <img src={BlueStar} />
                                <img src={BlueStar} />
                                <img src={BlueStar} />
                                <img src={GrayStar} />
                            </div>

                            <div className="commentDiv">
                                <p>It’s intuitive, functional, easy-to-setup and presents content in an interactive and interesting way.</p>

                                <p>PIERRE LECLERC, <span>FONDATEUR DE </span><span>TYGER.FR</span></p>
                            </div>

                            <div className="commentAuthors">
                                <div className="circledAuthor">
                                    <img src={Author1} />
                                </div>
                                <div>
                                    <img src={Author2} />
                                </div>
                                <div>
                                    <img src={Author3} />
                                </div>
                                <p>{'>'}</p>
                            </div>
                        </div>

                        <p>”</p>
                    </div>
                </div> */}
            </div>
            <FAQ page="Tarifs" />
            <Newsletter />
            <LogoList />
        </div>
    );
}