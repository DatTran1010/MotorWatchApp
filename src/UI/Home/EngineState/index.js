import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  VictoryPie,
  VictoryAxis,
  VictoryContainer,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryLegend,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
} from "victory-native";
import { Svg, Path } from "react-native-svg";
import { useDispatch } from "react-redux";

import colors from "../../../Common/colors";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import callApi from "../../../ConText/api";
const EngineState = ({ navigation }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([{}]);

  const [selectedNamePie, setSelectedNamePie] = useState("");

  const getData = async () => {
    const endpoint = "/api/motorwatch/bieudo2";
    const method = "GET";
    const params = null;

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
  }, []);

  const handleState = (item) => {
    navigation.navigate("DetailsEngineState", {
      name: "DetailsEngineState",
      id: 1,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleChart}>
          <Text style={styles.textTitle}>Tình trạng động cơ</Text>
        </View>
      </View>
      <View style={styles.chartPie}>
        {data && data.some((item) => Object.keys(item).length > 0) && (
          <VictoryPie
            //   padAngle={10}
            innerRadius={10}
            theme={VictoryTheme.material}
            width={windowHeight / 2}
            height={windowHeight / 2}
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
                          let categoryName = data[props.index].teN_TT;

                          setSelectedNamePie(categoryName);
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
            labelRadius={({ innerRadius }) => innerRadius + 60}
            style={{
              labels: {
                fill: colors.white,
                fontSize: 20,
                fontWeight: "bold",
              },
              data: {
                fill: ({ datum }) => datum.color,
              },
              parent: { ...styles.shadowContainer },
            }}
            // labels={({ datum }) => String(Math.round(datum.value))}
            labels={() => ""}
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
                  onPress={() => handleState(item)}
                >
                  <View
                    style={[styles.iconLegend, { backgroundColor: item.color }]}
                  ></View>
                  <Text style={styles.labelLegend}>
                    {item.teN_TT} ({item.value})
                  </Text>
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
    paddingVertical: 10,
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
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
  labelLegend: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.black,
    flexShrink: 1,
  },
  shadowContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});
