import axios, { CancelToken } from "axios";
import Toast from "react-native-toast-message";
import * as asyncStorageItem from "../Common/asyncStorageItem";

const callApi = async (
  endpoint,
  method,
  data = null,
  token = "",
  params = null
) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  try {
    const baseURL = await asyncStorageItem.baseURL();

    const response = await axios.request({
      baseURL: baseURL,
      timeout: 5000,
      url: endpoint,
      method: method,
      data: data,
      params: params,
      headers: { Authorization: `Bearer ${token}` },
      cancelToken: source.token,
      // signal: AbortSignal.timeout(5000),
    });

    console.log("URL là", response.request.responseURL);

    if (response.status == 200) {
      return response;
    } else if (response.status == 204) {
      console.log("Log 204", response);

      return new Error("204");
    } else {
      return [];
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      console.log("Lỗi", error.response);
    }

    source.cancel("Request canceled due to timeout");
    const errorFields = error.response.data.errors;
    if (errorFields === undefined) {
      throw error.message;
    } else {
      const errorMessage = errorFields[Object.keys(errorFields)[0]][0];
      throw errorMessage;
    }
  }
};

// const callApi = async (endpoint, params, method = "GET", data = null) => {
//     try {
//         await axios
//             .post("http://192.168.1.130:7174/api/account/login", {
//                 employeeCode: "0003",
//                 password: "123",
//                 token: "string",
//             })
//             .then((respon) => {
//                 console.log(respon);
//             });
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

export default callApi;
