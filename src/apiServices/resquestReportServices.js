import { unwrapResult } from "@reduxjs/toolkit";
import callApi from "../ConText/api";
import { fetchApiData } from "../Redux/apiSlice";

export const getDataCboReport = async (dispatch) => {
  try {
    const endpoint = "/api/motorwatch/baocao";
    const method = "GET";
    const params = null;
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

export const getDataCboDiaDiem = async (username, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/diadiem";
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

export const sendEmail = async (data, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/bcdongco";
    const method = "POST";
    const params = null;
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
