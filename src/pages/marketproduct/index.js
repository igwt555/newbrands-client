import { NewHeader1 } from '../../components/NewHeader1'
import ProImage01 from './ProductImage1.png';

import './style.scss'
import { JobCard } from '../../components/job-card';

export const MarketProductPage = () => {
    return <div className="marketproduct-page">
        <NewHeader1 />
        <div className='Header-Div'>
            <div className='Mt-name'>
                <div className='Mt-name1'>Marketplace / </div>
                <div className='Mt-name2'>Voile de coton imprimé</div>
            </div>
            <div className='Button-Group'>
                <button className='Btn-Sample'>Sample</button>
                <button className='Btn-Commander'>Commander</button>
            </div>
        </div>
        <div className='Product-container'>
            <div className='ImageDiv'>
                <img src={ProImage01} />
            </div>
            <div className='CharacterContent'>
                <div className='CharacterTable'>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                    <div className='row-item border-bottom_green'>
                        <div className='item-title'>
                            Nom matière
                        </div>
                        <div className='item-value'>
                            Voile de coton imprimé
                        </div>
                    </div>
                </div>
                <div className='SourceContent'>
                    Data from NewBrands Manufacture
                </div>
                <div className='JobCardGroup'>
                    {Array(3).fill(0).map((item, index) => (
                        <JobCard key={index} image={`image-${index}`} title={`title-${index}`} />
                    ))}
                </div>
            </div>
        </div>
    </div>
}