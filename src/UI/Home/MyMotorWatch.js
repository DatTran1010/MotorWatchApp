import { View, ScrollView, StyleSheet } from "react-native";
import React, { useMemo, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import colors from "../../Common/colors";
import Consumption from "./TieuHao";
import EngineState from "./EngineState";
import OEEMain from "./OEE";

const MyMotorWatch = ({ navigation }) => {
  const selectedID_DC = useSelector((state) => state.selectedIDTree);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Consumption navigation={navigation} selectedID_DC={selectedID_DC} />
          <EngineState navigation={navigation} selectedID_DC={selectedID_DC} />
          <OEEMain navigation={navigation} selectedID_DC={selectedID_DC} />
        </ScrollView>
      </View>
    </View>
  );
};

export default MyMotorWatch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    padding: 10,
    marginBottom: 20,
  },
});
