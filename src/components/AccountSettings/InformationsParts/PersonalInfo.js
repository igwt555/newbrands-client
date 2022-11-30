import React, { useState, useEffect, useCallback } from 'react';
import '../Account/account.scss';
import { editInfoUser } from '../../../store/service';
import debounce from "lodash.debounce";

export const PersonalInfo = (props) => {

    const { personalInfo } = props;

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [complement, setComplement] = useState('');
    const [postalCode, setPostalCode] = useState(0);
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const isValidPostalCode = (val) => {
        return /^((?!(0))[0-9]{5})$/.test(val);
    }

    const isValidPhoneNumber = (val) => {
        return /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/.test(val);
    }

    const sendQuery = query => {
        let idUser = "";

        if (localStorage.getItem('user'))
            idUser = JSON.parse(localStorage.getItem('user')).id;
        else
            idUser = localStorage.getItem("idUserNewBrands");

        const cpy = {
            lastName: query.lastName,
            firstName: query.firstName,
            address: query.address,
            complement: query.complement,
            postalCode: isValidPostalCode(query.postalCode) ? query.postalCode : 0,
            city: query.city,
            phone: isValidPhoneNumber(query.phone) ? query.phone : '',
            // email: query.email,
        }
        
        if (query.lastName !== undefined && query.lastName.length > 0
        && query.firstName !== undefined && query.firstName.length > 0
        && query.email !== undefined && query.email.length > 0) {
            editInfoUser({ info: [ cpy ], idUser }).then(res => {
                console.log(res);
            })
        }
    }

    const updateQuery = () => sendQuery({ lastName, firstName, address, complement, postalCode, city, phone, email });

    const delayedQuery = useCallback(debounce(updateQuery, 500), [lastName, firstName, address, complement, postalCode, city, phone, email]);

    useEffect(() => {
        if(mounted) {
            delayedQuery();
            return delayedQuery.cancel;
        }
    }, [lastName, firstName, address, complement, postalCode, city, phone, email, delayedQuery]);

    useEffect(() => {
        if(typeof personalInfo.addressInfoUser !== 'undefined') {
            setLastName(personalInfo.lastName);
            setFirstName(personalInfo.firstName);
            personalInfo.addressInfoUser !== undefined && setAddress(personalInfo.addressInfoUser.address);
            personalInfo.addressInfoUser !== undefined && setComplement(personalInfo.addressInfoUser.complement);
            personalInfo.addressInfoUser !== undefined && setPostalCode(personalInfo.addressInfoUser.postalCode);
            personalInfo.addressInfoUser !== undefined && setCity(personalInfo.addressInfoUser.city);
            setPhone(personalInfo.phone);
            setEmail(personalInfo.email);
        }
    }, [personalInfo]);

    return (
        <form>
            <div className="formLeft">
                <div className="firstRow">
                    <div className="inputDiv">
                        <input type="text"
                            value={lastName}
                            name="lastname"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label>Nom</label>
                    </div>
                    <div className="inputDiv">
                        <input type="text"
                            value={firstName}
                            name="firstname"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label>Prénom</label>
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
                <div className="inputDiv">
                    <input
                        value={email}
                        name="email"
                        disabled={true}
                    />
                    <label>Adresse e-mail</label>
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
                <div className="inputDiv">
                    <input
                        value={phone}
                        name="phone"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <label>Numéro de téléphone</label>
                </div>
            </div>
        </form>
    );
}