import { useEffect } from 'react';
import Aos from 'aos';
import './AboutUsOurValues.scss';

import HeartIcon from '../../../assets/img/heart-icon-rounded.svg';
import SmileyIcon from '../../../assets/img/smiley-icon-rounded.svg';
import ChatIcon from '../../../assets/img/chat-icon-rounded.svg';

export const AboutUsOurValues = () => {

    useEffect(() => {
        Aos.init({ duration: 2000, once: true });
    }, []);

    return (
        <div className="ourValuesSection" data-aos='fade-up'>
            <div className="valuesDescription">
                <p className="ourValuesText uppercase">Nos valeurs</p>

                <h1>Le <span>Fashion Activism</span>, notre principale raison d'être.</h1>

                <div>
                    <p>
                    Chez NewBrands, nous voulons penser la mode comme un vecteur de transition environnementale et de
                    changement social.
                    </p>

                    <p>
                    Grâce à notre réseau de fournisseurs de confiance, notre large choix de matériaux sourcés et locaux et
                    nos labels partenaires, nous vous proposons une solution engagée pour devenir acteur du renouveau textile.
                    </p>
                </div>
            </div>

            <div className="valuesBoxes">
                <div className="valueBox">
                    <img src={HeartIcon} loading="lazy" />

                    <h3>Innovation</h3>

                    <p>
                    Apporter une solution innovante dans la gestion des approvisionnements grâce à la technologie, pour un
                    juste équilibre entre enjeux business et environnementaux.
                    </p>
                </div>

                <div className="sideValuesBoxes">
                    <div className="valueBox">
                        <img src={SmileyIcon} loading="lazy" />

                        <h3>Transparence</h3>

                        <p>Proposer un approvisionnement en matières responsables pour une production plus simple, verte et rentable.</p>
                    </div>

                    <div className="valueBox">
                        <img src={ChatIcon} loading="lazy" />

                        <h3>Engagement</h3>

                        <p>
                        Accompagner les entreprises dans leur développement et la gestion vertueuse de leur chaîne de
                        valeur et faire émerger des acteurs engagés du textile français.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}