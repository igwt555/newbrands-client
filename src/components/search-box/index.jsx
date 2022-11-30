import { SearchIcon } from "../icons"
import './style.scss'
export const Searchbox = ({ value, onChange, placeholder }) => {
    return <div className="search-box">
        <input value={value} onChange={event => onChange && onChange(event.target.value)} placeholder={placeholder} />
        <div className="icon">
            <SearchIcon />
        </div>
    </div>
}