export default function appReducer(state = [], action) {
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
                ...action.payLoad
            }
        default:
            return state
    }
}