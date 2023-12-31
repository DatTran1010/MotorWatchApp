import { unwrapResult } from "@reduxjs/toolkit";
import callApi from "../ConText/api";
import { fetchApiData } from "../Redux/apiSlice";

export const getDataComBoMay = async (userName, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/cbomay";
    const method = "GET";
    const params = {
      Username: userName,
    };
    const data = null;
    const token = "";

    // Gọi API và xử lý kết quả
    const response = await dispatch(
      fetchApiData({ endpoint, method, data, token, params })
    );
    // Xử lý kết quả đăng nhập
    return unwrapResult(response);
  } catch (error) {
    // Xử lý lỗi nếu có
    return [];
  }
};

export const getDataComBoDongCo = async (msmay, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/cbodongco";
    const method = "GET";
    const params = {
      MsMay: msmay,
    };
    const data = null;
    const token = "";

    // Gọi API và xử lý kết quả
    const response = await dispatch(
      fetchApiData({ endpoint, method, data, token, params })
    );
    // Xử lý kết quả đăng nhập
    return unwrapResult(response);
  } catch (error) {
    // Xử lý lỗi nếu có
    return [];
  }
};

export const getDataTreeNhaMay = async (username, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/treeNhaMay";
    const method = "GET";
    const params = {
      UserName: username,
    };
    const data = null;
    const token = "";

    // Gọi API và xử lý kết quả
    const response = await dispatch(
      fetchApiData({ endpoint, method, data, token, params })
    );
    // Xử lý kết quả đăng nhập
    return unwrapResult(response);
  } catch (error) {
    // Xử lý lỗi nếu có
    return [];
  }
};
