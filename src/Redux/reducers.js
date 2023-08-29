const initialState = {
  overlay: false,
  showTree: false,
  dataTreeNM: [{}],
  selectedIDTree: "",
  showCamera: false,

  userInfo: [
    {
      EMAIL: "",
      HO_TEN: "",
      MS_CN: "",
      MS_TO: "",
      NHOM_USER: "",
      SO_DTDD: "",
      TEN_DV: "",
      TEN_TO: "",
      USER_NAME: "",
      TOKEN: "",
    },
  ],
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
    case "SET_USER_INFO": {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case "SET_SHOW_CAMERA": {
      return {
        ...state,
        showCamera: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
