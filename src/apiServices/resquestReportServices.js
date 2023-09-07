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

export const getDataCboDiaDiem = async (username, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/diadiem";
    const method = "GET";
    const params = {
      UserName: username,
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

export const sendEmail = async (data, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/bcdongco";
    const method = "POST";
    const params = null;

    const response = await callApi(
      dispatch,
      endpoint,
      method,
      data,
      "",
      params
    );

    return response.data;
  } catch (error) {
    return [];
  }
};
