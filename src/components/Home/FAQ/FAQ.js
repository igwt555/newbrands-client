import './FAQ.scss';
import { Link } from 'react-router-dom';

import pdf from "../../../assets/img/20212901_ Rapport_final_NEWBRANDS.pdf";

export const FAQ = (props) => {
    const { page } = props;

    return (
        <div className="faqContainer">
            <div className="faqBox">
                <p className="containerName">F.A.Q.</p>

                <div className="faqContent">
                    <h1 className="catchPhraseText">Vos questions, nos réponses</h1>

                    {page === "Tarifs" ?
                    <div className="faqItems">
                        <div>
                            <div>
                                <h2>NewBrands propose-t-il des forfaits aux organisations à but non lucratif, ONG et aux Incubateurs ?</h2>

                                <p>
                                Chez NewBrands, nous sommes fiers de soutenir les organisations qui font de grandes choses partout dans
                                le monde notamment pour une mode plus vertueuses.<br/><br/>
                                C'est pourquoi nous proposons des tarifs réduits pour les organisations à but non lucratif qualifiées
                                ainsi que les accélérateurs et incubateurs.<br/><br/>
                                Pour cela, contacter nous à adv@newbrands.fr
                                </p>
                            </div>

                            <div>
                                <h2>Peut-on payer NewBrands annuellement ?</h2>

                                <p>
                                Oui, vous pouvez payer votre compte tous les ans. Choisissez l'option annuelle sur la page des tarifs
                                et vous serez en mesure de payer sur une base annuelle.<br/><br/>
                                Le plan mensuel n'est pas un tarif réduit. Dès lors, si vous cherchez à économiser, nous vous
                                recommandons le plan annuel permettant jusqu’à 20 % d’économie !
                                </p>
                            </div>

                            <div>
                                <h2>Avez-vous des applications mobiles ?</h2>

                                <p>
                                Non, la plateforme est disponible uniquement sur ordinateur portable et de bureaux.<br/><br/>
                                En revanche, NewBrands est responsive sur Tablette IOS et Android.
                                </p>
                            </div>
                        </div>
                        
                        <div>
                            <div>
                                <h2>Quels modes de paiement acceptez-vous ?</h2>

                                <p>
                                Nous acceptons les moyens de paiement suivants : toutes les principales cartes de crédit (sauf les
                                cartes de débit et AMEX) Visa, Master Card, Discover, Carte Bleue, Union Pay.<br/><br/>
                                Vous recevrez automatiquement toutes vos factures chaque mois à la date du renouvellement de votre
                                abonnement.<br/><br/>
                                N'hésitez pas à contacter adv@newbrands.fr pour plus d'informations.
                                </p>
                            </div>

                            <div>
                                <h2>Et si je change d'avis ?</h2>

                                <p>
                                Si vous avez souscrit à un abonnement au cours des 30 derniers jours et que vous devez annuler votre
                                compte, vous avez droit à un remboursement au prorata.<br/><br/>
                                Nous vous rembourserons automatiquement le solde restant de votre achat initial. Il suffit d'annuler
                                le compte depuis la section "Mon compte" puis "Abonnement".<br/><br/>
                                Votre compte sera automatiquement remboursé. Si vous avez des questions, vous pouvez toujours
                                contacter adv@newbrands.fr
                                </p>
                            </div>

                            <div>
                                <h2>Puis-je changer de forfait ?</h2>

                                <p>
                                Vous pouvez modifier votre forfait à tout moment en changeant le type de forfait et en ajoutant
                                et supprimant des utilisateurs (Veuillez noter que, une fois passée la période de remboursement,
                                nous n'offrons aucun remboursement pour le passage à une version inférieure).<br/><br/>
                                Pour modifier votre forfait, il vous suffit de vous rendre dans la section "Mon compte" puis
                                "Abonnement". 
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="faqItems">
                        <div>
                            <div>
                                <h2>Pourquoi l'utilisation de la blockchain ?</h2>

                                <p>
                                Pour plus de transparence. En effet, la blockchain permet de stocker un grand nombre d'informations sur
                                les produits textiles gérés sur la plateforme NewBrands. Parmi ces informations se trouvent notamment
                                le lieu de production et la composition du textile, le mode de culture du coton ainsi que la date et le
                                lieu des différentes étapes par lesquelles il est passé : l'égrenage, la filature, le tissage, la
                                teinture, le processus de fabrication et l'expédition.<br/><br/>
                                Les informations de traçabilité sont enregistrées sur la blockchain, de même que les certificats GOTS1
                                et OEKO-TEX2.
                                </p>
                            </div>

                            <div>
                                <h2>À qui s'adresse nos offres ?</h2>

                                <p>
                                Pour une transformation en profondeur de notre industrie, nous souhaitons proposer nos services à tous
                                les différents acteurs de la confection.<br/><br/>
                                Pour les jeunes créateurs qui se lancent, les marques établies qui veulent développer des collections
                                durables et les grands groupes, nous nous engageons à proposer des solutions éthiques et un
                                accompagnement à la carte.<br/>
                                Avec un large choix de matériaux à faible impact et de fournisseurs sur tout le territoire européen,
                                nous nous adaptons aux réalités de votre entreprise, pour relever ensemble le défi du renouveau
                                textile !<br/><br/>
                                Nous sommes persuadés que chacun, à son échelle, a un rôle à jouer.
                                </p>
                            </div>

                            <div>
                                <h2>Can I work from anywhere ?</h2>

                                <p>
                                Remote work offers additional flexibility in choosing your own working environment such as 
                                workstation, lighting, ambient, etc. However, to stay efficient as a remote worker, we require all
                                our team members to have a quiet space dedicated and optimized for work.
                                </p>
                            </div>
                        </div>
                        
                        <div>
                            <div>
                                <h2>Pourquoi nous faire confiance ? </h2>

                                <p>
                                Vous ne seriez pas les premiers !<br/>
                                NewBrands collabore depuis ses débuts avec plus d'une vingtaine de clients dont de grandes enseignes
                                références telles que Chloé et Lacoste.<br/><br/>
                                Grâce à l'efficacité de notre plateforme SaaS, notre savoir-faire certifié et nos collaborations avec
                                des acteurs verts de l'industrie textile française et européenne, nous permettons aujourd'hui
                                l’économie de 65 % d'émissions de GES dans notre réseau.<br/><br/>
                                Pour en savoir plus, retrouvez l'étude sur l’impact de la solution NewBrands concernant les émissions
                                de GES <a href={pdf} target="_blank">ici</a>.
                                </p>
                            </div>

                            <div>
                                <h2>Will I be required to travel?</h2>

                                <p>
                                    This depends on your location and job requirements. If any travel is needed, this will be specified in the job description and pointed out in the recruitment process. If you have an impairments prohibiting you from traveling and it might affect your work, please mention it in the cover letter.
                                </p>
                            </div>

                            <div>
                                <h2>What time zone should I be in?</h2>

                                <p>
                                    We have team members across the world, in different time zones. However, we do require an overlap with our headquarters in Washington. This overlap will be defined for each position separately and can be anywhere from 4 to 8 hours depending on the position.
                                </p>
                            </div>
                        </div>
                    </div>
                    }
                </div>

                <div className="moreQuestions">
                    <p>
                        Vous avez des interrogations ? Ecrivez-nous à sales@newbrands.fr<br/>
                        Pour plus d'informations, bloquez un créneau avec notre équipe à <Link to="/firstcall"><span>www.newbrands.fr/firstcall</span></Link>
                    </p>
                </div>
            </div>
        </div>
    );
}