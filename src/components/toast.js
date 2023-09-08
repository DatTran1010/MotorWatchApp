import { View, Text, Alert } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Animated, {
  FadeInUp,
  BounceInUp,
  BounceOutUp,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withRepeat,
  Easing,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import IconButton from "./IconButton";
import colors from "../Common/colors";
import theme from "../Common/theme";
import { windowWidth } from "../Common/dimentions";

const ToastNotification = () => {
  const dispatch = useDispatch();
  const toastContainer = useSelector((state) => state.toastContainer);
  // useEffect(() => {
  //   if (toastContainer.showToast) {
  //     const timer = setTimeout(() => {
  //       dispatch({
  //         type: "SET_SHOW_TOAST",
  //         payload: {
  //           showToast: false,
  //           title: "Thông báo",
  //           body: "",
  //         },
  //       });
  //     }, 2000);

  //     // Hủy bỏ timer nếu component unmount trước khi 5 giây
  //     return () => clearTimeout(timer);
  //   }
  // }, [toastContainer.showToast]);

  const typeToast = () => {
    try {
      switch (toastContainer.type) {
        case "info": {
          return {
            iconName: "information-circle",
            color: colors.info,
            backgroundColor: colors.white,
          };
        }
        case "error": {
          return {
            iconName: "alert-circle-outline",
            color: colors.error,
            backgroundColor: "#ffebe6",
          };
        }
        case "success": {
          return {
            iconName: "checkmark-circle-sharp",
            color: colors.success,
            backgroundColor: "#e3fcef",
          };
        }
        case "warning": {
          return {
            iconName: "warning",
            color: colors.warning,
            backgroundColor: "#fffae6",
          };
        }
        default: {
          return {
            iconName: "warning",
            color: colors.warning,
          };
        }
      }
    } catch {
      return {
        iconName: "alert-circle-outline",
        color: colors.error,
      };
    }
  };
  //handle
  const handleCloseToast = () => {
    dispatch({
      type: "SET_SHOW_TOAST",
      payload: {
        showToast: false,
        title: "Thông báo",
        body: "",
      },
    });
  };

  //kéo thả toast
  const translateY = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startY = translateY.value;
      // console.log("Kéo bắt đầu");
    },
    onActive: (event, context) => {
      context.startY = event.translationY;
      // console.log(event.translationY);
      translateY.value = event.translationY;
      // console.log("Kéo đang diễn ra");
    },
    onEnd: (event, context) => {
      // console.log(context.startY);
      if (context.startY <= -40) {
        runOnJS(handleCloseToast)();
      } else {
        translateY.value = withSpring(0);
      }

      // console.log("Kéo kết thúc");
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  // processBar toast
  const widthProcess = useSharedValue(0); // Giá trị width ban đầu là 0
  const duration = 2000; // Thời gian chạy tính bằng mili giây (5 giây)

  useEffect(() => {
    widthProcess.value = 0;
    widthProcess.value = withRepeat(
      withTiming(
        100,
        { duration: duration, easing: Easing.linear },
        (finished) => {
          if (finished) {
            runOnJS(handleCloseToast)();
          }
        }
      ),
      1, // -1 để lặp vô hạn
      false // true để chuyển đổi giá trị ngược lại sau mỗi lần lặp
    );
  }, [toastContainer.showToast]);

  const animatedProcessStyle = useAnimatedStyle(() => {
    return {
      width: `${widthProcess.value}%`,
    };
  });

  const RenderToast = () => {
    return (
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          entering={BounceInUp.duration(1000)}
          exiting={BounceOutUp.duration(1000)}
          style={[
            rStyle,
            theme.shadow,
            {
              top: 50,
              backgroundColor: typeToast().color,
              width: windowWidth - 40,
              borderRadius: 5,
              position: "absolute",
              left: 20,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              zIndex: 999,
            },
          ]}
        >
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingHorizontal: 8,
              paddingVertical: 12,
            }}
          >
            <IconButton
              nameicon={typeToast().iconName}
              border={false}
              size={25}
              colorIcon={colors.white}
            />
          </View>

          <View
            style={{
              backgroundColor: typeToast().backgroundColor,
              height: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              paddingHorizontal: 8,
              paddingVertical: 12,
            }}
          >
            <View
              style={{
                marginRight: 20,
              }}
            >
              <Text
                style={[
                  theme.font,
                  {
                    fontSize: 14,
                    color: typeToast().color,
                    fontWeight: "bold",
                    marginBottom: 10,
                  },
                ]}
              >
                {toastContainer.title}
              </Text>
              <Text
                style={[
                  theme.font,
                  { color: typeToast().color, fontWeight: "400" },
                ]}
              >
                {toastContainer.body}
              </Text>
            </View>
            <View
              style={{
                right: 0,
                top: 0,
                position: "absolute",
              }}
            >
              <IconButton
                nameicon={"close-outline"}
                border={false}
                size={25}
                colorIcon={typeToast().color}
                onPress={handleCloseToast}
              />
            </View>
          </View>
          <Animated.View
            style={[
              {
                height: 8,
                backgroundColor: typeToast().color,
                position: "absolute",
                bottom: 0,
                borderBottomLeftRadius: 5,
              },
              ,
              animatedProcessStyle,
            ]}
          ></Animated.View>
        </Animated.View>
      </PanGestureHandler>
    );
  };
  return toastContainer.showToast && <RenderToast />;
};

export default ToastNotification;
