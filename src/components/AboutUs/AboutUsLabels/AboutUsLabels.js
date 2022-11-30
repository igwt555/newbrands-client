import { useEffect } from 'react';
import Aos from 'aos';
import './AboutUsLabels.scss';

import WeTransfer from '../../assets/img/wetransfer.svg';
import Stamps from '../../assets/img/stamps.svg';
import Manter from '../../assets/img/manter.svg';
import Sugarcane from '../../assets/img/sugarane.svg';

export const AboutUsLabels = () => {

    useEffect(() => {
        Aos.init({ duration: 2000, once: true });
    }, []);

    return (
        <div className="labelsLinkedToOurBlockchainSection" data-aos='fade-left'>
            <h1>Les labels rattachés à notre Blockchain</h1>

            <ul className="labelsList">
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
        </div>
    )
}