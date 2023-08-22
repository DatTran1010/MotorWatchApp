import axios, { CancelToken } from "axios";
import Toast from "react-native-toast-message";

const callApi = async (
  dispatch,
  endpoint,
  method,
  data = null,
  token = "",
  params = null
) => {
  try {
    const source = CancelToken.source();

    // Đặt thời gian chờ là 5 giây
    const timeout = setTimeout(() => {
      source.cancel("Request canceled due to timeout");
    }, 5000);

    dispatch({ type: "SET_OVERLAY", payload: true });
    const response = await axios.request({
      baseURL: "http://27.74.240.29/apiPDM/",
      timeout: 5000,
      url: endpoint,
      method: method,
      data: data,
      params: params,
      headers: { Authorization: `Bearer ${token}` },
      cancelToken: source.token,
      // signal: AbortSignal.timeout(5000),
    });

    clearTimeout(timeout); // Xóa timeout khi request thành công

    if (response.status == 200) {
      dispatch({ type: "SET_OVERLAY", payload: false });
      return response;
    } else {
      dispatch({ type: "SET_OVERLAY", payload: false });
      Toast.show({
        type: "error",
        text1: "Thông báo",
        text2: "Error",
      });
      return [];
    }
  } catch (error) {
    const errorFields = Object.keys(error.response.data.errors);

    // Truy cập giá trị lỗi của từng trường
    errorFields.forEach((fieldName) => {
      const errorText = error.response.data.errors[fieldName][0];
      Toast.show({
        type: "error",
        text1: "Thông báo",
        text2: errorText,
      });
    });
    // console.log(error.response.data.errors);

    dispatch({ type: "SET_OVERLAY", payload: false });
    // throw new Error(error.message);
    return [];
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
