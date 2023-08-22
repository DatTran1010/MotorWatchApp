const initialState = {
  overlay: false,
  showTree: false,
  dataTreeNM: [{}],
  selectedIDTree: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OVERLAY":
      return {
        ...state,
        overlay: action.payload,
      };
    case "SET_SHOW_TREE":
      return {
        ...state,
        showTree: action.payload,
      };
    case "SET_DATA_TREE": {
      return {
        ...state,
        dataTreeNM: action.payload,
      };
    }
    case "SET_ID_TREE": {
      return {
        ...state,
        selectedIDTree: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
