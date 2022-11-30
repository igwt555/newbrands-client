import image01 from './image1.png';

import './style.scss'
import { SearchIcon, DocumentIcon, ScanIcon, LocationIcon, ActivityIcon, ScopeIcon, StickyIconX, StickyIconA, StickyIconB, StickyIconC, StickyIconD, StickyIconE } from '../icons';
export const MarketPlaceCard = ({ image, title }) => {
    return <div className="marketplace-card" >
        <div className="image">
            <img src={image01} />
        </div>
        <div className="contents">
            <div className='subtitle'>
                Voile de coton imprimé
            </div>
            <div className='mini-box'>
                95% Coton / 5% Elasthane
            </div>
            <div className='row'>
                <div className='icon'><DocumentIcon /></div>
                <div className='label'>Width 152 cm / Weight 154 g/m2</div>
            </div>
            <div className='row'>
                <div className='icon'><ScanIcon /></div>
                <div className='label'>1 000 mètre minimum</div>
            </div>
            <div className='row'>
                <div className='icon'><LocationIcon /></div>
                <div className='label'>Made In France</div>
            </div>
            <div className='row-stock'>
                <div className='icon'><ActivityIcon /></div>
                <div className='label'>Pas de stock service</div>
            </div>
            <div className='row-scope'>
                <div className='icon'><ScopeIcon /></div>
                <div className='label'>Scope transaction vérifié</div>
            </div>

        </div>
        <div className='action'>
            <StickyIconX />
        </div>
    </div>
}