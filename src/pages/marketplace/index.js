import { Button } from 'antd'
import { MarketPlaceCard } from '../../components/market-place-card'
import { Searchbox } from '../../components/search-box'
import { NewHeader1 } from '../../components/NewHeader1'

import './style.scss'
import { useHistory } from 'react-router-dom'

export const MarketPlacePage = () => {
    return <div className="marketplace-page">
        <NewHeader1 />
        <div className="search-content">
            <div>Votre sourcing responsable en un clic</div>
            <Searchbox placeholder='Entrez votre recherche ici par mots clés, matières ou produits' />
            <div className='category'>
                Populaire : Matière synthétique     Matière Végétale   Matière Animal   Matières naturels    Lainage Français
            </div>
        </div>
        <div className='content'>
            {Array(16).fill(0).map((item, index) => (
                <MarketPlaceCard key={index} image={`image-${index}`} title={`title-${index}`} />
            ))}
        </div>
        <div className='footer'>
            <button className='outline'>Retour</button>
            <button className='fill-button'>Continuer</button>
        </div>
    </div>
}