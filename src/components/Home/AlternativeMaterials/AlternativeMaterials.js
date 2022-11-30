import './AlternativeMaterials.scss';
import { Link } from 'react-router-dom';

import GroupedCommand from '../../../assets/img/grouped-command.png';
import ProfilePic from '../../../assets/img/profile-picture.svg';

export const AlternativeMaterials = () => {
    return (
        <div className="alternativeMaterialsContainer">
            <div data-aos="fade-right">
                <p className="blueText uppercase">Pour penser vos futurs produits</p>
                <h1>114+ fournisseurs de matières <strong>alternatives</strong></h1>
                <p>
                Pour tendre vers le 100 % éco-responsable, une marque éthique doit penser à tout, et ce dès ses balbutiements. Pour
                cela, nous vous guidons dans le choix des meilleurs fournisseurs de matières alternatives dès le début !
                </p>
                {/* <Link to='/register'>
                    <button name="Demander une démo" className="btn lightBlueBtn">Découvrir</button>
                </Link> */}

                {/* <div className="commentBox">
                    <img src={ProfilePic} />
                    <div className="comment">
                        <p>"C'est simple, efficace et intuitif. Le choix de fournisseurs est intelligemment présenté."</p>
                        <p className="commentAuthor">PIERRE LECLERC, <span>FONDATEUR @TYGER</span></p>
                    </div>
                </div> */}
            </div>
            <img data-aos="fade-left" className="groupedCommandImage" src={GroupedCommand} alt="Nouvelle commande groupée" />
        </div>
    );
}