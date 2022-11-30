import './Button.scss';
import { Link } from 'react-router-dom';

export const ButtonLink = (props) => {
    const { value, color, className, href, target, external, linkState = {} } = props;

    if(external) return (
        <a
        href={href}
        target={target}
        >
            <button className={`btn ${color === "light" ? "lightBlueBtn" : "blueBtn"} ${className ? className : ""}`}>
                {value}
            </button>
        </a>
    )
    else return (
        <Link
        to={{
            pathname: href,
            state: linkState
        }}
        className={`btn ${color === "light" ? "lightBlueBtn" : color === "white" ? "whiteBtn" : "blueBtn"} ${className ? className : ""}`}
        >
            {value}
        </Link>
    )
}