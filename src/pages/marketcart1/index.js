import { MaterialCardPrice } from '../../components/material-card-price'
import { NewHeader1 } from '../../components/NewHeader1'

import './style.scss'

export const MarketCart1Page = () => {
    return <div className="marketcart1-page">
        <NewHeader1 />
        <div className='main-content'>
            <div className='marketcart1-content'>
                <div className='title'>
                    Récapitulatif de votre sourcing
                </div>
                <div className='comment'>
                    Afin de validé votre commande, merci de cliquer sur “Accepter l’offre”
                </div>
                <div className='MaterialCardGroup'>
                    {Array(3).fill(0).map((item, index) => (
                        <MaterialCardPrice key={index} image={`image-${index}`} title={`title-${index}`} />
                    ))}
                </div>
            </div>
            <div className='summary'>
                <div className='first-div'>
                    <div className='sub-title'>
                        Récapitulatif
                    </div>
                    <div className='big-div1'>
                        <div className='small-div1'>
                            Référence de projet
                        </div>
                        <div className='small-div2'>
                            9 625.00 €
                        </div>
                    </div>
                    <div className='big-div2'>
                        <span>#</span>AO-1841-0896
                    </div>
                    <div className='big-div3'>
                        <div className='small-div1'>
                            TVA (20,00%)
                        </div>
                        <div className='small-div2'>
                            2 418.24 €
                        </div>
                    </div>
                    <div className='big-div4'>
                        <div className='small-div1'>
                            Total TTC
                        </div>
                        <div className='small-div2'>
                            14 509.47 €
                        </div>
                    </div>
                </div>
                <div className='button-div'>
                    Valider la commande
                </div>
                <div className='last-comment'>
                    En cliquant sur “valider la commande”, vous acceptez notre Politique de
                    Confidentialité ainsi que nos Conditions Générale et nos Conditions Particulière de Ventes.
                </div>
            </div>
        </div>

    </div>
}