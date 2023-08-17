import { View, Text, StyleSheet } from "react-native";
import React, { useState, memo } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLegend,
  VictoryGroup,
  VictoryContainer,
  VictoryAxis,
  VictoryZoomContainer,
} from "victory-native";

import { Svg } from "react-native-svg";
import colors from "../../../Common/colors";
import { windowHeight, windowWidth } from "../../../Common/dimentions";

const ConsumtionChart = ({ data }) => {
  const [focusedBar, setFocusedBar] = useState(null);
  return (
    <View style={{ flex: 1 }}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
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
          label={"Kwh"}
          style={{
            axisLabel: {
              padding: 30,
            },
          }}
        ></VictoryAxis>
        <VictoryGroup
          offset={15}
          style={{
            data: { stroke: "rgba(0,0,0,0.5)", strokeWidth: 1 },
          }}
        >
          <VictoryBar
            data={data}
            x="date"
            y="tonG_TH"
            animate={{ duration: 2000, easing: "bounce" }}
            style={{
              data: {
                width: 20,
                fill: data[0].colorTONG_TH,
              },
            }}

            //   labels={({ datum }) => `${datum.y}`}
          />
          <VictoryBar
            data={data}
            x="date"
            y="tonG_CX"
            animate={{ duration: 2000, easing: "bounce" }}
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
                    alert(123);
                  },
                },
              },
            ]}

            //   labels={({ datum }) => `${datum.y}`}
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
};

// export default memo(ConsumtionChart);
export default ConsumtionChart;

const styles = StyleSheet.create({
  shadowContainer: {},
});
