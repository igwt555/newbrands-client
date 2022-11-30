import "./LogoList.scss";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import frenchTech from "../../../assets/img/french-tech-logo-png-1.png";
// import frenchImpact from "../../../assets/img/Logo_FrenchImpact_RVB_Web.webp";
// import techForGood from "../../../assets/img/tech-for-good.png";
// import capDigital from "../../../assets/img/cap-digital-1200x500.png";
import bpiFrance from "../../../assets/img/bpifrance.png";
import LinkedinLogo from '../../../assets/img/linkedin-logo.svg';
import InstagramLogo from '../../../assets/img/ig-logo.svg';
import FacebookLogo from '../../../assets/img/facebook-icon.svg';
import ImpactFranceLogo from '../../../assets/img/impact-france-logo.svg';
import InitiativeFranceLogo from '../../../assets/img/initiative-france-logo.svg';

export const LogoList = () => {
    const { t } = useTranslation("common");
    
    return (
        <div className="footerContainer">
            <ul className="logoList">
                <li><h4 className="text">{t("home.seventhSection.withTheHelp")}</h4></li>
                <li><img src={frenchTech} alt="frenchTech" loading="lazy" /></li>
                <li><img src={InitiativeFranceLogo} alt="Initiative France" loading="lazy" /></li>
                <li><img src={ImpactFranceLogo} alt="Impact France" loading="lazy" /></li>
                <li><img src={bpiFrance} alt="bpiFrance" loading="lazy" /></li>
            </ul>

            <div className="footerContent">
                {/* <ul>
                   <li className="uppercase">PRODUIT</li>
                   <li>Débuter un essai</li>
                   <li>Fonctionnalités</li>
                   <li>Tarifs</li>
                   <li>Démo</li>
                </ul>
                <ul>
                   <li className="uppercase">RESSOURCES</li>
                   <li>Centre d'aide</li>
                   <li>Newsroom</li>
                   <li>API</li>
                   <li>FAQs</li>
                </ul>
                <ul>
                   <li className="uppercase">ENTREPRISE</li>
                   <li>À propos</li>
                   <li>Press</li>
                   <li>Marques</li>
                   <li>Partenaires</li>
                   <li>Contacter</li>
                </ul> */}
                <div className="emailInfo">
                    <ul>
                        <li className="uppercase">Nous écrire</li>
                        <li>sales@newbrands.fr</li>
                    </ul>
                </div>
                <ul className="phoneInfo">
                    <li className="uppercase">Nous appeler</li>
                    <li>+33 01 76 40 14 43</li>
                </ul>
                <p className='copyright'>NewBrands&trade; All Rights Reserved, 2021.</p>
            </div>

            <div className="footerConditionsAndMentions">
                <ul>
                    <li>Conditions Générales de Service</li>
                    <li>
                        <Link to='/use'>
                            Conditions Génrales d'Utilisation
                        </Link>
                    </li>
                    <li>Politique de Confidentialité &amp; RGPD</li>
                    <li>
                        <Link to='/legals'>
                            Mentions légales
                        </Link>
                    </li>
                    <li>
                        <ul className="socialNewtorksLinks">
                            <li><a href="https://www.facebook.com/ClothingReboot"><img src={FacebookLogo} /></a></li>
                            <li><a href="https://www.linkedin.com/company/12647016"><img src={LinkedinLogo} /></a></li>
                            <li><a href="https://www.instagram.com/NewBrandsfr"><img src={InstagramLogo} /></a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}