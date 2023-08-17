import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Animated,
  FlatList,
} from "react-native";
import React, { useState, useMemo } from "react";

import colors from "../Common/colors";
import TreeNode from "./TreeNode";
import { heightTextInput } from "../Common/dimentions";
const TreeList = () => {
  const data = [
    {
      id_NM: 1,
      TEN_NM: "Nhà máy 1",
      dataXuong: [
        {
          id_XUONG: 1,
          TEN_XUONG: "Xưởng  1",
          dataMay: [
            {
              id_MAY: 1,
              TEN_MAY: "Máy 1",
              dataDongCo: [
                {
                  id_DC: 1,
                  TEN_DC: "Động cơ 1",
                  lastNode: true,
                },
                {
                  id_DC: 2,
                  TEN_DC: "Động cơ 2",
                  lastNode: true,
                },
              ],
            },
            {
              id_MAY: 2,
              TEN_MAY: "Máy 2",
              dataDongCo: [
                {
                  id_DC: 3,
                  TEN_DC: "Động cơ 3",
                  lastNode: true,
                },
                {
                  id_DC: 4,
                  TEN_DC: "Động cơ 4",
                  lastNode: true,
                },
                {
                  id_DC: 5,
                  TEN_DC: "Động cơ 5",
                  lastNode: true,
                },
                {
                  id_DC: 6,
                  TEN_DC: "Động cơ 6",
                  lastNode: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id_NM: 1,
      TEN_NM: "Nhà máy 1",
      dataXuong: [
        {
          id_XUONG: 1,
          TEN_XUONG: "Xưởng  1",
          dataMay: [
            {
              id_MAY: 1,
              TEN_MAY: "Máy 1",
              dataDongCo: [
                {
                  id_DC: 1,
                  TEN_DC: "Động cơ 1",
                  lastNode: true,
                },
                {
                  id_DC: 2,
                  TEN_DC: "Động cơ 2",
                  lastNode: true,
                },
              ],
            },
            {
              id_MAY: 2,
              TEN_MAY: "Máy 2",
              dataDongCo: [
                {
                  id_DC: 3,
                  TEN_DC: "Động cơ 3",
                  lastNode: true,
                },
                {
                  id_DC: 4,
                  TEN_DC: "Động cơ 4",
                  lastNode: true,
                },
                {
                  id_DC: 5,
                  TEN_DC: "Động cơ 5",
                  lastNode: true,
                },
                {
                  id_DC: 6,
                  TEN_DC: "Động cơ 6",
                  lastNode: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  // get List Node cuối cùng
  // const getLastNodes = useMemo(() => {
  //   const extractLeafNodes = (node) => {
  //     const leafNodes = [];

  //     const hasLastNode = (currentNode, currentNameNodeCha) => {
  //       if (typeof currentNode === "object" && currentNode !== null) {
  //         const keys = Object.keys(currentNode);
  //         const values = Object.values(currentNode);

  //         if (
  //           values.every((value) => typeof value !== "object" || value === null)
  //         ) {
  //           leafNodes.push({
  //             ...keys.reduce((obj, key, index) => {
  //               obj[key] = values[index];
  //               return obj;
  //             }, {}),
  //           });
  //         } else {
  //           values.forEach(hasLastNode);
  //         }
  //       }
  //     };

  //     hasLastNode(node);
  //     return leafNodes;
  //   };
  //   const extractedLeafNodes = extractLeafNodes(data); // data là biến chứa dữ liệu của bạn
  //   return extractedLeafNodes;
  // }, [data]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={(item, index) => index + ""}
        renderItem={({ item, index, key }) => <TreeNode data={[item]} />}
      />
    </View>
  );
};

export default TreeList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    flex: 1,
  },
  treeListContainer: {
    flex: 1,
  },
  levelTree: {
    marginLeft: 10,
    marginVertical: 10,
    marginTop: 10,
    flex: 1,
  },
  contentTree: {
    marginVertical: 5,
  },
  labelTree: {
    backgroundColor: colors.primary,
    flex: 1,
    height: heightTextInput,
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
});

// <View style={{ flex: 1, marginBottom: 10 }}>
// {/* <TreeNode data={[item]} /> */}
// <View style={styles.levelTree}>
//     <TouchableOpacity
//         onPress={() => toggleExpand(index)}
//         style={styles.labelTree}
//     >
//         <Text>{item.TEN_NM}</Text>
//     </TouchableOpacity>
//     {expandedLevels.includes(index) && (
//         <View style={styles.levelTree}>
//             {item.dataXuong.map(
//                 (dataXuong, indexXuong, key) => (
//                     <View
//                         style={styles.contentTree}
//                         key={dataXuong.id_XUONG}
//                     >
//                         <TouchableOpacity
//                             onPress={() =>
//                                 toggleExpand(indexXuong)
//                             }
//                             style={styles.labelTree}
//                         >
//                             <Text>
//                                 {dataXuong.TEN_XUONG}
//                             </Text>
//                         </TouchableOpacity>
//                         {expandedLevels.includes(
//                             indexXuong
//                         ) && (
//                             <View
//                                 style={styles.levelTree}
//                             >
//                                 {dataXuong.dataMay.map(
//                                     (
//                                         dataMay,
//                                         indexMay
//                                     ) => (
//                                         <View
//                                             style={
//                                                 styles.contentTree
//                                             }
//                                             key={
//                                                 dataMay.id_MAY
//                                             }
//                                         >
//                                             <TouchableOpacity
//                                                 style={[
//                                                     styles.labelTree,
//                                                 ]}
//                                                 onPress={() =>
//                                                     toggleExpand(
//                                                         indexMay
//                                                     )
//                                                 }
//                                             >
//                                                 <Text>
//                                                     {
//                                                         dataMay.TEN_MAY
//                                                     }
//                                                 </Text>
//                                             </TouchableOpacity>
//                                             {expandedLevels.includes(
//                                                 indexMay
//                                             ) && (
//                                                 <View
//                                                     style={
//                                                         styles.levelTree
//                                                     }
//                                                 >
//                                                     {dataMay.dataDongCo.map(
//                                                         (
//                                                             dataDC
//                                                         ) => (
//                                                             <View
//                                                                 style={
//                                                                     styles.contentTree
//                                                                 }
//                                                                 key={
//                                                                     dataDC.id_DC
//                                                                 }
//                                                             >
//                                                                 <TouchableOpacity
//                                                                     style={
//                                                                         styles.labelTree
//                                                                     }
//                                                                 >
//                                                                     <Text>
//                                                                         {
//                                                                             dataDC.TEN_DC
//                                                                         }
//                                                                     </Text>
//                                                                 </TouchableOpacity>
//                                                             </View>
//                                                         )
//                                                     )}
//                                                 </View>
//                                             )}
//                                         </View>
//                                     )
//                                 )}
//                             </View>
//                         )}
//                     </View>
//                 )
//             )}
//         </View>
//     )}
// </View>
// </View>
