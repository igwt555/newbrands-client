import { useEffect, useState, useContext } from "react";
import { Redirect } from 'react-router';
import "../../index.css";
import "./CreateProject.scss";
import { Layout } from "antd";

import NavFooter from "../../components/createProject/NavFooter/NavFooter";
import NavSider from "../../components/createProject/NavSider/NavSider";

import TypeProject from "./typeProject/typeProject";
import ProjectName from './projectName/ProjectName';
import NumberProduct from "./numberProduct/numberProduct";
import ProductDelay from "./productDelay/productDelay";
import PlaceOfShip from "./placeOfShip/placeOfShip";
import DocumentsProject from "./documentsProject/documentsProject";
import DescriptionProject from "./descriptionProject/descriptionProject";
import BudgetProject from "./budgetProject/budgetProject";
import UserInfo from "./userInfo/userInfo";
import ProductTexture from "./productDetail/productTexture/productTexture";
import ProductWeight from "./productDetail/productWeight/productWeight";
import ProductType from "./productDetail/productType/productType";
import ProductCategory from "./productDetail/productCategory/productCategory";
import ProductCountryOfManufacture from "./productDetail/productCountryOfManufacture/productCountryOfManufacture";
import ExitPage from './exitPage/ExitPage';

import { StoreContext } from '../../store/store';

import { getIfProjectIsInCreation, getProjectRessources,
    getWorkFlowType, postProjectTypes, postProjectDelay,
    postProjectDeliveryPlace, postProjectDescription,
    postProjectBudget, postProjectInfo, postProjectProductList,
    getProductWorkflow, postProductCategories, postProductType,
    postProductMaterials, postProductWeights, postProjectFiles,
    postProjectName, postProductDescription, postProductFiles, postProductCountryOfManufacture } from '../../store/service';

import { checkIfEmailIsValid, checkIfPhoneIsValid } from '../../utils/formInputCheckers';

