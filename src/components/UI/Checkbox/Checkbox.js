import './Checkbox.scss';

export const Checkbox = (props) => {
    const { value, checked, readOnly } = props;

    return (
        <div className="customCheckboxContainer">
            <input type="checkbox" id="customCheckbox" checked={checked} readOnly={readOnly} />
            <label htmlFor="customCheckbox">{value}</label>
        </div>
    );
}