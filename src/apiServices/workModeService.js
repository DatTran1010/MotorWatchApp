import { unwrapResult } from "@reduxjs/toolkit";
import callApi from "../ConText/api";
import { fetchApiData } from "../Redux/apiSlice";

export const getDataWorkMode = async (msmay, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/loadcdlv";
    const method = "GET";
    const params = {
      msmay: msmay,
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

export const postSubmitDataWorkMode = async (msMay, dispatch, datasave) => {
  try {
    const endpoint = "/api/motorwatch/savecdlv";
    const method = "POST";
    const params = {
      msMay: msMay,
    };
    const data = datasave;
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
