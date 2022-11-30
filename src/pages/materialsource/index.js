import { MaterialCard } from '../../components/material-card'
import { NewHeader1 } from '../../components/NewHeader1'

import './style.scss'

export const MaterialSourcePage = () => {
    return <div className="materialsource-page">
        <NewHeader1 />
        <div className='material-content'>
            <div className='title'>
                Votre sourcing responsable en un clic
            </div>
            <div className='MaterialCardGroup'>
                {Array(5).fill(0).map((item, index) => (
                    <MaterialCard key={index} image={`image-${index}`} title={`title-${index}`} />
                ))}
            </div>
        </div>
        <div className='footer'>
            <button className='outline'>Retour</button>
            <button className='fill-button'>Continuer</button>
        </div>
    </div>
}