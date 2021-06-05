export default (state, action) => {
    switch(action.type){
        case "OBTENER_PROYECTOS":
            return {
                ...state,
                proyectos: [...action.payload]
            }
        default:
            return state
    }
}