import './partners.scss';

import Tina from '../../../assets/img/partners/tina-logo.svg';
import LaCaserne from '../../../assets/img/partners/la-caserne.svg';
import GlobalRecycledStandard from '../../../assets/img/partners/global-recycled-standard.svg';
import Lita from '../../../assets/img/partners/lita.svg';
import FrenchFashionUnion from '../../../assets/img/partners/french-fashion-union.svg';

export const Partners = () => {
    return (
        <div className="containerPartners">
            <p className="valueChainText">Pour une chaîne de valeur vertueuse bout-en-bout</p>
            <p className="networkText">Un réseau de <span className="notPartnersText">partenaires</span> <span className="trustedThirdPartyText">Tiers de confiance</span></p>
            <ul className="networkLogos">
                <li><img src={Tina} alt="Tina" /></li>
                <li><img src={LaCaserne} alt="La Caserne" /></li>
                <li><img src={GlobalRecycledStandard} alt="Global Recycled Standard" /></li>
                <li><img src={Lita} alt="Lita.com" /></li>
                <li><img src={FrenchFashionUnion} alt="French Fashion Union" /></li>
            </ul>
        </div>
    )
}