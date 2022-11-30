import './Button.scss';
import ClipLoader from 'react-spinners/ClipLoader';

export const Button = (props) => {
    const { value, handleClick, color, className, loading = false, disabled = false } = props;

    return (
        <button
        className={`btn ${color === "light" ? "lightBlueBtn" : "blueBtn"} ${className ? className : ""} ${disabled ? "disabled" : ""}`}
        onClick={handleClick}
        disabled={disabled}
        >
            {value}
            <ClipLoader color={color === "light" ? '#00798C' : "#fff"} loading={loading} size={15} />
        </button>
    )
}