const CreateProject = () => {
    const [loading, setLoading] = useState(false);
    const [filesLoading, setFilesLoading] = useState(false);
    const [projectExistence, setProjectExistence] = useState();
    const [projectRessources, setProjectRessources] = useState();
    const [workflowType, setWorkflowType] = useState({
        workflow: [
            {
                orders: 0,
                idStep: '',
                nameStep: 'type',
                typeStep: null
            }
        ]
    });
    const [workflowSteps, setWorkflowSteps] = useState([
        {
            stepName: 'Type',
        },
    ]);
    const [productWorkflow, setProductWorkflow] = useState([]);

    const [currentStep, setCurrentStep] = useState(0);
    const [currentProductIt, setCurrentProductIt] = useState(0);
    const [currentProductStep, setCurrentProductStep] = useState(0);
    // const [typeInit, setTypeInit] = useState(false);
    const [userInfoError, setUserInfoError] = useState(false);

    const { state, dispatch } = useContext(StoreContext);

    const isUserSubscribed = JSON.parse(localStorage.getItem('user')).abonnement['abonné'];

    const allowed = localStorage.getItem("allowedProject");

    const fillProductsInfoStore = (productInfos) => {

        const categories = [];
        const types = [];
        const materials = [];
        const descriptions = [];
        const files = [];
        const countries = [];

        productInfos.forEach((pInfo, i) => {
            if (pInfo.category !== undefined)
                categories[i] = pInfo.category;
            if (pInfo.gamme !== undefined)
                types[i] = pInfo.gamme;
            if (pInfo.matter !== undefined)
                materials[i] = pInfo.matter;
            if (pInfo.content !== undefined)
                descriptions[i] = pInfo.content;
            if (pInfo.document !== undefined)
                files[i] = pInfo.document;
            if (pInfo.country !== undefined)
                countries[i] = pInfo.country;
        });

        console.log(countries);

        dispatch({ type: 'setProductList', productList: productInfos });
        dispatch({ type: 'setProductCategories', productCategories: categories });
        dispatch({ type: 'setProductTypes', productTypes: types });
        dispatch({ type: 'setProductMaterials', productMaterials: materials });
        dispatch({ type: 'setProductDescriptions', productDescriptions: descriptions });
        dispatch({ type: 'setProductFilesInDb', productFilesInDb: files });
        dispatch({ type: 'setProductCountriesOfManufacture', productCountriesOfManufacture: countries });
    }

    const fillInfosInStore = (user) => {
        dispatch({ type: 'setInfo', info: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            siret: user.company.siret,
            companyName: user.company.name,
            phone: String(user.phone)
        }});
    }

    const fillStore = (data) => {
        const user = localStorage.getItem('user');

        if (data.project[0].type !== undefined && data.project[0].type !== null) {
            /*const types = [];

            console.log(data.project[0].type);

            data.project[0].type.forEach(elem => types.push({ id: elem.id }));
            dispatch({ type: 'setTypesSelection', typesSelection: types });*/
            dispatch({ type: 'setTypesSelection', typesSelection: data.project[0].type });
        }
        if (user) fillInfosInStore(JSON.parse(user));
        if (data.project[0].deliveryDate !== undefined
            && data.project[0].deliveryDate !== null) dispatch({ type: 'setDelay', delay: data.project[0].deliveryDate });
        if (data.project[0].livraison !== undefined
            && data.project[0].livraison !== null) dispatch({ type: 'setDeliveryPlace', deliveryPlace: data.project[0].livraison });
        if (data.project[0].content !== undefined
            && data.project[0].content !== null) dispatch({ type: 'setDescription', description: data.project[0].content });
        if (data.project[0].budget !== undefined
            && data.project[0].budget) dispatch({ type: 'setBudget', budget: data.project[0].budget });
        if (data.project[0].info !== undefined
            && data.project[0].info) dispatch({ type: 'setInfo', info: data.project[0].info });
        if (data.project[0].product !== undefined
            && data.project[0].product) fillProductsInfoStore(data.project[0].product);
        if (data.project[0].contact !== undefined
            && data.project[0].contact !== null && !Array.isArray(data.project[0].contact)) dispatch({ type: 'setInfo', info: data.project[0].contact });
        if (data.project[0].document !== undefined
            && data.project[0].document !== null) dispatch({ type: 'setProjectFilesInDb', projectFilesInDb: data.project[0].document });
        if (data.project[0].title !== undefined
            && data.project[0].title !== null) dispatch({ type: 'setProjectName', projectName: data.project[0].title });
    }

    const buildWorkflowSteps = (wrkflType) => {
        const cpyWorkflowSteps = [...workflowSteps];

        cpyWorkflowSteps.push({ stepName: 'Nom du projet' });

        wrkflType.workflow.forEach(elem => {
            if (elem.nameStep === 'livraison')
                cpyWorkflowSteps.push({ stepName: 'Livraison' });
            if (elem.nameStep === 'product')
                cpyWorkflowSteps.push({ stepName: 'Noms et nombre de produits' }, { stepName: 'Produits', subSteps: [] });
            if (elem.nameStep === 'delai')
                cpyWorkflowSteps.push({ stepName: 'Délais attendus' });
            if (elem.nameStep === 'content')
                cpyWorkflowSteps.push({ stepName: 'Description' });
            if (elem.nameStep === 'budget')
                cpyWorkflowSteps.push({ stepName: 'Budget' });
            if (elem.nameStep === 'info')
                cpyWorkflowSteps.push({ stepName: 'Coordonnées' });
            if (elem.nameStep === 'file')
                cpyWorkflowSteps.push({ stepName: 'Photos / Documents' });
            if (elem.nameStep === 'country')
                cpyWorkflowSteps.push({ stepName: 'Pays de confection' });
        });

        cpyWorkflowSteps.push({ stepName: '' });

        setWorkflowSteps(cpyWorkflowSteps);
    }

    useEffect(() => {
        setLoading(true);
        getIfProjectIsInCreation().then(res => {
            if (res.status === 200)
                setProjectExistence(res.data);
        }).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (projectExistence !== undefined && projectExistence.existant === true) {
            setLoading(true);
            getProjectRessources(projectExistence.idProject).then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setProjectRessources(res.data);

                    fillStore(res.data);
                }
            }).finally(() => setLoading(false));;
        }
    }, [projectExistence]);

    useEffect(() => {
        if (projectRessources !== undefined) {
            setLoading(true);
            getWorkFlowType(projectExistence.idProject).then(res => {
                if (res.status === 200) {
                    const cpyWorkflowType = workflowType;
                    cpyWorkflowType.workflow = cpyWorkflowType.workflow.concat(res.data.workflow);
                    setWorkflowType(res.data);

                    buildWorkflowSteps(cpyWorkflowType);
                }
            }).finally(() => setLoading(false));
        }
    }, [projectRessources]);

    const updateProductWorkFlow = async () => {
        setLoading(true);
        const productListInStore = state.productList;
        const postProdRes = await postProjectProductList({ productSelection: productListInStore }, projectExistence.idProject);

        if (postProdRes.status === 200 && state.productList.length > 0) {
            const getProdWorkflowRes = await getProductWorkflow(projectExistence.idProject);
            const getProjectRessourcesRes = await getProjectRessources(projectExistence.idProject);

            if (getProdWorkflowRes.status == 200) {
                console.log("yoooooo")
                workflowSteps.forEach((d, i) => {
                    if (d.subSteps !== undefined) {
                        const cpy = workflowSteps;

                        cpy[i].subSteps = getProdWorkflowRes.data.workflow[0];
                        setProductWorkflow(getProdWorkflowRes.data.workflow);
                        setWorkflowSteps(cpy);
                    }
                })
            }

            if (getProjectRessourcesRes.status == 200) {
                dispatch({ type: 'setProductList', productList: getProjectRessourcesRes.data.project[0].product });
                //fillStore(getProjectRessourcesRes.data);
            }
        }
        setLoading(false);
    }

    const goToPrevStep = () => {
        if (currentStep === 0) return;

        dispatch({ type: 'setError', error: false, errorMsg: '' });
        if (workflowSteps[currentStep].stepName === 'Produits') {
            if (currentProductIt === 0 && productWorkflow[currentProductIt] !== undefined
            && currentProductStep === 0) {
                setCurrentStep(currentStep - 1);
            }
            else {
                if (productWorkflow[currentProductIt] !== undefined && currentProductStep === 0) {
                    setCurrentProductStep(productWorkflow[currentProductIt].length - 1);
                    setCurrentProductIt(currentProductIt - 1);
                } else {
                    setCurrentProductStep(currentProductStep - 1);
                }
            }
        } else setCurrentStep(currentStep - 1);
    }

    const goToNextStep = () => {
        dispatch({ type: 'setError', error: false, errorMsg: '' });
        if (workflowSteps[currentStep].stepName === 'Produits') {

            if (currentProductIt + 1 >= state.productList.length
            && productWorkflow.length > 0 && productWorkflow[currentProductIt] !== undefined
            && currentProductStep + 1 >= productWorkflow[currentProductIt].length) {
                //setCurrentProductStep(0);
                //setCurrentProductIt(0);
                setCurrentStep(currentStep + 1);
            }
            else {
                if (productWorkflow.length > 0 && currentProductStep + 1 < productWorkflow[currentProductIt].length)
                    setCurrentProductStep(currentProductStep + 1);
                else {
                    setCurrentProductStep(0);
                    setCurrentProductIt(currentProductIt + 1);
                }
            }
        } else setCurrentStep(currentStep + 1);
    }

    const initProjectByPostingTypes = async () => {
        setLoading(true);
        const typesSelectionInStore = state.typesSelection;

        const postProjectTypesRes = await postProjectTypes({ typesSelection: typesSelectionInStore });

        if (postProjectTypesRes.status === 200) {
            const res = await getIfProjectIsInCreation();

            if (res.status === 200) {
                setProjectExistence(res.data);
            }
        }
        /*if (postProjectTypesRes.status === 200
        && projectExistence === undefined || projectExistence.existant !== true) {
            const res = await getProjectRessources(projectExistence.idProject);

            if (res.status === 200) {
                setProjectRessources(res.data);

                fillStore(res.data);
            }
        }*/
        setLoading(false);
    }

    const renderProductStep = () => {
        if (productWorkflow[currentProductIt] !== undefined
        && productWorkflow[currentProductIt][currentProductStep] !== undefined) {
            console.log(
                productWorkflow, currentProductIt, currentProductStep,
                productWorkflow[currentProductIt][currentProductStep].nameStep
            )
            switch (productWorkflow[currentProductIt][currentProductStep].nameStep) {
                case 'Matière':
                    return <ProductTexture projectId={projectExistence.idProject} product={state.productList[currentProductIt]} prodIt={currentProductIt} />
                case 'matter':
                    return <ProductTexture projectId={projectExistence.idProject} product={state.productList[currentProductIt]} prodIt={currentProductIt} />
                case 'Grammage':
                    return <ProductWeight product={state.productList[currentProductIt]} prodIt={currentProductIt} />
                case 'grammage':
                    return <ProductWeight product={state.productList[currentProductIt]} prodIt={currentProductIt} />
                case 'Gamme':
                    return <ProductType projectId={projectExistence.idProject} product={state.productList[currentProductIt]} prodIt={currentProductIt} />
                case 'gamme':
                    return <ProductType projectId={projectExistence.idProject} product={state.productList[currentProductIt]} prodIt={currentProductIt} />
                case 'Catégorie':
                    return <ProductCategory projectId={projectExistence.idProject} product={state.productList[currentProductIt]} prodIt={currentProductIt} />
                case 'category':
                    return <ProductCategory projectId={projectExistence.idProject} product={state.productList[currentProductIt]} prodIt={currentProductIt} />
                case 'description':
                    return <DescriptionProject product={state.productList[currentProductIt]} prodIt={currentProductIt} />
                case 'file':
                    return <DocumentsProject projectId={projectExistence.idProject} product={state.productList[currentProductIt]} prodIt={currentProductIt} loadingFiles={(filesLoading) => setFilesLoading(filesLoading)} />
                case 'country':
                    return <ProductCountryOfManufacture projectId={projectExistence.idProject} product={state.productList[currentProductIt]} prodIt={currentProductIt} />
            }
        }
    }

    const sendProductCategoriesSelection = () => {
        console.log(state.productCategories);
        const productCategoriesInStore = state.productCategories[currentProductIt];
        const productInStore = state.productList[currentProductIt];

        setLoading(true);
        postProductCategories({ categorySelection: productCategoriesInStore}, productInStore.id).then(res => {
            if (res.status === 200)
                console.log(res.data);
        }).finally(() => setLoading(false));
    }

    const sendProductType = () => {
        console.log(state.productTypes);
        const productTypeInStore = state.productTypes[currentProductIt];
        const productInStore = state.productList[currentProductIt];

        setLoading(true);
        postProductType({ gammeSelection: productTypeInStore }, productInStore.id).then(res => {
            if (res.status === 200)
                console.log(res.data);
        }).finally(() => setLoading(false));
    }

    const sendProductMaterials = async () => {
        console.log(state.productMaterials);
        const productMaterialsInStore = state.productMaterials[currentProductIt];
        const productInStore = state.productList[currentProductIt];

        setLoading(true);
        const postMaterialsRes = await postProductMaterials({ matterSelection: productMaterialsInStore }, productInStore.id);

        if (postMaterialsRes.status == 200) {
            console.log(productMaterialsInStore);

            const getProjectRessourcesRes = await getProjectRessources(projectExistence.idProject);

            if (getProjectRessourcesRes.status == 200) {
                console.log(getProjectRessourcesRes.data.project[0]);
                const data = getProjectRessourcesRes.data.project[0].product[currentProductIt].matter;

                productMaterialsInStore.map((m, i) => {
                    m.rId = data[i].id;
                });
                console.log(productMaterialsInStore);
            }
        }
        setLoading(false);
    }

    const sendProductWeights = () => {
        console.log(state.productMaterials);
        const productMaterialsInStore = state.productMaterials[currentProductIt];
        const productInStore = state.productList[currentProductIt];

        productMaterialsInStore.map((m) => {
            console.log(m.rId);
            m.id = m.rId !== undefined ? m.rId : m.idMatter;
        });

        setLoading(true);
        postProductWeights({ grammageSelection: productMaterialsInStore }, productInStore.id).then(res => {
            if (res.status === 200)
                console.log(res.data);
        }).finally(() => setLoading(false));
    }

    const sendProductDescriptions = () => {
        const productDescriptionInStore = state.productDescriptions[currentProductIt];
        const productInStore = state.productList[currentProductIt];

        setLoading(true);
        postProductDescription({ product: true, content: productDescriptionInStore }, productInStore.id).then(res => {
            if (res.status === 200)
                console.log(res.data);
        }).finally(() => setLoading(false));
    }

    const sendProductFiles = () => {
        const productFilesInStore = state.productFiles[currentProductIt];
        const productInStore = state.productList[currentProductIt];

        console.log('---> FILES TO SEND', productFilesInStore);

        if (productFilesInStore) {
            setLoading(true);
            productFilesInStore.append('product', true);
            for (let v of productFilesInStore.values()) {
                console.log('FILES TO SEND', v);
            }
            postProductFiles(productFilesInStore, productInStore.id).then(res => {
                if (res.status === 200)
                    console.log(res.data);
            }).finally(() => setLoading(false));
        }
    }

    const sendProductCountriesOfManufacture = () => {
        const productCountriesOfManufactureInStore = state.productCountriesOfManufacture[currentProductIt];
        const productInStore = state.productList[currentProductIt];

        if (productCountriesOfManufactureInStore) {
            setLoading(true);

            let cpy = '';

            cpy = productCountriesOfManufactureInStore;
            postProductCountryOfManufacture({ product: true, countryOfManufacture: cpy }, productInStore.id).then(res => {
                if (res.status === 200)
                    console.log(res.data);
            }).finally(() => setLoading(false));
        }
    }

    const postProductDetails = () => {
        if (productWorkflow[currentProductIt] !== undefined) {
            switch (productWorkflow[currentProductIt][currentProductStep].nameStep) {
                case 'Catégorie':
                    return sendProductCategoriesSelection();
                case 'category':
                    return sendProductCategoriesSelection();
                case 'Matière':
                    return sendProductMaterials();
                case 'matter':
                    return sendProductMaterials();
                case 'Grammage':
                    return sendProductWeights();
                case 'grammage':
                    return sendProductWeights();
                case 'Gamme':
                    return sendProductType();
                case 'gamme':
                    return sendProductType();
                case 'description':
                    return sendProductDescriptions();
                case 'country':
                    return sendProductCountriesOfManufacture();
                default:
                    break;
            }
        }
    }


    // CHECK IF STEP HAS VALID DATA //

    const checkNamesAndNumberOfProducts = () => {
        let valid = true;

        if (state.productList.length === 0)
            valid = false;
        
        state.productList.forEach((p) => {
            console.log(p);
            if (state.typesSelection.length === 1 && state.typesSelection[0].name === 'Stylisme') {
                if (p.name.length === '' || p.color === '' || p.numberOfVariants === '' || p.numberOfVariants === 0) {
                    valid = false;
                }
            } else if (p.name.length === '' || p.quantity === '' || p.quantity === 0 || p.size === '')
                valid = false;
        });
        return valid;
    }

    const checkUserInformation = () => {
        let valid = true;
        let msg = '';
        const infoInStore = state.info;


        if ((msg = checkIfEmailIsValid(infoInStore.email)) !== '') {
            dispatch({ type: 'setError', error: true, errorMsg: msg });
            return false;
        }

        if ((msg = checkIfPhoneIsValid(infoInStore.phone)) !== '') {
            dispatch({ type: 'setError', error: true, errorMsg: msg });
            return false;
        }

        if(!infoInStore.validCompany) {
            dispatch({ type: 'setError', error: true, errorMsg: 'Veuillez sélectionner une entreprise' });
            return false;
        }

        if (!infoInStore.firstName || infoInStore.firstName === ''
        || !infoInStore.lastName || infoInStore.lastName === ''
        || !infoInStore.companyName || infoInStore.companyName === ''
        || !infoInStore.fonction || infoInStore.fonction === ''
        || !infoInStore.siret || infoInStore.siret === ''
        || !infoInStore.pays || infoInStore.pays === '') {
            dispatch({ type: 'setError', error: true, errorMsg: 'Tous les champs doivent être remplis' });
            return false;
        }

        return valid;
    }

    const checkProducts = () => {
        let valid = true;

        if (productWorkflow[currentProductIt] !== undefined) {
            switch (productWorkflow[currentProductIt][currentProductStep].nameStep) {
                case 'Catégorie':
                    valid = (state.productCategories[currentProductIt] !== undefined && state.productCategories[currentProductIt].length > 0);
                    if (valid === false)
                        dispatch({ type: 'setError', error: true, errorMsg: 'Vous devez sélectionner une catégorie' });
                    break;
                case 'Gamme':
                    valid = (state.productTypes[currentProductIt] !== undefined && state.productTypes[currentProductIt].length > 0);
                    if (valid === false)
                        dispatch({ type: 'setError', error: true, errorMsg: 'Vous devez sélectionner une gamme' });
                    break;
                case 'Matière':
                    valid = (state.productMaterials[currentProductIt] !== undefined && state.productMaterials[currentProductIt].length > 0);
                    if (valid === false)
                        dispatch({ type: 'setError', error: true, errorMsg: 'Vous devez sélectionner une gamme' });
                    break;
                case 'description':
                    valid = (state.productDescriptions[currentProductIt] !== undefined && state.productDescriptions[currentProductIt].length > 0);
                    if (valid === false)
                        dispatch({ type: 'setError', error: true, errorMsg: 'Ce champ doit être rempli' });
                    break;
                case 'country':
                    valid = (state.productCountriesOfManufacture[currentProductIt] !== undefined && state.productCountriesOfManufacture[currentProductIt].length > 0);
                    if (valid === false)
                        dispatch({ type: 'setError', error: true, errorMsg: 'Vous devez sélectionner un pays de confection' });
                    break;
                default:
                    break;
            }
        }

        return valid;
    }

    const checkIfStepIsValid = (step) => {
        let valid = true;

        switch (step) {
            case 'Nom du projet':
                valid = (state.projectName !== undefined && state.projectName.length > 0);
                if (valid === false)
                    dispatch({ type: 'setError', error: true, errorMsg: 'Ce champ doit être rempli' });
                break;
            case 'Noms et nombre de produits':
                valid = checkNamesAndNumberOfProducts();
                if (valid === false)
                    dispatch({ type: 'setError', error: true, errorMsg: 'Vous devez créer au moins un produit et remplir tous les champs' });
                break;
            case 'Description':
                valid = (state.description !== undefined && state.description.length > 0);
                if (valid === false)
                    dispatch({ type: 'setError', error: true, errorMsg: 'Une description est nécessaire' });
                break;
            case 'Coordonnées':
                valid = checkUserInformation();
                break;
            case 'Budget':
                valid = (state.budget !== undefined && state.budget.length > 0);
                if (valid === false)
                    dispatch({ type: 'setError', error: true, errorMsg: 'Vous devez indiquer votre budget' });
                break;
            case 'Livraison':
                valid = (state.deliveryPlace !== undefined && state.deliveryPlace.length > 0);
                if (valid === false)
                    dispatch({ type: 'setError', error: true, errorMsg: 'Vous devez indiquer l\'adresse de livraison '});
                break;
            case 'Produits':
                valid = checkProducts();
                break;
            default:
                break;
        }
        return valid;
    }

    // if(!isUserSubscribed /*&& allowed !== "true"*/) return <Redirect to="/dashboard" />

    return (
        <Layout
          style={{
            minHeight: "100vh",
            marginLeft: "300px",
            paddingBottom: "120px",
          }}
        >
            <NavSider
            maxPage="20"
            currentPage={currentStep}
            currentProduct={currentProductIt}
            currentProductStep={currentProductStep}
            workflowSteps={workflowSteps}
            productWorkflow={productWorkflow}
            />
            <Layout style={{ minHeight: "80vh" }}>
                {
                    (() => {
                        if (workflowSteps[currentStep] !== undefined)
                            switch (workflowSteps[currentStep].stepName) {
                                case 'Type':
                                    return <TypeProject />
                                case 'Nom du projet':
                                    return <ProjectName />
                                case 'Noms et nombre de produits':
                                    return <NumberProduct />
                                case 'Délais attendus':
                                    return <ProductDelay />
                                case 'Livraison':
                                    return <PlaceOfShip />
                                case 'Description':
                                    return <DescriptionProject />
                                case 'Budget':
                                    return <BudgetProject />
                                case 'Coordonnées':
                                    return <UserInfo errorQuickbook={userInfoError} />
                                case 'Produits':
                                    return renderProductStep()
                                case 'Photos / Documents':
                                    return <DocumentsProject projectId={projectExistence.idProject} loadingFiles={(filesLoading) => setFilesLoading(filesLoading)}/>
                                case 'Pays de confection':
                                    return <ProductCountryOfManufacture />
                                case '':
                                    return <ExitPage projectId={projectExistence.idProject} />
                            }
                    }) ()
                }
                <NavFooter
                    loading={loading || state.typesSelection.length < 1 || filesLoading}
                    isSpinnerActive={loading || filesLoading}
                    stepsNumber={workflowSteps.length}
                    currentStep={currentStep}
                    percent={(currentStep + 1) * 100 / workflowSteps.length}
                    next={`/createProject/`}
                    prev={`/createProject/`}
                    goPrev={() => {
                        goToPrevStep();
                    }}
                    goNext={() => {
                        if (checkIfStepIsValid(workflowSteps[currentStep].stepName)) {
                            if (workflowSteps[currentStep].stepName === 'Type') {
                                if (projectExistence.existant !== true)
                                    initProjectByPostingTypes();
                            } else if (workflowSteps[currentStep].stepName === 'Délais attendus') {
                                const delayInStore = state.delay;

                                setLoading(true);
                                postProjectDelay({ delais: delayInStore }, projectExistence.idProject).then(res => {
                                    if (res.status === 200)
                                        console.log(res.data);
                                }).finally(() => setLoading(false));
                            } else if (workflowSteps[currentStep].stepName === 'Livraison') {
                                const deliveryPlaceInStore = state.deliveryPlace;

                                setLoading(true);
                                postProjectDeliveryPlace({ livraison: deliveryPlaceInStore }, projectExistence.idProject).then(res => {
                                    if (res.status === 200)
                                        console.log(res.data);
                                }).finally(() => setLoading(false));
                            } else if (workflowSteps[currentStep].stepName === 'Description') {
                                const descriptionInStore = state.description;

                                setLoading(true);
                                postProjectDescription({ content: descriptionInStore, product: false }, projectExistence.idProject).then(res => {
                                    if (res.status === 200)
                                        console.log(res.data);
                                }).finally(() => setLoading(false));
                            } else if (workflowSteps[currentStep].stepName === 'Budget') {
                                const budgetInStore = state.budget;

                                setLoading(true);
                                postProjectBudget({ budget: budgetInStore }, projectExistence.idProject).then(res => {
                                    if (res.status === 200)
                                        console.log(res.data);
                                }).finally(() => setLoading(false));
                            } else if (workflowSteps[currentStep].stepName === 'Noms et nombre de produits') {
                                updateProductWorkFlow();
                            } else if (workflowSteps[currentStep].stepName === 'Produits') {
                                postProductDetails();
                            } else if (workflowSteps[currentStep].stepName === 'Coordonnées') {
                                const infoInStore = state.info;

                                setLoading(true);
                                postProjectInfo(infoInStore, projectExistence.idProject).then(res => {
                                    setLoading(false);
                                    
                                    if(res.status !== 200 || res.data.code === 900) {
                                        setUserInfoError(true);
                                    } else goToNextStep();
                                });
                                return;
                            } else if (workflowSteps[currentStep].stepName === 'Nom du projet') {
                                const projectNameInStore = state.projectName;

                                if (projectNameInStore) {
                                    setLoading(true);
                                    postProjectName({ title: projectNameInStore }, projectExistence.idProject).then(res => {
                                        if (res.status === 200)
                                            console.log(res.data);
                                    }).finally(() => setLoading(false));
                                }
                            } else if (workflowSteps[currentStep].stepName === 'Pays de confection') {
                                const countryOfManufactureInStore = state.productCountriesOfManufacture;

                                if (countryOfManufactureInStore) {
                                    setLoading(true);
                                    /*postProductCountryOfManufacture({ country: countryOfManufactureInStore, product: false }, projectExistence.idProject).then(res => {
                                        if (res.status === 200)
                                            console.log(res.data);
                                    });*/
                                    setLoading(false);
                                }
                            }

                            goToNextStep();
                        }
                    }}
                />
            </Layout>
        </Layout>
    );
}

export default CreateProject;