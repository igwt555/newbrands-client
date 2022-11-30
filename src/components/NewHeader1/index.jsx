import './style.scss'
import { Searchbox1 } from '../search-box1'
import { BagIcon, BellIcon, NotificationIcon, SettingsIcon, ZapIcon } from '../icons'
import { Divider } from 'antd'

export const NewHeader1 = ({ value, onChange, placeholder }) => {
    return <div className="header-container">
        <div className='first-row'>
            <div className='search-boxer'>
                <Searchbox1 placeholder="Entrez votre recherche ici" />
            </div>
            <div className='header-button-group'>
                <div className='ZapButton'>
                    <ZapIcon /> Messages
                </div>
                <div className='SmallButton'>
                    <div>
                        <SettingsIcon />
                    </div>
                    <div>
                        <BellIcon />
                    </div>
                    <div className='avatar'>

                    </div>
                </div>
            </div>
        </div>
        <div className='second-row'>
            <div className='material-count'>
                114+ fournisseurs de matières alternatives
            </div>
            <div className='product-button'>
                <BagIcon />
                <div className='product-left'>
                    2 produits
                </div>
            </div>
        </div>
    </div>
}