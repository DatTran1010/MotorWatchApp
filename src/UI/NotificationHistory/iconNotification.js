import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import colors from "../../Common/colors";
import IconButton from "../../components/IconButton";
import theme from "../../Common/theme";
import { setShowListNotification } from "../../Redux/appSlice";

const IconNotification = () => {
  const dispatch = useDispatch();
  const dataNotifer = useSelector((state) => state.app.notiferApp);
  console.log("render ICocnnotificaiton");
  return (
    <View style={{ marginRight: 15 }}>
      <IconButton
        nameicon={"notifications"}
        size={30}
        colorIcon={colors.white}
        onPress={() => {
          dispatch(setShowListNotification(true));
        }}
      />
      {dataNotifer.filter((item) => item.seen === false).length > 0 && (
        <View
          style={{
            backgroundColor: "red",
            width: 20,
            height: 20,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 0,
            top: -5,
          }}
        >
          <Text style={[theme.font, { color: colors.white }]}>
            {dataNotifer.filter((item) => item.seen === false).length}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(IconNotification);

const styles = StyleSheet.create({});
