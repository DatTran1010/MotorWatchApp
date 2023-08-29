import {
  View,
  Text,
  Alert,
  PermissionsAndroid,
  Linking,
  TouchableOpacity,
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

import IconButton from "../components/IconButton";
import colors from "../Common/colors";
const Camerakit = () => {
  const refCamera = useRef(null);
  //   const requestCameraPermission = useCallback(async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: "Camera Permission",
  //           message: "App needs access to your camera",
  //           buttonNeutral: "Ask Me Later",
  //           buttonNegative: "Cancel",
  //           buttonPositive: "OK",
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log("Camera permission granted");
  //       } else {
  //         console.log("Camera permission denied");
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     requestCameraPermission();
  //   }, []);

  const [isCameraOpen, setIsCameraOpen] = useState(false);

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

  return (
    <View style={{ flex: 1 }}>
      {isCameraOpen ? (
        <Camera
          ref={refCamera}
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
          onReadCode={(event) => {
            valueScaned.current.value = event.nativeEvent.codeStringValue;
            setIsCameraOpen(false);
          }} // optional
          showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
          laserColor="red" // (default red) optional, color of laser in scanner frame
          frameColor="white" // (default white) optional, color of border of scanner frame
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Text>{valueScaned.current.value}</Text>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.backgroundColor,
                borderColor: colors.primary,
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setIsCameraOpen(true);
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: colors.primary,
                }}
              >
                Scan QR Code
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: colors.white,
                }}
              >
                Scan Camera
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <CameraFrame />
      </View> */}
    </View>
  );
};

export default Camerakit;
