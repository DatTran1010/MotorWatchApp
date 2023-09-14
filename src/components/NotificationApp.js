import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React, { memo } from "react";
import LinearGradient from "react-native-linear-gradient";
import { useSelector, useDispatch } from "react-redux";

import colors from "../Common/colors";
import { windowHeight, windowWidth } from "../Common/dimentions";
import theme from "../Common/theme";
import FormButton from "./button";
import { setNotiferWarning } from "../Redux/appSlice";
const NotificationApp = ({ content = "Thông báo" }) => {
  const dispatch = useDispatch();
  const showModalWarning = useSelector((state) => state.app.notiferWarning);

  // handle
  const handleConfirmModal = () => {
    dispatch(setNotiferWarning({ showNotifer: false, label: "" }));
  };
  return (
    <Modal
      visible={showModalWarning.showNotifer}
      transparent={true}
      style={styles.container}
      animationType="fade"
    >
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
        <View style={[styles.modalContent]}>
          <View style={styles.iconWarning}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: "#ffca03",
                borderRadius: 25 / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: theme.fontFamily,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                !
              </Text>
            </View>
          </View>
          <View style={styles.content}>
            <Text
              style={{
                fontFamily: theme.fontFamily,
                fontSize: 16,
                fontWeight: "bold",
                color: colors.black,
              }}
            >
              {content}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontFamily: theme.fontFamily,
                color: "#736d81",
                fontSize: 14,
                marginBottom: 20,
              }}
            >
              {showModalWarning.label}
            </Text>
            <Text
              style={{
                fontFamily: theme.fontFamily,
                color: "#736d81",
                fontSize: 14,
              }}
            >
              {showModalWarning.label2}
            </Text>
          </View>

          {/* <TouchableOpacity activeOpacity={0.6} onPress={handleConfirmModal}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 0 }}
              colors={colors.colorButton}
              style={styles.buttonConfirm}
            >
              <Text
                style={{
                  fontFamily: theme.fontFamily,
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                Đồng ý
              </Text>
            </LinearGradient>
          </TouchableOpacity> */}
          <FormButton
            buttonTitle={"Đồng ý"}
            style={styles.buttonConfirm}
            activeOpacity={0.6}
            onPress={handleConfirmModal}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(NotificationApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: "#00000099",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: colors.backgroundColor,
    width: "85%",
    borderRadius: 10,
  },
  iconWarning: {
    alignItems: "center",
    paddingVertical: 25,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  buttonConfirm: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 6,
  },
});
