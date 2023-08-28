import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { windowHeight, windowWidth } from "../Common/dimentions";
import colors from "../Common/colors";
import theme from "../Common/theme";

const GridRow = ({ data, index, columnRemove = "" }) => {
  //xóa cột nào đó trên lưới (trong data ví dụ cột id)

  const filteredColumns = Object.keys(data).filter((key) => !columnRemove[key]);

  // console.log(filteredColumns);
  return (
    <TouchableNativeFeedback style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: index % 2 == 1 ? "#f2f2f2" : "white",
          alignItems: "center",
          flexShrink: 1,
          paddingHorizontal: 5,
          height: windowHeight / 15,
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.85,
          elevation: 5,
        }}
      >
        {filteredColumns.map((key) => {
          return (
            <View key={key} style={{ flex: 1, justifyContent: "center" }}>
              <TouchableOpacity style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: windowWidth / 28,
                    color:
                      data["color"] !== undefined
                        ? data["color"]
                        : colors.black,
                    flexShrink: 1,
                    textAlign: "center",
                    fontFamily: theme.fontFamily,
                  }}
                >
                  {data[key]}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </TouchableNativeFeedback>
  );
};

export default GridRow;
