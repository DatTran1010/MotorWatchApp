import React, { useEffect, useContext, memo } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, Modal } from "react-native";

import colors from "../../Common/colors";
import { MainConText } from "../../ConText/MainContext";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  Easing,
  useSharedValue,
  withRepeat,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const HeaderApp = ({
  navigation,
  title,
  headerLeftVisible,
  goBack = false,
}) => {
  const { setModalVisibleUser } = useContext(MainConText);
  const handleInfo = () => {
    return setModalVisibleUser(true);
  };

  const GradientHeader = () => {
    const translateX = useSharedValue(-1); // Giá trị ban đầu ngoài vùng nhìn thấy

    // Bắt đầu animation
    React.useEffect(() => {
      const interval = setInterval(() => {
        translateX.value = withRepeat(
          withSpring(1, { damping: 1, stiffness: 90, duration: 5000 }),
          -1,
          false
        );
        clearInterval(interval); // Dừng interval sau khi animation thực hiện 1 lần
      }, 5000);
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value * 250 }],
      };
    });

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 0 }}
        colors={colors.colorHeader}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 100,
              height: "100%",
            },
            animatedStyle,
          ]}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["rgba(94, 135, 233, 0.1)", "rgba(181, 200, 245, 0.3)"]}
            style={{ flex: 1, opacity: 1 }}
          />
        </Animated.View>
      </LinearGradient>
    );
  };
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        position: "absolute",
        top: 0,
        left: 0,
      },

      headerLeft: () =>
        headerLeftVisible &&
        (goBack ? (
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color={colors.white}
            style={{ marginLeft: 15 }}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Ionicons
            name="reorder-three"
            size={40}
            color={colors.white}
            style={{ marginRight: 15 }}
            onPress={() => navigation.openDrawer()}
          />
        )),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="notifications"
            size={30}
            color={colors.white}
            style={{ marginRight: 15 }}
            onPress={() => {}}
          />
          <Ionicons
            name="person-circle-outline"
            size={30}
            color={colors.white}
            style={{ marginRight: 15 }}
            onPress={handleInfo}
          />
        </View>
      ),
      headerStyle: { backgroundColor: colors.primary },
      headerBackground: () => <GradientHeader />,
    });
  }, [navigation]);
  return null;
};

export default memo(HeaderApp);
