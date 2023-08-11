import React, { createContext, useState } from "react";
const init = {
    initModalVisibleUser: false,
    initVisibleCadelar: false,
    overLay: false,
    token: "",
};

export const MainConText = createContext({});

const ConTextProvider = ({ children }) => {
    const [modalVisibleUser, setModalVisibleUser] = useState(
        init.initModalVisibleUser
    );

    const [visibleCadelar, setVisiblecadelar] = useState(
        init.initVisibleCadelar
    );

    const [token, setToken] = useState(init.token);

    const [userModel, setUserModel] = useState({
        token: "",
        employeeCode: "",
        res: 0,
        avatar: "",
        fullName: "",
        startDate: "",
        department: "",
        group: "",
        position: "",
        positionCategory: 0,
        totalRequestPending: 0,
        email: "",
        employeeId: 0,
    });

    const [overLay, setOverLay] = useState(init.overLay);

    return (
        <MainConText.Provider
            value={{
                modalVisibleUser,
                setModalVisibleUser,
                visibleCadelar,
                setVisiblecadelar,
                token,
                setToken,
                userModel,
                setUserModel,
                overLay,
                setOverLay,
            }}
        >
            {children}
        </MainConText.Provider>
    );
};

export default ConTextProvider;
