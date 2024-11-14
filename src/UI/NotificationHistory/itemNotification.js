import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated, { BounceInRight } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";

import { windowHeight, windowWidth } from "../../Common/dimentions";
import * as asyncStorageItem from "../../Common/asyncStorageItem";
import Line from "../../components/Line";
import theme from "../../Common/theme";
import colors from "../../Common/colors";
import { setNotiferApp } from "../../Redux/appSlice";

const ItemNotification = () => {
  const dispatch = useDispatch();
  const dataNotifer = useSelector((state) => state.app.notiferApp);
  const heightHeaderNav = useSelector((state) => state.app.heightHeaderNav);

  const handleContentNotifer = async (index) => {
    if (dataNotifer[index].seen) return;
    const newData = [...dataNotifer];
    const updatedItem = { ...newData[index], seen: true };
    newData[index] = updatedItem;
    const result = JSON.stringify(newData);
    console.log(result);
    await asyncStorageItem.setItem("DATA_NOTIFICATION", result);
    dispatch(setNotiferApp(newData));
  };

  const handleReadAllNotifer = async () => {
    const newData = [...dataNotifer];
    const updatedData = newData.map((item) => {
      return { ...item, seen: true };
    });

    const result = JSON.stringify(updatedData);
    await asyncStorageItem.setItem("DATA_NOTIFICATION", result);
    dispatch(setNotiferApp(updatedData));
  };

  return (
    <View style={[styles.container, theme.shadow, { top: heightHeaderNav }]}>
      <View
        style={{
          position: "absolute",
          top: -10,
          right: 15,
          width: 0,
          height: 0,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderBottomWidth: 20,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: colors.white,
        }}
      ></View>
      <View style={styles.headerContent}>
        <View style={styles.title}>
          <Text style={[theme.font, { fontWeight: "bold" }]}>
            Notifications
          </Text>
        </View>
        <TouchableOpacity style={styles.readAll} onPress={handleReadAllNotifer}>
          <Ionicons name={"checkmark-done"} size={25} color="lightblue" />
          <Text style={[theme.font]}>Đọc tất cả</Text>
        </TouchableOpacity>
      </View>
      <Line />
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
      {/* <View style={styles.footerContent}></View> */}
    </View>
  );
};

export default ItemNotification;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 10,
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
    flex: 0.9,
  },
  footerContent: {
    flex: 0.1,
  },
});
