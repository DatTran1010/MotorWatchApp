import axios from "axios";

const callApi = async (
    dispatch,
    endpoint,
    method,
    data = null,
    token = "",
    params = null
) => {
    try {
        dispatch({ type: "SET_OVERLAY", payload: true });
        const response = await axios.request({
            baseURL: "http://192.168.1.130:7174/",
            timeout: 5000,
            url: endpoint,
            method: method,
            data: data,
            params: params,
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status == 200) {
            dispatch({ type: "SET_OVERLAY", payload: false });
        }
        return response;
    } catch (error) {
        dispatch({ type: "SET_OVERLAY", payload: false });
        // throw new Error(error.message);
        return error;
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
