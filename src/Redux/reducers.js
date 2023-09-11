const initialState = {
  baseURL: "",
  showSplash: true,
  overlay: false,
  toastContainer: {
    showToast: false,
    type: "info",
    title: "Thông báo",
    body: "",
  },
  showTree: false,
  dataTreeNM: [{}],
  selectedIDTree: "-1",
  showCamera: false,
  showResultCamera: false,
  resultScanned: "",
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
      MS_DV: "",
    },
  ],

  notiferWarning: {
    showNotifer: false,
    label: "",
    label2: "",
  },
  showListNotifer: false,
  notiferApp: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OVERLAY":
      return {
        ...state,
        overlay: action.payload,
      };
    case "SET_SHOW_TOAST": {
      return {
        ...state,
        toastContainer: action.payload,
      };
    }
    case "SET_SHOW_SPLASH": {
      return {
        ...state,
        showSplash: action.payload,
      };
    }
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
    case "SET_SHOW_MODAL_CAMERA": {
      return {
        ...state,
        showResultCamera: action.payload,
      };
    }
    case "SET_RESULT_SCANNED": {
      return {
        ...state,
        resultScanned: action.payload,
      };
    }
    case "SET_BASE_URL": {
      return {
        ...state,
        baseURL: action.payload,
      };
    }
    case "SET_NOTIFER_WARNING": {
      return {
        ...state,
        notiferWarning: action.payload,
      };
    }
    case "SET_SHOW_LIST_NOTIFER": {
      return {
        ...state,
        showListNotifer: action.payload,
      };
    }
    case "SET_NOTIFER_APP": {
      return {
        ...state,
        notiferApp: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
