import { useHistory } from "react-router-dom"
import { BusketIcon, CategoryIcon } from "../../../components/icons"

export const SideBar = () => {
    const history = useHistory()

    return <nav>
        <ul>
            <li onClick={() => history.push('/')}>
                <div className="logo"></div>
            </li>
            <li onClick={() => history.push('/marketproduct')}>
                <CategoryIcon />
            </li>
            <li onClick={() => history.push('/marketplace')} >
                <BusketIcon />
            </li>

        </ul>

    </nav >
}