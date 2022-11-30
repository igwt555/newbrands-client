import { SearchIcon } from "../icons"
import './style.scss'
export const Searchbox1 = ({ value, onChange, placeholder }) => {
    return <div className="search-box1">
        <div className="icon">
            <SearchIcon />
        </div>
        <input value={value} onChange={event => onChange && onChange(event.target.value)} placeholder={placeholder} />

    </div>
}