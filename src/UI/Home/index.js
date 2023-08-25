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
import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderApp from "./HeaderApp";
import TabBottom from "./TabBottom";
import TreeListNhaMay from "../TreeNhaMay";
import colors from "../../Common/colors";
import IconButton from "../../components/IconButton";
import IconShowTreeList from "../../components/IconShowTreeList";
import callApi from "../../ConText/api";
import MyMotorWatch from "./MyMotorWatch";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const getDataTreeNM = async () => {
    const endpoint = "/api/motorwatch/treeNhaMay";
    const method = "GET";
    const params = {
      UserName: "admin",
    };

    const response = await callApi(
      dispatch,
      endpoint,
      method,
      null,
      "",
      params
    );

    if (response.status === 200) {
      dispatch({ type: "SET_DATA_TREE", payload: response.data });
    }
  };

  useEffect(() => {
    getDataTreeNM();
  }, []);

  const isShowTree = useSelector((state) => state.showTree);

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
      {isShowTree && <TreeListNhaMay />}
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
