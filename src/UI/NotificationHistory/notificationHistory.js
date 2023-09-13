import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated, { BounceInRight } from "react-native-reanimated";

import * as asyncStorageItem from "../../Common/asyncStorageItem";
import colors from "../../Common/colors";
import { windowHeight, windowWidth } from "../../Common/dimentions";
import theme from "../../Common/theme";

const NotifiHistory = () => {
  const dispatch = useDispatch();

  const dataNotifer = useSelector((state) => state.notiferApp);
  const showListNotification = useSelector(
    (state) => state.showListNotification
  );

  console.log("render LIST NO");
  useEffect(() => {
    console.log("123");
    const getDataNotification = async () => {
      const reslut = await asyncStorageItem.getItem("DATA_NOTIFICATION");
      if (reslut == "") return;
      const res = JSON.parse(reslut);
      dispatch({ type: "SET_NOTIFER_APP", payload: res });
    };
    getDataNotification();
  }, []);

  // handle
  const handleBlur = (event) => {
    if (event.target === event.currentTarget) {
      dispatch({ type: "SET_SHOW_LIST_NOTIFI", payload: false });
    }
  };

  const handleContentNotifer = async (index) => {
    if (dataNotifer[index].seen) return;
    const newData = [...dataNotifer];
    const updatedItem = { ...newData[index], seen: true };
    newData[index] = updatedItem;
    const result = JSON.stringify(newData);
    console.log(result);
    await asyncStorageItem.setItem("DATA_NOTIFICATION", result);
    dispatch({ type: "SET_NOTIFER_APP", payload: newData });
  };

  const handleReadAllNotifer = async () => {
    const newData = [...dataNotifer];
    const updatedData = newData.map((item) => {
      return { ...item, seen: true };
    });

    const result = JSON.stringify(updatedData);
    await asyncStorageItem.setItem("DATA_NOTIFICATION", result);
    dispatch({ type: "SET_NOTIFER_APP", payload: updatedData });
  };
  //Render

  return (
    <Modal
      transparent={true}
      visible={showListNotification}
      animationType="fade"
    >
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1 }}
        onPress={handleBlur}
      >
        <View style={[styles.container, theme.shadow]}>
          <View style={styles.headerContent}>
            <View style={styles.title}>
              <Text style={[theme.font, { fontWeight: "bold" }]}>
                Notifications
              </Text>
            </View>
            <TouchableOpacity
              style={styles.readAll}
              onPress={handleReadAllNotifer}
            >
              <Ionicons name={"checkmark-done"} size={25} color="lightblue" />
              <Text style={[theme.font]}>Đọc tất cả</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyContent}>
            <FlatList
              data={dataNotifer}
              keyExtractor={(item, index) => index + ""}
              windowSize={5}
              renderItem={({ item, index, event }) => {
                return (
                  <Animated.View
                    entering={index === 0 && !item.seen && BounceInRight}
                    style={[
                      theme.shadow,
                      {
                        backgroundColor: item.seen
                          ? colors.backgroundColor
                          : "#e9f5f8",
                        padding: 15,
                        margin: 5,
                        borderRadius: 5,
                      },
                    ]}
                    // onPress={() => handleContentNotifer(index)}
                    activeOpacity={0.6}
                  >
                    <View
                      style={{
                        justifyContent: "space-between",
                        marginBottom: 10,
                        flexShrink: 1,
                      }}
                    >
                      <Text style={[theme.font]}>{item.titile}</Text>
                      <Text style={[theme.font, { color: colors.gray }]}>
                        {moment(item.date).format("DD/MM/YYYY HH:mm:ss")}
                      </Text>
                    </View>
                    <View>
                      <Text style={theme.font}>{item.body}</Text>
                    </View>
                  </Animated.View>
                );
              }}
            />
          </View>
          <View style={styles.footerContent}></View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NotifiHistory;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: windowHeight / 15,
    bottom: 0,
    right: 30,
    height: windowHeight / 2,
    width: windowWidth / 1.5,
    borderRadius: 6,
    paddingHorizontal: 5,
    backgroundColor: colors.primary,
  },
  headerContent: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
  },
  readAll: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContent: {
    flex: 0.8,
  },
  footerContent: {
    flex: 0.1,
  },
});
