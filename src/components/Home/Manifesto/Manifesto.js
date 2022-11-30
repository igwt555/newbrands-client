import './Manifesto.scss';

export const Manifesto = () => {
    return (
        <div className="manifestoContainer" data-aos="fade-up">
            <div className="manifestoBlueBox">
                <p className="containerName uppercase">Manifesto</p>

                <div className="manifestoContent">
                    <h1 className="catchPhraseText">L'innovation comme alliée de la transition écologique</h1>

                    <p className="manifestoDescription">Chez NewBrands, nous avons la conviction que la confection peut être l’alliée de toute transition. Comment s'y prendre ? Découvrez notre manifesto pour une industrie textile en harmonie avec l'avenir de notre planète.  </p>

                    <div className="manifestoItems">
                        <div>
                            <h2>1. Créer de manière durable</h2>

                            <p>
                            Nos ressources sont limitées ! À nous de les préserver et de trouver les meilleures alternatives pour une production responsable.<br/><br/>
                            Nous croyons à un nouveau moyen de production, dans lequel l'Homme peut grandir, développer son business et créer de manière durable. 
                            </p>
                        </div>

                        <div>
                            <h2>2. Rendre l'innovation vertueuse</h2>

                            <ul>
                                <li>L'innovation au service de la création.</li>
                                <li>L'innovation comme tremplin vers une solution éthique.</li>
                                <li>L'innovation pour pérenniser un modèle durable et rentable. </li>
                            </ul>
                        </div>

                        <div>
                            <h2>3. Penser son produit sous toutes ses coutures</h2>

                            <p>
                            De la conception au transport en passant par le prototypage et la mise en production d'un vêtement,
                            nous nous assurons d'innover et de proposer une logique de travail moderne. Pour nous, l'innovation
                            n'est pas seulement technologique, c'est un outil pour penser un produit dans sa globalité. 
                            </p>
                        </div>

                        <div>
                            <h2>4. Oser être ambitieux pour le futur</h2>

                            <p>
                            Chez NewBrands, nous avons à coeur de faciliter tous les business en créant une chaîne de valeur la
                            plus vertueuse, ambitieuse et harmonieuse possible pour notre environnement.
                            </p>
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    );
}