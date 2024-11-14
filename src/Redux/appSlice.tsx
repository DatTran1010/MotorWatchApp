import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
  baseURL : string,
  showSplash:boolean,
  overlay: boolean,
  toastContainer : {
    showToast : boolean,
    type: string,
    title : string,
    body : string
  }
  showTree : boolean,
  dataTreeNM: [],
  selectedIDTree: number | string,
  showCamera: boolean,
  showResultCamera: boolean,
  resultScanned: string,
  userInfo: [
    {
      EMAIL: string,
      HO_TEN: string,
      MS_CN: string,
      MS_TO: string,
      NHOM_USER: string,
      SO_DTDD: string,
      TEN_DV: string,
      TEN_TO: string,
      USER_NAME: string,
      TOKEN: string,
      MS_DV: string,
    },
  ],
  notiferWarning: {
    showNotifer: boolean,
    label: string,
    label2: string,
  },
  showListNotification: boolean,
  notiferApp: [],
  heightHeaderNav: number,
  dataSaveUser: [
    {
      check: boolean,
      username: string,
      password: string,
    },
  ],
}


const initialState : InitialState = {
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
  dataTreeNM: [],
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
  dataSaveUser: [
    {
      check: false,
      username: "",
      password: "",
    },
  ],
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
    setDataSaveUser: (state, action) => {
      state.dataSaveUser = action.payload;
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
  setDataSaveUser,
} = appSlice.actions;

export default appSlice.reducer;
