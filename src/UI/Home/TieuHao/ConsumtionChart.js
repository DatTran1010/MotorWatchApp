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

import { windowHeight, windowWidth } from "../../../Common/dimentions";
import theme from "../../../Common/theme";
import colors from "../../../Common/colors";

const ConsumtionChart = ({ data }) => {
  return (
    <View
      style={{
        flex: 1,
        zIndex: -1,
      }}
    >
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={5}
        width={windowWidth + 10} // Tùy chỉnh chiều rộng của biểu đồ
        height={windowHeight / 2} // Tùy chỉnh chiều cao của biểu đồ
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
          offset={20}
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
                width: 20,
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
                width: 20,
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
    </View>
  );
};

// export default memo(ConsumtionChart);
export default ConsumtionChart;

const styles = StyleSheet.create({
  shadowContainer: {
    zIndex: -1,
  },
});
