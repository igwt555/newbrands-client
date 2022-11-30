import { useEffect } from 'react';
import Aos from 'aos';
import './AboutUsIntro.scss';

import FrenchTechGreenTechLogo from '../../../assets/img/french-tech-greentech.svg';

export const AboutUsIntro = () => {

    useEffect(() => {
        Aos.init({ duration: 2000, once: true });
    }, []);

    return (
        <div className="aboutUsIntro" data-aos='fade-left'>
            <div>
                <p className="clothingRebootText">#CLOTHINGREBOOT</p>
                <h1>NewBrands, le renouveau textile</h1>
                <img src={FrenchTechGreenTechLogo} loading="lazy" />
            </div>
            <div>
                <p>
                Simplifier sa chaîne de production, optimiser ses coûts et réduire son impact environnemental pour une
                transformation en profondeur de l’industrie textile.
                </p>

                <p>
                Convaincus qu’innovation rime avec préservation de la planète et engagement social, nous mettons à votre
                service les progrès de l’intelligence artificielle pour une production Made in France et Made in Europe
                transparente/responsable et adaptée à vos projets.
                </p>
            </div>
        </div>
    )
}