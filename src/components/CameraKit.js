import {
  View,
  Text,
  Alert,
  PermissionsAndroid,
  Linking,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useEffect, useCallback, useState, useRef } from "react";
import {
  Camera,
  CameraScreen,
  CameraType,
  CameraApi,
  Orientation,
} from "react-native-camera-kit";
import { Svg, Defs, Rect, Mask } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "./IconButton";
import colors from "../Common/colors";
import { windowHeight, windowWidth } from "../Common/dimentions";

const CameraKit = ({}) => {
  const dispatch = useDispatch();
  const isShowCamera = useSelector((state) => state.showCamera);

  const [toggleFlash, setToggleFlash] = useState(false);
  const valueScaned = useRef({ value: "" });
  const CameraFrame = () => {
    return (
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />

            <Rect x="14%" y="30%" width="260" height="180" fill="black" />
          </Mask>
        </Defs>

        <Rect
          height="100%"
          width="100%"
          fill="rgba(0, 0, 0, 0.5)"
          mask="url(#mask)"
        />

        {/* Frame border */}

        {/* <Rect
          x="18%"
          y="30%"
          width="250"
          height="250"
          strokeWidth="5"
          stroke="#fff"
          fill="transparent"
        /> */}
      </Svg>
    );
  };

  const handleCloseCamera = () => {
    dispatch({ type: "SET_SHOW_CAMERA", payload: false });
  };

  // When the components mounts

  const scanQRCode = (event) => {
    try {
      if (valueScaned.current.value === "") {
        valueScaned.current.value = event.nativeEvent.codeStringValue;
      }
    } catch (error) {}
  };

  const CameraRender = () => {
    return (
      <View
        style={{
          backgroundColor: "red",
          flex: 1,
          position: "absolute",
          backgroundColor: "red",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Camera
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          // Barcode props
          scanBarcode={true}
          onReadCode={(event) => scanQRCode(event)} // optional
          showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
          laserColor="red" // (default red) optional, color of laser in scanner frame
          frameColor="white" // (default white) optional, color of border of scanner frame
          torchMode={toggleFlash ? "on" : "off"}
          flashMode={toggleFlash ? "on" : "off"}
        />
        <View style={styles.headerContent}>
          <View>
            <IconButton
              nameicon={"arrow-back-outline"}
              border={false}
              size={25}
              colorIcon={colors.white}
              onPress={handleCloseCamera}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: colors.white,
                fontWeight: "bold",
              }}
            >
              Quét mã QR
            </Text>
          </View>
          <View>
            <IconButton
              nameicon={"flash-outline"}
              border={false}
              size={25}
              colorIcon={colors.white}
              onPress={() => {
                setToggleFlash((current) => !current);
              }}
            />
          </View>
        </View>
        <View style={styles.bodyContent}>
          <Text
            style={{
              fontSize: 14,
              color: colors.white,
              fontWeight: "300",
            }}
          >
            Quét mã QR để chuyển hướng đến dữ liệu
          </Text>
        </View>
        <View style={styles.footerContent}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                nameicon={"images-outline"}
                border={false}
                colorIcon={colors.white}
                size={20}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: colors.white,
                  fontWeight: "400",
                  textDecorationLine: "underline",
                }}
              >
                Chọn ảnh trong máy
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                nameicon={"link-outline"}
                border={false}
                colorIcon={colors.white}
                size={20}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: colors.white,
                  fontWeight: "400",
                  textDecorationLine: "underline",
                }}
              >
                Nhập bằng tay
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return isShowCamera && <CameraRender />;
};

export default CameraKit;

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  bodyContent: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  footerContent: {
    bottom: windowWidth / 2,
    right: 0,
    left: 0,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
