import { NewHeader1 } from '../../components/NewHeader1'

import './style.scss'

export const DeliveryPlacePage = () => {
    return <div className="deliveryplace-page">
        <NewHeader1 />
        <div className='deliveryplace-content'>
            <div className='title'>
                Lieu de livraison
            </div>
            <input className='Address' placeholder={"Adresse postale*"} />
        </div>
        <div className='footer'>
            <button className='outline'>Retour</button>
            <button className='fill-button'>Continuer</button>
        </div>
    </div>
}