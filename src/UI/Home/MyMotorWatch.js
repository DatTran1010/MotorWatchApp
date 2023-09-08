import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import colors from "../../Common/colors";
import Consumption from "./TieuHao";
import EngineState from "./EngineState";
import OEEMain from "./OEE";

const MyMotorWatch = ({ navigation }) => {
  const selectedID_DC = useSelector((state) => state.selectedIDTree);
  const [refeshing, setRefeshing] = useState(false);
  const handleRefreshing = () => {
    setRefeshing(!refeshing);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl onRefresh={handleRefreshing} refreshing={false} />
          }
          style={styles.container}
        >
          {selectedID_DC != -1 && (
            <>
              <Consumption
                navigation={navigation}
                selectedID_DC={selectedID_DC}
                refeshing={refeshing}
              />
              <EngineState
                navigation={navigation}
                selectedID_DC={selectedID_DC}
                refeshing={refeshing}
              />
              <OEEMain
                navigation={navigation}
                selectedID_DC={selectedID_DC}
                refeshing={refeshing}
              />
            </>
          )}
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
