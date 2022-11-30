import image01 from './Material01.png';

import './style.scss'

export const MaterialCardPrice = ({ image, title }) => {
    return <div className="material-card-price" >
        <div className="Mimage">
            <img src={image01} />
        </div>
        <div className='M-Content'>
            <div className='Top-row'>
                <div className='normalText'>Nom_Matière_X : </div>
                <div className='greenText'>Échantillon</div>
            </div>
            <div className='Bottom-row'>
                <div>210 g/m²</div>
                <div>(95% coton organic ~ 5% élasthane)</div>
                <div>réf. #107293</div>
            </div>
        </div>
        <div className='M-price'>
            1,00 €
        </div>
    </div>
}