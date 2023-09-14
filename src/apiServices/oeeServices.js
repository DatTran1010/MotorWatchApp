import { unwrapResult } from "@reduxjs/toolkit";
import { fetchApiData } from "../Redux/apiSlice";

export const getDataBieuDo = async (dispatch, dTngay, dDngay, sdk) => {
  try {
    const endpoint = "/api/motorwatch/bieudo3";
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
    return unwrapResult(response);
  } catch (error) {
    // Xử lý lỗi nếu có
    return [];
  }
};

export const getCboTinhTrangDC = async (dispatch) => {
  try {
    const endpoint = "/api/motorwatch/tinhtrangdc";
    const method = "GET";
    const params = null;

    const data = null;
    const token = "";

    // Gọi API và xử lý kết quả
    const response = await dispatch(
      fetchApiData({ endpoint, method, data, token, params })
    );
    return unwrapResult(response);
  } catch (error) {
    // Xử lý lỗi nếu có
    return [];
  }
};

export const getDataDetails = async (dispatch, dNgay, iITOEE, sdk) => {
  try {
    const endpoint = "/api/motorwatch/databieudo3";
    const method = "GET";
    const params = {
      dNgay: dNgay,
      iITOEE: iITOEE,
      sdk: sdk,
    };
    const data = null;
    const token = "";

    // Gọi API và xử lý kết quả
    const response = await dispatch(
      fetchApiData({ endpoint, method, data, token, params })
    );
    return unwrapResult(response);
  } catch (error) {
    // Xử lý lỗi nếu có
    return [];
  }
};
