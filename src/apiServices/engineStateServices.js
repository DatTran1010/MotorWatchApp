import callApi from "../ConText/api";

export const getCboTinhTrang = async (dispatch) => {
  try {
    const endpoint = "/api/motorwatch/tinhtrangdc";
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

export const getCboTinhTrangLoi = async (dispatch) => {
  try {
    const endpoint = "/api/motorwatch/tinhtrangloi";
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
