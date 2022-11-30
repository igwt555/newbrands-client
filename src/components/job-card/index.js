import image01 from './image01.png';

import './style.scss'
import { SearchIcon, DocumentIcon, ScanIcon, LocationIcon, ActivityIcon, ScopeIcon, StickyIconX, StickyIconA, StickyIconB, StickyIconC, StickyIconD, StickyIconE } from '../icons';
export const JobCard = ({ image, title }) => {
    return <div className="job-card" >
        <div className='Card-content'>
            <div className='Image-box'>
                <div className="image">
                    <img src={image01} />
                </div>
                <div className='Image-content'>
                    <div className='first-div'>GOTS</div>
                    <div className='second-div'>Réf. #93892674</div>
                </div>
            </div>
            <div className='Main-content'>
                Expire en mai 2020
            </div>
        </div>
        <div className="Scope-Certify">
            Scope certifié
        </div>
    </div>
}