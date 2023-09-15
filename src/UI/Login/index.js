import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SplashScreen from "./Splash";
import LoginScreen from "./LoginScreen";
import * as asyncStorageItem from "../../Common/asyncStorageItem";
import { setDataSaveUser } from "../../Redux/appSlice";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const showSplash = useSelector((state) => state.app.showSplash);

  useEffect(() => {
    const getDataRememberMe = async () => {
      const dataSaveUser = await asyncStorageItem.getItem("SAVE_USER");
      if (dataSaveUser != "") {
        const arrayData = JSON.parse(dataSaveUser);
        dispatch(setDataSaveUser(arrayData));
      }
    };
    getDataRememberMe();
  }, []);

  return showSplash ? (
    <SplashScreen />
  ) : (
    <LoginScreen navigation={navigation} />
  );
};

export default Login;
