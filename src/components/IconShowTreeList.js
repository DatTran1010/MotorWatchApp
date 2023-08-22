import { View, Text } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "./IconButton";

const IconShowTreeList = () => {
  const dispatch = useDispatch();

  const isShowTree = useSelector((state) => state.showTree);

  const handleArrowIcon = () => {
    dispatch({ type: "SET_SHOW_TREE", payload: !isShowTree });
  };
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        nameicon={"arrow-down-sharp"}
        border={false}
        size={20}
        onPress={handleArrowIcon}
      />
    </View>
  );
};

export default IconShowTreeList;
