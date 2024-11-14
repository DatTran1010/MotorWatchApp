import { StatusBar } from "react-native";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Animated, {
  BounceInRight,
  BounceInUp,
  BounceOutRight,
  FadeIn,
} from "react-native-reanimated";

import * as asyncStorageItem from "../../Common/asyncStorageItem";

import { setNotiferApp, setShowListNotification } from "../../Redux/appSlice";
import ItemNotification from "./itemNotification";

const NotifiHistory = () => {
  const dispatch = useDispatch();
  const outerViewRef = useRef(null);

  const statusBarHeight = StatusBar.currentHeight || 0;

  const showListNotification = useSelector(
    (state) => state.app.showListNotification
  );

  useEffect(() => {
    const getDataNotification = async () => {
      const reslut = await asyncStorageItem.getItem("DATA_NOTIFICATION");
      if (reslut == "") return;
      const res = JSON.parse(reslut);
      dispatch(setNotiferApp(res));
    };
    getDataNotification();
  }, []);

  // handle
  const handleBlur = (e) => {
    // Kiểm tra xem target là View màu đỏ hay View con của nó
    if (e.target === outerViewRef.current) {
      dispatch(setShowListNotification(false));
    }
  };

  //Render

  const RenderScreen = () => {
    return (
      <Animated.View
        entering={BounceInRight.duration(1000).springify()}
        exiting={BounceOutRight.duration(1000).springify()}
        ref={outerViewRef}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 999,
        }}
        onStartShouldSetResponder={handleBlur} // Cho phép sự kiện touch
        // onResponderGrant={handleBlur} // Xử lý sự kiện nhấn
      >
        <ItemNotification />
      </Animated.View>
    );
  };
  return showListNotification && <RenderScreen />;
};

export default NotifiHistory;
