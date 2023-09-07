import React from "react";
import { useSelector } from "react-redux";

import SplashScreen from "./Splash";
import LoginScreen from "./LoginScreen";

const Login = ({ navigation }) => {
  const showSplash = useSelector((state) => state.showSplash);

  return showSplash ? (
    <SplashScreen />
  ) : (
    <LoginScreen navigation={navigation} />
  );
};

export default Login;
