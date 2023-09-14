import { unwrapResult } from "@reduxjs/toolkit";
import { fetchApiData } from "../Redux/apiSlice";

export const login = async (dispatch, username, password, tokenDevies) => {
  try {
    const endpoint = "/api/account/login";
    const method = "POST";
    const data = {
      employeeCode: username,
      password: password,
      token: tokenDevies,
    };

    // Gọi API và xử lý kết quả
    const response = await dispatch(fetchApiData({ endpoint, method, data }));
    // Xử lý kết quả đăng nhập
    return unwrapResult(response);
  } catch (error) {
    // Xử lý lỗi nếu có
    return [];
  }
};
