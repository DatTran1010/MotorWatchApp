import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryTheme } from "victory-native";
import { useDispatch } from "react-redux";

import colors from "../../../Common/colors";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import callApi from "../../../ConText/api";
import theme from "../../../Common/theme";
const EngineState = ({ navigation, selectedID_DC, refeshing }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([{}]);

  const [selectedNamePie, setSelectedNamePie] = useState("");

  const getData = async () => {
    const endpoint = "/api/motorwatch/bieudo2";
    const method = "GET";
    const params = {
      sdk: selectedID_DC,
    };

    const response = await callApi(
      dispatch,
      endpoint,
      method,
      null,
      "",
      params
    );
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, [selectedID_DC, refeshing]);

  const handleState = (idTT) => {
    navigation.navigate("DetailsEngineState", {
      name: "DetailsEngineState",
      listID_DC: selectedID_DC,
      idTT: idTT,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textTitle}>Tình trạng động cơ</Text>
          <Text style={(styles.textTitle, { fontSize: theme.fontSize + 2 })}>
            Tổng động cơ:{" "}
            {data.length > 0
              ? data.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.value;
                }, 0)
              : 0}
          </Text>
        </View>
      </View>
      <View style={styles.chartPie}>
        {data && data.some((item) => Object.keys(item).length > 0) && (
          <VictoryPie
            //   padAngle={10}
            innerRadius={100}
            theme={VictoryTheme.material}
            width={windowHeight / 2 + 20}
            height={windowHeight / 2 + 20}
            data={data}
            radius={({ datum }) =>
              selectedNamePie === datum.teN_TT
                ? windowWidth * 0.4
                : windowWidth * 0.4 - 10
            }
            x="id"
            y="value"
            animate={{
              easing: "bounce",
              duration: 2000,
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  // onPress: () => {
                  //   return [
                  //     {
                  //       target: "labels",
                  //       mutation: (props) => {
                  //         let categoryName = data[props.index].teN_TT;

                  //         setSelectedNamePie(categoryName);
                  //       },
                  //     },
                  //   ];
                  // },
                  onPressIn: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          // let categoryName =
                          //     data[props.index]
                          //         .teN_TT;

                          // console.log(
                          //     data[props.index.id]
                          // );
                          // // setSelectedNamePie(
                          // //     categoryName
                          // // );

                          handleState(data[props.index].id);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            // colorScale={[
            //     colors.primary,
            //     colors.primarySecond,
            //     colors.gray,
            // ]}
            labelRadius={({ innerRadius }) => innerRadius + windowWidth / 6}
            style={{
              labels: {
                fill: colors.black,
                fontSize: 20,
                fontWeight: "600",
              },
              data: {
                fill: ({ datum }) => datum.color,
              },
              parent: { ...styles.shadowContainer },
            }}
            labels={({ datum }) =>
              datum.value == 0 ? "" : String(Math.round(datum.value))
            }
            // labels={() => ""}
          />
        )}
      </View>
      <View style={styles.fotter}>
        <View style={styles.legendContainer}>
          {data &&
            data.some((item) => Object.keys(item).length > 0) &&
            data.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.legendDetal}
                  onPress={() => handleState(item.id)}
                >
                  <View
                    style={[styles.iconLegend, { backgroundColor: item.color }]}
                  ></View>
                  <Text style={styles.labelLegend}>{item.teN_TT}</Text>
                  {/* ({item.value}) */}
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </View>
  );
};

export default EngineState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  header: {
    flex: 0.1,
    padding: 10,
  },
  textTitle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
  },

  chartPie: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  fotter: {
    flex: 0.1,
    padding: 10,
  },
  legendContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  legendDetal: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  iconLegend: {
    width: 20,
    height: 20,
  },
  labelLegend: {
    fontSize: theme.fontSize,
    fontWeight: "400",
    color: colors.black,
    flexShrink: 1,
    marginLeft: 10,
  },
  shadowContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});
