const initialState = {
    projectId: "",
    products: {},
    workflow: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'updateProjectId':
            return { ...state, projectId: action.payload }
        case 'updateProducts':
            return { ...state, products: action.payload }
        case 'updateWorkflow':
            return { ...state, workflow: action.payload }
        default:
            return state
    }
}

export default rootReducer