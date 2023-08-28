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

export const getDataComBoDongCo = async (msmay, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/cbodongco";
    const method = "GET";
    const params = {
      MsMay: msmay,
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

export const getDataTreeNhaMay = async (username, dispatch) => {
  try {
    const endpoint = "/api/motorwatch/treeNhaMay";
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
    return response;
  } catch (error) {
    return [];
  }
};
