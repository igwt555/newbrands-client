import "./Services.scss";
import { useTranslation } from "react-i18next";
import { NavLink } from 'react-router-dom';

import stylism from "../../../assets/img/stylism.svg";
import ecology from "../../../assets/img/ecology.svg";
import developpment from "../../../assets/img/developpement.svg";
import production from "../../../assets/img/production.svg";
import transports from "../../../assets/img/transports.svg";
import recycling from "../../../assets/img/recycling.svg";
import checkmark from "../../../assets/img/checkmark-round-blue.svg";

export const Services = () => {

    const { t } = useTranslation("common");

    const data = [
        {
            img: stylism,
            alt: 'Stylisme',
            title: t("home.secondSection.stylismTitle"),
            detail: <p className="lightText">
                {t("home.secondSection.stylism1")}
                <span>{t("home.secondSection.stylism2")}</span>
                {t("home.secondSection.stylism3")}
            </p>,
            bullet1: "Recherche et développement",
            bullet2: "Échantillon de matières",
            bullet3: "Accompagnement personnalisé"
        },
        {
            img: ecology,
            alt: 'Matières_éthiques',
            title: t("home.secondSection.ethicalTitle"),
            detail: <p className="lightText">
                {t("home.secondSection.ethical1")}
                <span>{t("home.secondSection.ethical2")}</span>
            </p>,
            bullet1: "Des matières labélisées",
            bullet2: "Made In Europe",
            bullet3: "En faible et grandes quantités"
        },
        {
            img: developpment,
            alt: 'Développement',
            title: t("home.secondSection.developmentTitle"),
            detail: <p className="lightText">
                {t("home.secondSection.development1")}
                <span>{t("home.secondSection.development2")}</span>
                {t("home.secondSection.development3")}
            </p>,
            bullet1: "Direction de collection",
            bullet2: "Étude et sampling",
            bullet3: "R&D produit et matières"
        },
        {
            img: production,
            alt: 'Production',
            title: t("home.secondSection.productionTitle"),
            detail: <p className="lightText">
                {t("home.secondSection.production1")}
                <span>{t("home.secondSection.production2")}</span>
                {t("home.secondSection.production3")}
            </p>,
            bullet1: "Large choix d'usines partenaires",
            bullet2: "Suivi de la production",
            bullet3: "Livraison partout en Europe"
        },
        {
            img: transports,
            alt: 'Transports',
            title: t("home.secondSection.optimisationTitle"),
            detail: <p className="lightText">
                {t("home.secondSection.optimisation1")}
                <span>{t("home.secondSection.optimisation2")}</span>
            </p>,
            bullet1: "Une solution de fret écologique",
            bullet2: "Vers le zéro émission",
            bullet3: "Encadré et traçable"
        },
        {
            img: recycling,
            alt: 'Recyclage',
            title: t("home.secondSection.recyclingTitle"),
            detail: <p className="lightText">
                {t("home.secondSection.recycling1")}
                <span>{t("home.secondSection.recycling2")}</span>
            </p>,
            bullet1: "",
            bullet2: "",
            bullet3: ""
        }
    ];

  return (
    <div className="containerService" data-aos="fade-up">
      <div>
        <div className="introduction">
          <p className="ourMissionText">Notre mission</p>
          <h2 className="catchPhraseText">Rétablir un juste équilibre dans la mode entre <strong>Innovation</strong> et <strong>avenir de la planète</strong></h2>
        </div>
      </div>
      <div className="missionsList">
            { data.map((d, i) => {
                return <div className="missionBox" key={`missionBox-${i}`}>
                    <img className="missionIcon" src={d.img} alt={d.alt} />
    
                    <div className="missionDetails">
                        <div className="missionTitle">
                            <img src={d.img} alt={d.alt} />
                            <h5>#{d.title}</h5>
                        </div>
                        <div className="missionDescription">
                            { d.detail }
                            {d.alt === "Recyclage" ? 
                            <NavLink to='/'>
                                <button name="Créer un projet" className="btn lightBlueBtn">Coming soon</button>
                            </NavLink>
                            :
                            <NavLink to='/register'>
                                <button name="Créer un projet" className="btn blueBtn">Découvrir</button>
                            </NavLink>}
                        </div>
                        {d.alt !== "Recyclage" &&
                        <ul className="samplesText">
                            <li>
                                <img src={checkmark} alt="✔"/>
                                <p>{d.bullet1}</p>
                            </li>
    
                            <li>
                                <img src={checkmark} alt="✔"/>
                                <p>{d.bullet2}</p>
                            </li>
    
                            <li>
                                <img src={checkmark} alt="✔"/>
                                <p>{d.bullet3}</p>
                            </li>
                        </ul>
                        }
                    </div>
                </div>
            })}
      </div>
    </div>
  );
}