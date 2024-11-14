import { View, Text, StyleSheet } from "react-native";
import React, { useState, memo } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryGroup,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";

import Animated, { FadeInUp } from "react-native-reanimated";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import theme from "../../../Common/theme";
import colors from "../../../Common/colors";

const ConsumtionChart = ({ data }) => {
  return (
    <Animated.View
      entering={FadeInUp.duration(1000)}
      style={{
        flex: 1,
      }}
    >
      <VictoryChart
        theme={VictoryTheme.material}
        // padding={40}
        width={windowWidth + 10}
        height={windowHeight / 2}
        // containerComponent={
        //   <VictoryZoomContainer
        //     responsive={false}
        //     allowZoom={false}
        //     zoomDomain={{ x: [0, 7] }}
        //     allowPan
        //     zoomDimension="x"
        //   />
        // }
        style={{
          parent: { ...styles.shadowContainer },
        }}
      >
        <VictoryAxis></VictoryAxis>

        <VictoryAxis
          dependentAxis
          style={{
            axisLabel: {
              padding: 3,
            },
            tickLabels: {
              fill: colors.black,
              fontFamily: theme.fontFamily,
              fontSize: theme.fontSize - 1,
            },
          }}
          tickLabelComponent={<VictoryLabel textAnchor="end" />}
        ></VictoryAxis>
        <VictoryGroup
          offset={windowWidth / 20}
          style={{
            data: { stroke: "rgba(0,0,0,0.5)", strokeWidth: 1 },
          }}
        >
          <VictoryBar
            data={data}
            x="date"
            y="tonG_TH"
            // animate={{ duration: 2000, easing: "bounce" }}
            style={{
              data: {
                width: windowWidth / 20,
                fill: data[0].colorTONG_TH,
              },
            }}
            labels={({ datum }) => `${datum.tonG_TH == 0 ? "" : datum.tonG_TH}`}
          />
          <VictoryBar
            data={data}
            x="date"
            y="tonG_CX"
            // animate={{ duration: 2000, easing: "bounce" }}
            style={{
              data: {
                width: windowWidth / 20,
                fill: data[0].colorTONG_CX,
              },
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: () => {
                    // alert(123);
                  },
                },
              },
            ]}
            labels={({ datum }) => `${datum.tonG_CX == 0 ? "" : datum.tonG_CX}`}
          />
        </VictoryGroup>
        <VictoryLabel text="Kwh" x={10} y={20} />
      </VictoryChart>
    </Animated.View>
  );
};

// export default memo(ConsumtionChart);
export default ConsumtionChart;

const styles = StyleSheet.create({
  shadowContainer: {
    zIndex: -1,
  },
});
