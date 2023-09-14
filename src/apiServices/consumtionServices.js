import { unwrapResult } from "@reduxjs/toolkit";
import { fetchApiData } from "../Redux/apiSlice";

export const getData = async (dispatch, dTngay, dDngay, sdk) => {
  try {
    const endpoint = "/api/motorwatch/bieudo1";
    const method = "GET";
    const params = {
      dTngay: dTngay,
      dDngay: dDngay,
      sdk: sdk,
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

export const getDetailData = async (dispatch, dNgay, sdk) => {
  try {
    const endpoint = "/api/motorwatch/databieudo1";
    const method = "GET";
    const params = {
      dNgay: dNgay,
      sdk: sdk,
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
