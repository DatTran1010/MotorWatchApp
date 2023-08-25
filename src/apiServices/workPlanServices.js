import callApi from "../ConText/api";

export const getDataWorkPlan = async (startDate, endDate, msmay, dispatch) => {
    try {
        const endpoint = "/api/motorwatch/loadkhlv";
        const method = "GET";
        const params = {
            dTNgay: startDate,
            dDNgay: endDate,
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

export const postSaveDataWorkPlan = async (msmay, datasave, dispatch) => {
    try {
        const endpoint = "/api/motorwatch/savekhlv";
        const method = "POST";
        const params = {
            msMay: msmay,
        };

        const response = await callApi(
            dispatch,
            endpoint,
            method,
            datasave,
            "",
            params
        );
        return response.status;
    } catch (error) {
        return [];
    }
};
