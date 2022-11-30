import { useEffect } from 'react';
import Aos from 'aos';
import './AboutUsWhatTheySay.scss';

import BlueStar from '../../assets/img/blue-star.svg';
import GrayStar from '../../assets/img/gray-star.svg';
import ProfilePic from '../../assets/img/profile-picture.svg';

export const AboutUsWhatTheySay = () => {

    useEffect(() => {
        Aos.init({ duration: 2000, once: true });
    }, []);

    return (
        <div className="whatTheySaySection" data-aos='fade-right'>
            <p className="commentsSectionIntroText uppercase">L'expérience Newbrands</p>

            <h1>Ils donnent leur avis</h1>

            <div className="commentsCanva">
                <ul className="commentsList">
                    <ul>
                        <li className="commentElem">
                            <div className="score">
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={GrayStar} loading="lazy" />
                            </div>

                            <p>
                                "It's intuitive, functional, easy-to-setup and presents content in an interactive and interesting way."
                            </p>

                            <div className="commentAuthor">
                                <img src={ProfilePic} loading="lazy" />

                                <div>
                                    <p>OGUZ YAGIZ KARA,</p>
                                    <p>FOUNDER @HUELAB</p>
                                </div>
                            </div>
                        </li>

                        <li className="commentElem">
                            <div className="score">
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={GrayStar} loading="lazy" />
                            </div>

                            <p>
                                "Phantom matched me with a Coach who helped me see that I have exactly what I need to succeed in business (and life)!"
                            </p>

                            <div className="commentAuthor">
                                <img src={TeamSectionPicture4} loading="lazy" />

                                <div>
                                    <p>ELISE BEKKERS,</p>
                                    <p>CTO @APPLE</p>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <ul>
                        <li className="commentElem">
                            <div className="score">
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                            </div>

                            <p>
                                "Each of our team member is getting precious help in their professional development and can build a program that suit their needs and ambitions."
                            </p>

                            <div className="commentAuthor">
                                <img src={TeamSectionPicture3} loading="lazy" />

                                <div>
                                    <p>NICOLAS CAGE,</p>
                                    <p>COO @AIRFUNCS</p>
                                </div>
                            </div>
                        </li>

                        <li className="commentElem">
                            <div className="score">
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                                <img src={BlueStar} loading="lazy" />
                            </div>

                            <p>
                                "The design of the Phantom app allowed for the digital session to take place seamlessly!"
                            </p>

                            <div className="commentAuthor">
                                <img src={TeamSectionPicture1} />

                                <div>
                                    <p>VERA,</p>
                                    <p>PARTNER WITH @HUELAB</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </ul>
            </div>
        </div>
    )
}