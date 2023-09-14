import { unwrapResult } from "@reduxjs/toolkit";
import callApi from "../ConText/api";
import { fetchApiData } from "../Redux/apiSlice";

export const getDataBieuDo = async (dispatch, sdk) => {
  try {
    const endpoint = "/api/motorwatch/bieudo2";
    const method = "GET";
    const params = {
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

export const getCboTinhTrang = async (dispatch) => {
  try {
    const endpoint = "/api/motorwatch/tinhtrangdc";
    const method = "GET";
    const params = null;

    // Gọi API và xử lý kết quả
    const response = await dispatch(fetchApiData({ endpoint, method }));
    return unwrapResult(response);
  } catch (error) {
    return [];
  }
};

export const getCboTinhTrangLoi = async (dispatch) => {
  try {
    const endpoint = "/api/motorwatch/tinhtrangloi";
    const method = "GET";
    const params = null;

    // Gọi API và xử lý kết quả
    const response = await dispatch(fetchApiData({ endpoint, method }));
    return unwrapResult(response);
  } catch (error) {
    return [];
  }
};

export const getDataDetails = async (dispatch, iTT, sLOI, sdk) => {
  try {
    const endpoint = "/api/motorwatch/databieudo2";
    const method = "GET";
    const params = {
      iTT: iTT,
      sLOI: sLOI,
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
    return [];
  }
};
