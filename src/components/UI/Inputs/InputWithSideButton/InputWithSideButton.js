import './index.scss';

const InputWithSideButton = (props) => {

    const { placeholder, buttonText } = props;

    return (
        <div className="inputWithSideButtonContainer">
            <input type="text" className="customSearchInput" placeholder={placeholder} />
            <button className="btn blueBtn">{buttonText}</button>
        </div>
    );
}

export default InputWithSideButton;