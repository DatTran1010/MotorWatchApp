import callApi from "../ConText/api";

export const getDataComBoMay = async (userName, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/cbomay";
    const method = "GET";
    const params = {
      Username: userName,
    };

    const response = await callApi(
      dispatch,
      endpoint,
      method,
      null,
      "",
      params
    );

    return response.data;
  } catch (error) {
    return [];
  }
};
