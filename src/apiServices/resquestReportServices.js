import callApi from "../ConText/api";

export const getDataCboReport = async (dispatch) => {
  try {
    const endpoint = "/api/motorwatch/baocao";
    const method = "GET";
    const params = null;

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
