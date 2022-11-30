import './index.scss';
import NewsroomPicture1 from '../../../assets/img/numbers-picture-1.svg';
import NewsroomPicture2 from '../../../assets/img/numbers-picture-2.svg';

const Newsroom = () => {
    return (
        <div className="newsroomContainer">
            <div className="numbers" data-aos="fade-down">
                <p>Insight and advice our expert team.</p>
                <div>
                    <h1>48+</h1>
                    <p>Marques labélisées par NewBrands depuis Août 2021.</p>
                </div>
                <div>
                    <h1>100 000+</h1>
                    <p>Scan unique effectué sur l'ensemble des marques labélisées.</p>
                </div>
            </div>
            <div className="cardsContainer" data-aos="fade-up">
                <p className="blueText">NEWSROOM</p>
                <h2>The goal is the same but we've decided to change the game we're playing</h2>
                <div className="cards">
                    <div className="newsroomCard">
                        <div className="cardImage">
                            <img src={NewsroomPicture1} />
                        </div>
                        <ul className="pills">
                            <li className="orange">White Paper</li>
                        </ul>
                        <p className="title">Pourquoi avons-nous toujours besoin d'une Fashion Revolution ?</p>
                        <p className="authorAndDate">EMIL KRISTENSEN . MARCH 9, 2021</p>
                    </div>
                    <div className="newsroomCard">
                        <div className="cardImage">
                            <img src={NewsroomPicture2} />
                        </div>
                        <ul className="pills">
                            <li className="orange">White Paper</li>
                            <li className="blue">Cas d'usage</li>
                        </ul>
                        <p className="title">Marketplace Éthique, Entre autodéclaration et tiers de confiance afin de fiabiliser l'information</p>
                        <p className="authorAndDate">EMIL KRISTENSEN . MARCH 9, 2021</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Newsroom;