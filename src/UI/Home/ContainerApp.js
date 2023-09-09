import { View, Text, Platform } from "react-native";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import HeaderApp from "./HeaderApp";
import IconShowTreeList from "../../components/IconShowTreeList";
import colors from "../../Common/colors";
import TreeListNhaMay from "../TreeNhaMay";

const ContainerApp = ({ title = "", navigation, children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      <HeaderApp
        navigation={navigation}
        title={title}
        headerLeftVisible={true}
        goBack={true}
      />
      <IconShowTreeList />
      <View style={{ flex: 1 }}>{children}</View>
      <TreeListNhaMay />
    </View>
  );
};

export default memo(ContainerApp);
