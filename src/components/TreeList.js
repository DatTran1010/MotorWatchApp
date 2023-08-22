import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  Animated,
} from "react-native";
import React, { useState, useMemo, memo } from "react";
import colors from "../Common/colors";
import TreeNode from "./TreeNode";
import { heightTextInput } from "../Common/dimentions";
const TreeList = ({ data, handleCheckedLisItem }) => {
  return (
    <View style={styles.container}>
      <Animated.FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={(item, index) => index + ""}
        renderItem={({ item, index, key }) => (
          <TreeNode data={[item]} onCheckedItem={handleCheckedLisItem} />
        )}
      />
    </View>
  );
};

export default TreeList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    flex: 1,
  },
  treeListContainer: {
    flex: 1,
  },
  levelTree: {
    marginLeft: 10,
    marginVertical: 10,
    marginTop: 10,
    flex: 1,
  },
  contentTree: {
    marginVertical: 5,
  },
  labelTree: {
    backgroundColor: colors.primary,
    flex: 1,
    height: heightTextInput,
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
});
