import React, { useReducer, createContext } from 'react';

export const initialState = {
    user: undefined,
    picture: undefined
}

export const UserStoreContext = createContext(initialState);

export const reducer = (state, action) => {
    switch (action.type) {
        case 'resetStore':
            return {...initialState};
        case 'setUser':
            return {...state, user: action.user};
        case 'setProfilePic':
            return {...state, picture: action.picture};
        default:
            throw new Error();
    }
}

export const UserStoreContainer = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserStoreContext.Provider value={{state, dispatch}}>
            { children }
        </UserStoreContext.Provider>
    );
}