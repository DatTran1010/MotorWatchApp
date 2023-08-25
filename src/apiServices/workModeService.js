import callApi from "../ConText/api";

export const getDataWorkMode = async (msmay, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/loadcdlv";
    const method = "GET";
    const params = {
      msmay: msmay,
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

export const postSubmitDataWorkMode = async (msMay, dispatch, datasave) => {
  try {
    const endpoint = "/api/motorwatch/savecdlv";
    const method = "POST";
    const params = {
      msMay: msMay,
    };

    const response = await callApi(
      dispatch,
      endpoint,
      method,
      datasave,
      "",
      params
    );

    return response;
  } catch (error) {
    return error;
  }
};
