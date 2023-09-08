import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import HeaderApp from "./HeaderApp";
import TabBottom from "./TabBottom";
import TreeListNhaMay from "../TreeNhaMay";
import colors from "../../Common/colors";
import IconButton from "../../components/IconButton";
import IconShowTreeList from "../../components/IconShowTreeList";
import callApi from "../../ConText/api";
import MyMotorWatch from "./MyMotorWatch";
import * as generalService from "../../apiServices/generalService";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);

  // lấy ra node cuối cùng của tree có check = true
  const getLastNodesWithCheck = (items) => {
    let result = [];

    items.forEach((item) => {
      if (item.lastNode && item.check) {
        result.push(item.id_DC);
      }

      for (const key in item) {
        if (Array.isArray(item[key])) {
          result = result.concat(getLastNodesWithCheck(item[key]));
        }
      }
    });

    return result;
  };

  useEffect(() => {
    console.log("render-tree");
    const getDataTreeNM = async () => {
      const result = await generalService.getDataTreeNhaMay(
        userInfo.USER_NAME,
        dispatch
      );

      if (result.status === 200) {
        const listID_DC = getLastNodesWithCheck(result.data);

        const listResult = listID_DC.length > 0 ? listID_DC.join(",") : "";
        dispatch({ type: "SET_DATA_TREE", payload: result.data });

        dispatch({ type: "SET_ID_TREE", payload: listResult });
      }
    };
    getDataTreeNM();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      <HeaderApp
        navigation={navigation}
        title="My MotorWatch"
        headerLeftVisible={true}
      />
      <IconShowTreeList />
      <MyMotorWatch navigation={navigation} />
      {/* <TabBottom navigation={navigation} /> */}
      <TreeListNhaMay />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});
