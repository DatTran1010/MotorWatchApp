import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
} from "react-native";
import React, { memo } from "react";

import colors from "../Common/colors";
import theme from "../Common/theme";
const ModalQuestion = ({ onClose, content = "", label = "", onConfirm }) => {
  const handleBlur = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal transparent={true} style={styles.container} animationType="fade">
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={handleBlur}
      >
        <View style={[styles.modalContent]}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>{content}</Text>
            <View style={styles.divider}></View>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.bodyText}>{label}</Text>
          </View>
          <View style={styles.modalFooter}>
            <View style={styles.divider}></View>
            <View style={{ flexDirection: "row-reverse", margin: 10 }}>
              <TouchableOpacity
                style={{ ...styles.actions, backgroundColor: "#db2828" }}
                onPress={() => onClose()}
              >
                <Text style={styles.actionText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.actions, backgroundColor: "#21ba45" }}
                onPress={() => onConfirm()}
              >
                <Text style={styles.actionText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(ModalQuestion);

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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "relative",
  },
  modalContent: {
    backgroundColor: colors.backgroundColor,
    width: "90%",
    borderRadius: 4,
  },
  modalHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 15,
    color: "#000",
    fontFamily: theme.fontFamily,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
  modalBody: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalFooter: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    color: colors.white,
  },
});
