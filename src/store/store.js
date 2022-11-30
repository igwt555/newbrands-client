import { useReducer, createContext } from 'react';

export const initialState = {
    typesSelection: [],
    projectName: '',
    delay: '',
    deliveryPlace: '',
    description: '',
    budget: '',
    info: {},
    productList: [],
    productCategories: [],
    productTypes: [],
    productMaterials: [],
    productDescriptions: [],
    productCountriesOfManufacture: [],
    projectFile: null,
    projectFilesInDb: null,

    productFiles: [],
    productFilesInDb: [],

    /// ERROR
    error: false,
    errorMsg: ''
}

export const StoreContext = createContext(initialState);

export const reducer = (state, action) => {
    switch (action.type) {
        case 'resetStore':
            return {...initialState, info: {}};
        case 'setTypesSelection':
            return {...state, typesSelection: action.typesSelection};
        case 'setProjectName':
            return {...state, projectName: action.projectName};
        case 'setDelay':
            return {...state, delay: action.delay};
        case 'setDeliveryPlace':
            return {...state, deliveryPlace: action.deliveryPlace};
        case 'setDescription':
            return {...state, description: action.description};
        case 'setBudget':
            return {...state, budget: action.budget};
        case 'setInfo':
            return {...state, info: action.info};
        case 'setProductList':
            return {...state, productList: action.productList};
        case 'setProductCategories':
            return {...state, productCategories: action.productCategories};
        case 'setProductTypes':
            return {...state, productTypes: action.productTypes};
        case 'setProductMaterials':
            return {...state, productMaterials: action.productMaterials};
        case 'setProductDescriptions':
            return {...state, productDescriptions: action.productDescriptions};
        case 'setProductCountriesOfManufacture':
            return {...state, productCountriesOfManufacture: action.productCountriesOfManufacture};
        case 'setProjectFile':
            return {...state, projectFile: action.projectFile};
        case 'setProjectFilesInDb':
            return {...state, projectFilesInDb: action.projectFilesInDb};
        case 'setProductFiles':
            return {...state, productFiles: action.productFiles};
        case 'setProductFilesInDb':
            return {...state, productFilesInDb: action.productFilesInDb};
        case 'setError':
            return {...state, error: action.error, errorMsg: action.errorMsg}
        default:
            throw new Error();
    }
}

export const StoreContainer = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            { children }
        </StoreContext.Provider>
    );
}