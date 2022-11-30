import { useEffect } from 'react';
import Aos from 'aos';
import './AboutUsImagesSection.scss';

import Section2Image1 from '../../../assets/img/about-us-section-2-picture-1.svg';
import Section2Image2 from '../../../assets/img/about-us-section-2-picture-2.svg';
import Section2Image3 from '../../../assets/img/about-us-section-2-picture-3.svg';
import Section2Image4 from '../../../assets/img/about-us-section-2-picture-4.svg';
import Section2Image5 from '../../../assets/img/about-us-section-2-picture-5.svg';
import Section2Image6 from '../../../assets/img/about-us-section-2-picture-6.svg';

export const AboutUsImagesSection = () => {

    useEffect(() => {
        Aos.init({ duration: 2000, once: true });
    }, []);

    return (
        <div className="aboutUsImagesSection" data-aos='fade-right'>
            <div>
                <img src={Section2Image1} loading="lazy" />
                <img src={Section2Image2} loading="lazy" />
            </div>
            <div>
                <img src={Section2Image3} loading="lazy" />
                <img src={Section2Image4} loading="lazy" />
            </div>
            <div>
                <img src={Section2Image5} loading="lazy" />
                <img src={Section2Image6} loading="lazy" />
            </div>
        </div>
    )
}