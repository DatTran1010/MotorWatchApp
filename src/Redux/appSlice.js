import { createSlice } from "@reduxjs/toolkit";

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
  showListNotification: false,
  notiferApp: [],
  heightHeaderNav: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOverlay: (state, action) => {
      state.overlay = action.payload;
    },
    setShowToast: (state, action) => {
      state.toastContainer = action.payload;
    },
    setShowSplash: (state, action) => {
      state.showSplash = action.payload;
    },
    setShowTree: (state, action) => {
      state.showTree = action.payload;
    },
    setDataTree: (state, action) => {
      state.dataTreeNM = action.payload;
    },
    setSelectedIDTree: (state, action) => {
      state.selectedIDTree = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setShowCamera: (state, action) => {
      state.showCamera = action.payload;
    },
    setShowModalCamera: (state, action) => {
      state.showResultCamera = action.payload;
    },
    setResultScanned: (state, action) => {
      state.resultScanned = action.payload;
    },
    setBaseURL: (state, action) => {
      state.baseURL = action.payload;
    },
    setNotiferWarning: (state, action) => {
      state.notiferWarning = action.payload;
    },
    setShowListNotification: (state, action) => {
      state.showListNotification = action.payload;
    },
    setNotiferApp: (state, action) => {
      state.notiferApp = action.payload;
    },
    setHeightHeaderNavigation: (state, action) => {
      state.heightHeaderNav = action.payload;
    },
  },
});

export const {
  setOverlay,
  setShowToast,
  setShowSplash,
  setShowTree,
  setDataTree,
  setSelectedIDTree,
  setUserInfo,
  setShowCamera,
  setShowModalCamera,
  setResultScanned,
  setBaseURL,
  setNotiferWarning,
  setShowListNotification,
  setNotiferApp,
  setHeightHeaderNavigation,
} = appSlice.actions;

export default appSlice.reducer;
