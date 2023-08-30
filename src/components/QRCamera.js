import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { Svg, Defs, Rect, Mask } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { QRreader } from "react-native-qr-decode-image-camera";

import { windowWidth, windowHeight } from "../Common/dimentions";
import colors from "../Common/colors";
import IconButton from "./IconButton";
import ModalCamera from "./ModalCamera";

const QRCamera = () => {
  const dispatch = useDispatch();

  const [showFlash, setShowFlash] = useState(false);
  const isShowCamera = useSelector((state) => state.showCamera);

  const handleOpenFlash = () => {
    setShowFlash(!showFlash);
  };

  const scanQRCode = (imagePath) => {
    // Tạo một ref để truy cập vào thư viện quét mã QR
    const scannerRef = React.createRef();
    return (
      <View>
        {/* Render thư viện quét mã QR */}
        <QRCodeScanner
          ref={scannerRef}
          onRead={(event) => {
            // Lưu dữ liệu mã QR đã quét
            setScannedQRData(event.data);
          }}
        />
      </View>
    );
  };
  //#region  handle

  const handleChooseImageLib = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperToolbarTitle: "Chỉnh sửa ảnh",
      cropperStatusBarColor: colors.primarySecond,
    }).then((image) => {
      // console.log(image);

      QRreader(image.path)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleCloseCamera = () => {
    dispatch({ type: "SET_SHOW_CAMERA", payload: false });
  };

  const handleReadQRCode = (e) => {
    dispatch({ type: "SET_SHOW_MODAL_CAMERA", payload: true });
    dispatch({ type: "SET_RESULT_SCANNED", payload: e.data.trim() });
  };

  const handleOpenModalURL = () => {
    dispatch({ type: "SET_SHOW_MODAL_CAMERA", payload: true });
  };

  //#endregion
  const CameraFrame = () => {
    return (
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />

            <Rect x="15%" y="34%" width="250" height="250" fill="black" />
          </Mask>
        </Defs>

        <Rect
          height="100%"
          width="100%"
          fill="rgba(0, 0, 0, 0.5)"
          mask="url(#mask)"
        />

        {/* Frame border */}

        <Rect
          x="15%"
          y="34%"
          width="250"
          height="250"
          strokeWidth="1"
          stroke="#fff"
          fill="transparent"
        />
      </Svg>
    );
  };

  //rederCamera
  const RenderCamera = () => {
    return (
      <>
        <View>
          <QRCodeScanner
            onRead={handleReadQRCode}
            flashMode={
              showFlash
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
            reactivate={true}
            reactivateTimeout={1000}
            cameraStyle={{
              position: "relative",
              width: windowWidth,
              height: windowHeight,
            }}
            // showMarker={true}
            markerStyle={{
              borderWidth: 0,
            }}
            fadeIn={false}
          />
          <CameraFrame />
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
                onPress={handleOpenFlash}
              />
            </View>
          </View>
          <View style={styles.bodyContent}>
            <Text
              style={{
                fontSize: 14,
                color: colors.white,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Quét mã QR để chuyển hướng đến dữ liệu
            </Text>
          </View>
          <View style={styles.footerContent}>
            <TouchableOpacity onPress={handleChooseImageLib}>
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
            <TouchableOpacity onPress={handleOpenModalURL}>
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
        <ModalCamera />
      </>
    );
  };

  return isShowCamera && <RenderCamera />;
};

export default QRCamera;
const styles = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    left: 0,
    right: 0,
    padding: 10,
    justifyContent: "space-between",
    position: "absolute",
  },
  bodyContent: {
    position: "absolute",
    top: 100,
    justifyContent: "center",
    left: 0,
    right: 0,
  },
  footerContent: {
    bottom: windowWidth / 2 - 50,
    right: 0,
    left: 0,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
  },
});
