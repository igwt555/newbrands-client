import React, { useEffect, useState, useRef } from 'react';

import scriptLoader from 'react-async-script-loader';
import PlacesAutocomplete from 'react-places-autocomplete';

import './index.scss';

const PlaceInput = (props) => {

    const { isScriptLoaded, isScriptLoadSucceed, children, handleValueChange, value } = props;

    const [address, setAddress] = useState('');

    const handleChange = (value) => {
        setAddress(value);
        handleValueChange(value);
    }

    const handleSelect = (value) => {
        setAddress(value);
        handleValueChange(value);
    }

    if (!(isScriptLoaded && isScriptLoadSucceed)) return <p>Loading...</p>

    return (
        <>
            <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div className='suggestionInput'>
                        {React.cloneElement(children, {...getInputProps({placeholder: 'Entrez une adresse...'}), value: value})}
                        <div className={`${suggestions.length > 0 ? 'suggestionList' : ''}`}>
                            {loading && <div>Loading...</div>}
                            {
                                suggestions.map((suggestion) => {
                                    return (
                                        <div className='suggestionListElement' {...getSuggestionItemProps(suggestion)}>
                                            {suggestion.description}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </>
    );
}

export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`])(PlaceInput);