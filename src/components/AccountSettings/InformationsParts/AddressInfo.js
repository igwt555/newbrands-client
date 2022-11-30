import React, { useState, useEffect, useCallback } from 'react';
import '../Account/account.scss';
import { editAddressSocial } from '../../../store/service';
import debounce from "lodash.debounce";

export const AddressInfo = (props) => {

    const [name, setName] = useState('');
    const [siret, setSiret] = useState('');
    const [address, setAddress] = useState('');
    const [complement, setComplement] = useState('');
    const [postalCode, setPostalCode] = useState(0);
    const [city, setCity] = useState('');

    const isValidPostalCode = (val) => {
        return /^((?!(0))[0-9]{5})$/.test(val);
    }

    const sendQuery = query => {
        const cpy = {
            address: query.address,
            siret: query.siret,
            name: query.name,
            complement: query.complement,
            postalCode: isValidPostalCode(query.postalCode) ? query.postalCode : 0,
            city: query.city
        }
        
        editAddressSocial({ social: [ cpy ] }).then(res => {
            console.log(res);
        })
    };

    const updateQuery = () => sendQuery({ name, siret, address, complement, postalCode, city });

    const delayedQuery = useCallback(debounce(updateQuery, 500), [name, siret, address, complement, postalCode, city]);

    useEffect(() => {
        delayedQuery();
        return delayedQuery.cancel;
    }, [name, siret, address, complement, postalCode, city, delayedQuery]);

    const { addressInfo } = props;

    useEffect(() => {
        if (typeof addressInfo.company !== 'undefined'
        && typeof addressInfo.company.social !== 'undefined') {
            setName(addressInfo.company.name);
            setSiret(addressInfo.company.siret);
            setAddress(addressInfo.company.social.address);
            setComplement(addressInfo.company.social.complement);
            setPostalCode(addressInfo.company.social.postalCode);
            setCity(addressInfo.company.social.city);
        }
    }, [addressInfo]);

    return (
        <form>
            <div className="formLeft">
                <div className="inputDiv">
                    <input type="text"
                        value={name}
                        name="socialreason"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Raison Sociale</label>
                </div>
                <div className="inputDiv">
                    <input type="text"
                        value={siret}
                        name="siret"
                        onChange={(e) => setSiret(e.target.value)}
                    />
                    <label>SIRET</label>
                </div>
                <div className="inputDiv">
                    <input type="text"
                        value={address}
                        name="address1"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label>Adresse</label>
                </div>
                <div className="inputDiv">
                    <input
                        type="text"
                        value={complement}
                        name="address2"
                        onChange={(e) => setComplement(e.target.value)}
                    />
                    <label>Complément</label>
                </div>
            </div>
            <div className="formRight">
                <div className="inputDiv">
                    <input type="number"
                        value={postalCode}
                        name="zip"
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <label>Code postal</label>
                </div>
                <div className="inputDiv">
                    <input
                        type="text"
                        value={city}
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label>Ville</label>
                </div>
            </div>
        </form>
    );
}