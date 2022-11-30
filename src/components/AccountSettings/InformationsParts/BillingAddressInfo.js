import React, { useState, useEffect, useCallback } from 'react';
import '../Account/account.scss';
import { postSocialAddress } from '../../../store/service';
import debounce from "lodash.debounce";

export const BillingAddressInfo = (props) => {

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
        
        postSocialAddress(cpy).then(res => {
            console.log(res);
        })
    };

    const updateQuery = () => sendQuery({ name, siret, address, complement, postalCode, city });

    const delayedQuery = useCallback(debounce(updateQuery, 500), [name, siret, address, complement, postalCode, city]);

    useEffect(() => {
        delayedQuery();
        return delayedQuery.cancel;
    }, [name, siret, address, complement, postalCode, city, delayedQuery]);

    const { billingInfo } = props;

    useEffect(() => {
        if (typeof billingInfo.company !== 'undefined'
        && typeof billingInfo.company[0].facturation !== 'undefined') {
            setName(billingInfo.company[0].name);
            setSiret(billingInfo.company[0].siret);
            setAddress(billingInfo.company[0].facturation[0].adress);
            setComplement(billingInfo.company[0].facturation[0].complement);
            setPostalCode(billingInfo.company[0].facturation[0].postalCode);
            setCity(billingInfo.company[0].facturation[0].city);
        }
    }, [billingInfo]);

    return (
        <form>
            <div className="formLeft">
                <div className="firstRow">
                    <div className="inputDiv">
                        <input type="text"
                            value={name}
                            name="socialreason"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Raison sociale</label>
                    </div>
                    <div className="inputDiv">
                        <input type="text"
                            value={siret}
                            name="siret"
                            onChange={(e) => setSiret(e.target.value)}
                        />
                        <label>SIRET</label>
                    </div>
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
                    <input type="number"
                        value={postalCode}
                        name="zip"
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <label>Code postal</label>
                </div>
            </div>
            <div className="formRight">
                <div className="inputDiv">
                    <input
                        value={complement}
                        type="text"
                        name="address2"
                        onChange={(e) => setComplement(e.target.value)}
                    />
                    <label>Complément</label>
                </div>
                <div className="inputDiv">
                    <input
                        value={city}
                        type="text"
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label>Ville</label>
                </div>
            </div>
        </form>
    );
}