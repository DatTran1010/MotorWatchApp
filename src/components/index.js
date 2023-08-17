import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useMemo, useRef, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import colors from "../../Common/colors";
import Consumption from "./TieuHao";
import EngineState from "./EngineState";
import OEEMain from "./OEE";
import TreeList from "../../components/TreeList";
import { windowHeight, windowWidth } from "../../Common/dimentions";
import IconButton from "../../components/IconButton";
import { useState } from "react";

const MyMotorWatch = ({ navigation }) => {
  // ref
  const bottomSheetRef = useRef(BottomSheet);

  // variables
  const snapPoints = useMemo(() => ["10%", "50%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // const CustomHandleComponent = () => {
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         backgroundColor: "blue",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: 40,
  //       }}
  //     >
  //       <Text style={{ color: "white" }}>Drag Here</Text>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Consumption navigation={navigation} />
          <EngineState />
          <OEEMain />
        </ScrollView>
        <BottomSheetModalProvider>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={BottomSheetBackdrop}
            // handleComponent={CustomHandleComponent}
            // enablePanDownToClose={true}
            onClose={() => {
              bottomSheetRef.current.snapToIndex(0);
            }}
          >
            <View
              style={{
                flex: 1,
                margin: 20,
                height: windowHeight / 2,
              }}
            >
              <TreeList />
            </View>
          </BottomSheet>
        </BottomSheetModalProvider>
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
