import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import * as asyncStorageItem from "../../Common/asyncStorageItem";

const NotifiHistory = () => {
  useEffect(() => {
    const getDataNotification = async () => {
      const reslut = await asyncStorageItem.getItem("DATA_NOTIFICATION");
      console.log(reslut);
    };
    getDataNotification();
  }, []);

  return (
    <View>
      <Text>NotifiHistory</Text>
    </View>
  );
};

export default NotifiHistory;

const styles = StyleSheet.create({});
