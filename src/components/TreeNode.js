import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Animated,
} from "react-native";
import colors from "../Common/colors";
import {
  heightTextInput,
  heightTextMedium,
  windowHeight,
} from "../Common/dimentions";
import Checkbox from "./Checkbox";
import IconButton from "./IconButton";

const TreeNode = ({ data, onCheckedItem }) => {
  const [expandedNodes, setExpandedNodes] = useState({});

  const toggleExpand = useCallback(
    (index, item) => {
      LayoutAnimation.configureNext({
        duration: 500,
        create: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.scaleXY,
          springDamping: 0.7,
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 0.7,
        },
        delete: {
          type: LayoutAnimation.Types.easeOut,
          property: LayoutAnimation.Properties.opacity,
        },
      });

      setExpandedNodes((prevExpandedNodes) => ({
        ...prevExpandedNodes,
        [index]: !prevExpandedNodes[index],
      }));
    },
    [expandedNodes]
  );

  return (
    <Animated.View
      style={{
        backgroundColor: colors.backgroundColor, // Màu cam
        marginLeft: 10,
      }}
    >
      {data.map((item, index) => (
        <View key={index}>
          {Object.keys(item).map((key) => {
            const value = item[key];

            if (key.startsWith("teN_")) {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    borderRadius: 6,
                    height: heightTextInput,
                    marginVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: 10,
                    borderWidth: 1,
                    borderColor: colors.primary,
                  }}
                  onPress={() => toggleExpand(index)} // Toggle mở rộng
                  key={key}
                >
                  <View style={{}}>
                    <Checkbox
                      size={20}
                      label={value}
                      onPress={() => onCheckedItem(item)}
                      value={item.check}
                      isBackgroundColor={false}
                    />
                  </View>

                  {!item.lastNode && (
                    <View
                      style={{
                        flex: 2,
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <IconButton
                        nameicon={
                          expandedNodes[index]
                            ? "chevron-down-sharp"
                            : "chevron-forward-sharp"
                        }
                        border={false}
                        size={30}
                        colorIcon={colors.primary}
                        onPress={() => {
                          toggleExpand(index, item);
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            } else if (Array.isArray(value)) {
              return expandedNodes[index] ? (
                <TreeNode
                  key={key}
                  data={value}
                  onCheckedItem={onCheckedItem}
                />
              ) : null;
            }
            return null;
          })}
        </View>
      ))}
    </Animated.View>
  );
};

export default TreeNode;
