import './footer.scss'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

import LinkedinLogo from '../../assets/img/linkedin-logo.svg';
import InstagramLogo from '../../assets/img/ig-logo.svg';
import FacebookLogo from '../../assets/img/facebook-icon.svg';

export const Footer = (props) => {
    const { footer } = props;

    const { t } = useTranslation("common");
    
    return (
        <footer className={`${"footer"} ${footer !== "full" ? "fixed" : ""}`}>
            <div className={footer === "full" ? "fullVersion" : ""}>
                <span>© Copyright 2017-{new Date().getFullYear()}, NewBrands, SAS et ses partenaires
                {footer === "full" && <>
                    <span> / Siège Social: NEWBRANDS, 10 Place Vendôme, 75001 Paris. 
                        / № SIRET: 829 419 100 000 21 / № APE: 6201 Z / R.C.S: PARIS / № TVA: FR 23 829419100
                    </span>
                        
                    <Link to="/legals"> {t("footer.legals")}</Link>
                </>}
                </span>
            </div>
            <ul className="socialNewtorksLinks">
                <li><a href="https://www.facebook.com/ClothingReboot" target="_blank"><img src={FacebookLogo} /></a></li>
                <li><a href="https://www.linkedin.com/company/12647016" target="_blank"><img src={LinkedinLogo} /></a></li>
                <li><a href="https://www.instagram.com/NewBrandsfr" target="_blank"><img src={InstagramLogo} /></a></li>
            </ul>
        </footer>
    );
}