import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { produce } from "immer";

import { useDispatch, useSelector } from "react-redux";
import { windowHeight } from "../../Common/dimentions";
import TreeList from "../../components/TreeList";
import colors from "../../Common/colors";
import callApi from "../../ConText/api";
import LinearGradient from "react-native-linear-gradient";
import theme from "../../Common/theme";
import IconButton from "../../components/IconButton";

const TreeScreen = () => {
  const disPatch = useDispatch();

  const dataTreeNM = useSelector((state) => state.dataTreeNM);

  //#region  state Tree
  // ref
  const bottomSheetRef = useRef(BottomSheet);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  //#endregion

  function updateCheckedData(data, targetIds, checkValue) {
    const newData = [...data];
    for (let item of newData) {
      if (targetIds.includes(item.id)) {
        item.check = !checkValue;
      }

      for (const key in item) {
        if (Array.isArray(item[key])) {
          updateCheckedData(item[key], targetIds, checkValue);
        }
      }
    }

    return newData;
  }

  function findParentAndDescendants(items, targetId, parents = []) {
    for (let item of items) {
      if (item.id === targetId) {
        const descendants = getDescendantIds(item);
        return parents.concat([item.id, ...descendants]);
      }

      for (const key in item) {
        if (Array.isArray(item[key])) {
          const res = findParentAndDescendants(
            item[key],
            targetId,
            parents.concat(item.id)
          );
          if (res.length > 0) {
            return res;
          }
        }
      }
    }
    return [];
  }

  function getDescendantIds(item) {
    let descendantIds = [];

    for (const key in item) {
      if (Array.isArray(item[key])) {
        for (let subItem of item[key]) {
          if (typeof subItem === "object") {
            descendantIds.push(subItem.id);
            descendantIds = descendantIds.concat(getDescendantIds(subItem));
          }
        }
      }
    }

    return descendantIds;
  }

  const CustomHandleComponent = useCallback(() => {
    return (
      <View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 0 }}
          colors={colors.colorHeader}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            height: 40,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: 10,
          }}
        >
          <View>
            <Text style={[theme.font, { color: colors.white }]}>
              Chọn nhà máy và động cơ
            </Text>
          </View>
          <View>
            <IconButton
              border={false}
              nameicon="close-outline"
              colorIcon={colors.white}
              size={25}
              onPress={() => {
                bottomSheetRef.current.close();
              }}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }, []);

  const handleCheckedLisItem = (item) => {
    const result = findParentAndDescendants(dataTreeNM, item.id);

    // const newData = updateCheckedData(dataTreeNM, result, item.check);
    const newData = produce(dataTreeNM, (draftData) => {
      updateCheckedData(draftData, result, item.check);
    });

    disPatch({ type: "SET_DATA_TREE", payload: [...newData] });
  };

  // lấy các lastNode có check = true
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

  // callbacks
  const handleSheetChanges = (index) => {
    if (index === -1) {
      disPatch({ type: "SET_SHOW_TREE", payload: false });

      const listID_DC = getLastNodesWithCheck(dataTreeNM);
      const result = listID_DC.length > 0 ? listID_DC.join(",") : "";

      disPatch({ type: "SET_ID_TREE", payload: result });
    }
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheet
        ref={bottomSheetRef}
        index={2}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={BottomSheetBackdrop}
        handleComponent={CustomHandleComponent}
        enablePanDownToClose={true}
        onClose={() => {
          // bottomSheetRef.current.snapToIndex(0);
        }}
        enableContentPanningGesture={Platform.OS === "android" ? false : true}
      >
        <View
          style={{
            flex: 1,
            margin: 20,
            height: windowHeight / 2,
          }}
        >
          <TreeList
            data={dataTreeNM}
            handleCheckedLisItem={handleCheckedLisItem}
          />
        </View>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
};

export default TreeScreen;
