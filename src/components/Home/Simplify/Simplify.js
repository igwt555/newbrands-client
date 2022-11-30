import "./Simplify.scss";
// import { useTranslation } from "react-i18next";

import projectMaterials from '../../../assets/img/project-materials.svg';

export const Simplify = () => {
    // const { t } = useTranslation("common");
    
    return (
        <div className="containerSimplify" data-aos="fade-right">
            <div className="introduction">
                <p className="ourMissionText">La tech au service de la mode</p>
                <h2 className="catchPhraseText">Quand <strong>environnement</strong> et <strong>responsabilité</strong> riment avec <strong>maîtrise des coûts</strong> dans la filière textile</h2>
                <div className="subtitleTags">
                    <div className="tag">
                        <div className="customBullet"></div>
                        <p>Choix du service</p>
                    </div>
                    <div className="tag">
                        <div className="customBullet"></div>
                        <p>Création de votre projet</p>
                    </div>
                    <div className="tag">
                        <div className="customBullet"></div>
                        <p>Suivi de l’avancement</p>
                    </div>
                </div>
            </div>

            <img src={projectMaterials} />
        </div>
    );
}