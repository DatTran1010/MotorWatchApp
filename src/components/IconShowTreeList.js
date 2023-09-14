import { View, Text } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "./IconButton";
import { windowHeight } from "../Common/dimentions";
import { setShowTree } from "../Redux/appSlice";

const IconShowTreeList = () => {
  const dispatch = useDispatch();

  const isShowTree = useSelector((state) => state.app.showTree);

  const handleArrowIcon = () => {
    dispatch(setShowTree(!isShowTree));
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
