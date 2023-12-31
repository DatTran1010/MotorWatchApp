import { unwrapResult } from "@reduxjs/toolkit";
import callApi from "../ConText/api";
import { fetchApiData } from "../Redux/apiSlice";

export const getDataWorkPlan = async (startDate, endDate, msmay, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/loadkhlv";
    const method = "GET";
    const params = {
      dTNgay: startDate,
      dDNgay: endDate,
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

export const postSaveDataWorkPlan = async (msmay, datasave, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/savekhlv";
    const method = "POST";
    const params = {
      msMay: msmay,
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
