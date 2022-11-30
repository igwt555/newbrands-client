import { useTranslation } from "react-i18next";
import { NavLink } from 'react-router-dom';
import "./FirstSection.scss";

import working from "../../../assets/img/working.svg";

export const FirstSection = () => {
  const { t } = useTranslation("common");

  return (
    <div className="containerFirstSection">
      <div className="leftColumn" data-aos="fade-right">
        <p className="clothingRebootText">#CLOTHINGREBOOT</p>
        <h1>{t("home.firstSection.title")}</h1>
        <p>{t("home.firstSection.subtitle")}</p>

        <div className="btnDiv">
          <NavLink to='/createProject'>
            <button name="Créer un projet" className="btn blueBtn">{t("btn.createProject")}</button>
          </NavLink>

          <a href='https://calendly.com/newbrands/demo' target="_blank" rel="nofollow noopener noreferrer">
            <button name="Demander une démo" className="btn lightBlueBtn">{t("btn.demo")}</button>
          </a>
        </div>

        <a className='memoLink' href='https://calendly.com/newbrands/rappel' target="_blank" rel="nofollow noopener noreferrer">Demandez un rappel &nbsp; {'>'}</a>
      </div>
      <img src={working} alt="Working" data-aos="fade-left" />
    </div>
  );
}