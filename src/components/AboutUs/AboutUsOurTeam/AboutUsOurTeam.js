import { useEffect } from 'react';
import Aos from 'aos';
import './AboutUsOurTeam.scss';

import TwitterLogo from '../../assets/img/twitter-logo.svg';
import LinkedinLogo from '../../assets/img/linkedin-logo.svg';
import TeamSectionPicture1 from '../../assets/img/ourTeamSection-picture-1.svg';
import TeamSectionPicture2 from '../../assets/img/ourTeamSection-picture-2.svg';
import TeamSectionPicture3 from '../../assets/img/ourTeamSection-picture-3.svg';
import TeamSectionPicture4 from '../../assets/img/ourTeamSection-picture-4.svg';

export const AboutUsOurTeam = () => {

    useEffect(() => {
        Aos.init({ duration: 2000, once: true });
    }, []);

    return (
        <div className="ourTeamSection" data-aos='fade-up'>
            <p className="ourTeamText uppercase">Notre équipe</p>

            <h1>Qui sommes-nous ?</h1>

            <ul className="teamProfiles">

                <li className="profileBox">
                    <img src={TeamSectionPicture1} loading="lazy" />
                    <h2>Jessy BIGOT</h2>
                    <h3>CEO</h3>
                    <div>
                        <a href="https://google.com">
                            <img src={TwitterLogo} loading="lazy" />
                        </a>
                        <a href="https://google.com">
                            <img src={LinkedinLogo} loading="lazy" />
                        </a>
                    </div>
                </li>

                <li className="profileBox">
                    <img src={TeamSectionPicture2} />
                    <h2>Théo VILLENEUVE</h2>
                    <h3>Head of Services</h3>
                    <div>
                        <a href="https://google.com">
                            <img src={TwitterLogo} loading="lazy" />
                        </a>
                        <a href="https://google.com">
                            <img src={LinkedinLogo} loading="lazy" />
                        </a>
                    </div>
                </li>

                <li className="profileBox">
                    <img src={TeamSectionPicture3} />
                    <h2>Santiago SALCEDO LOPEZ</h2>
                    <h3>Head of Suppliers Relations</h3>
                    <div>
                        <a href="https://google.com">
                            <img src={TwitterLogo} loading="lazy" />
                        </a>
                        <a href="https://google.com">
                            <img src={LinkedinLogo} loading="lazy" />
                        </a>
                    </div>
                </li>

                <li className="profileBox">
                    <img src={TeamSectionPicture4} loading="lazy" />
                    <h2>Maxime NICOLAS</h2>
                    <h3>Head of Communication</h3>
                    <div>
                        <a href="https://google.com">
                            <img src={TwitterLogo} loading="lazy" />
                        </a>
                        <a href="https://google.com">
                            <img src={LinkedinLogo} loading="lazy" />
                        </a>
                    </div>
                </li>
                
            </ul>
        </div>
    )
}