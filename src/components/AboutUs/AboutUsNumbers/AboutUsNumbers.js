import { useEffect } from 'react';
import Aos from 'aos';
import './AboutUsNumbers.scss';

export const AboutUsNumbers = () => {

    useEffect(() => {
        Aos.init({ duration: 2000, once: true });
    }, []);

    return (
        <div className="numbersSection">
            <div className="celebrateDiversityDescription" data-aos='fade-right'>
                <h3>#TechforGood</h3>

                <p>Du petit créateur aux marques textiles établies, de plus en plus d'acteurs de la confection nous ont fait confiance et obtiennent notre certification</p>
            </div>

            <div className="ourCultureDescription" data-aos='fade-left'>
                <p className="ourValuesText uppercase">Notre label</p>

                <h1>#JeSourceResponsable</h1>

                <div className="numbersDetails">
                    <div>
                        <h1>48+</h1>
                        <p>Nouvelles marques nous rejoignent chaque mois !</p>
                    </div>

                    <div>
                        <h1>10</h1>
                        <p>Marques labélisées <span>#JESOURCERESPONSABLE</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}