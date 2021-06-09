export default (state, action) => {
    switch(action.type){
        case "OBTENER_TRABAJOS":
            return {
                ...state,
                trabajos: [...action.payload]
            }
            case "AGREGAR_TRABAJO":
                return {
                    ...state,
                    trabajos: [...action.payload]
                }
        default:
            return state
    }
}