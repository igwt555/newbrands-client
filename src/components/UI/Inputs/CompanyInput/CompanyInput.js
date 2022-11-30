import { useEffect, useState, useCallback, useRef } from 'react';
import './CompanyInput.scss';
import debounce from "lodash.debounce";

import { getEnterpriseData } from '../../../../store/service';

export const CompanyInput = (props) => {
    const { handleChange, handleSelect, value, valid, validate = () => {} } = props;

    const [suggestions, setSuggestions] = useState([]);
    const [typed, setTyped] = useState(false);

    const ref = useRef();

    useEffect(() => {
        const checkOutsideClick = (e) => {
            if (suggestions.length > 0 && ref.current && !ref.current.contains(e.target)) setSuggestions([]);
        }

        document.addEventListener('mousedown', checkOutsideClick);

        return () => document.removeEventListener('mousedown', checkOutsideClick);
    }, [suggestions]);

    const sendQuery = query => {
        console.log(query);
        if (query.value.length > 0 && typed === true) {
            getEnterpriseData(query.value).then(res => {
                if (res.status === 200) setSuggestions(res.data.resultats_nom_entreprise);
            });
        } else setSuggestions([]);
    };

    const updateQuery = () => sendQuery({ value });

    const delayedQuery = useCallback(debounce(updateQuery, 500), [value]);

    useEffect(() => {
        setSuggestions([]);
        delayedQuery();
        return delayedQuery.cancel;
    }, [value]);

    return (
        <>
            <input
            className={`${valid === false ? "error" : ""}`}
            value={value}
            placeholder="Nom de l'entreprise"
            onChange={(e) => {
                validate(false);
                setTyped(true);
                handleChange(e.target.value);
            }}
            />
            <div
            className={`companysSuggestionsList ${valid === false ? "error" : ""}`}
            ref={ref}>
                { suggestions.map((item, index) => {
                    return (
                        <li key={index} onClick={() => {
                            setSuggestions([]);
                            handleSelect(item);
                            validate(true);
                            setTyped(false);
                        }}>
                            <div className="flexDiv">
                                <h4>{item.nom_entreprise}</h4>
                            </div>
                            <div>
                                {item.siege.code_postal && 
                                    <span>({item.siege.code_postal})</span>
                                }
                                <span className="libelle">{item.libelle_code_naf}</span>
                            </div>
                        </li>
                    );
                })}
            </div>
        </>
    );
}