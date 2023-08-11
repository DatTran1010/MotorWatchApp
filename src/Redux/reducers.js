const initialState = {
    overlay: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_OVERLAY":
            return {
                ...state,
                overlay: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
