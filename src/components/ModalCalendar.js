import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import colors from "../Common/colors";

const ModalCalendar = () => {
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      style={styles.container}
    >
      <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
        <View
          style={{
            flex: 1,
            height: 50,
            backgroundColor: colors.white,
            width: "100%",
          }}
        >
          <Calendar
            // Callback which gets executed when visible months change in scroll view. Default = undefined

            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={50}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={50}
            // Enable or disable scrolling of calendar list
            scrollEnabled={true}
            // Enable or disable vertical scroll indicator. Default = false
            showScrollIndicator={true}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "relative",
  },
});
