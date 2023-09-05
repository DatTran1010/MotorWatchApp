import { View, Text } from "react-native";
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
  VictoryStack,
  VictoryTooltip,
  VictoryLabel,
} from "victory-native";

import { windowHeight, windowWidth } from "../../../Common/dimentions";

const OEEChart = ({ data }) => {
  // const labels = data.map((item) => item.date);
  // const maleData = data.map((item) => ({ x: item.date, y: item.male }));
  // const femaleData = data.map((item) => ({ x: item.date, y: item.female }));
  // const otherData = data.map((item) => ({ x: item.date, y: item.other }));

  // const [focusedBar, setFocusedBar] = useState(null);

  return (
    <View style={{ flex: 1, zIndex: -1 }}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={15}
        width={windowWidth + 10} // Tùy chỉnh chiều rộng của biểu đồ
        height={windowHeight / 2} // Tùy chỉnh chiều cao của biểu đồ
        // containerComponent={<VictoryZoomContainer allowPan = {false} allowZoom = {false} />}
      >
        <VictoryAxis></VictoryAxis>
        <VictoryAxis
          dependentAxis
          label={""}
          style={{
            axisLabel: {
              padding: 30,
            },
          }}
        ></VictoryAxis>
        <VictoryStack
          style={{
            data: { stroke: "rgba(0,0,0,0.5)", strokeWidth: 1 },
          }}
        >
          <VictoryBar
            animate
            data={data}
            x="date"
            y="dat"
            style={{ data: { fill: data[0].colorDAT, width: 30 } }}
            labels={(datum) => datum.datum._y}
            labelComponent={<VictoryTooltip renderInPortal={false} />}
          />
          <VictoryBar
            animate
            data={data}
            x="date"
            y="khonG_DAT"
            style={{
              data: { fill: data[0].colorKHONG_DAT, width: 30 },
            }}
            labels={(datum) => datum.datum._y}
            labelComponent={<VictoryTooltip renderInPortal={false} />}
          />
          <VictoryBar
            animate
            data={data}
            x="date"
            y="khonG_HD"
            style={{
              data: { fill: data[0].colorKHONG_HD, width: 30 },
            }}
            labels={(datum) => datum.datum._y}
            labelComponent={<VictoryTooltip renderInPortal={false} />}
          />
        </VictoryStack>
        <VictoryLabel text="SL máy" x={10} y={20} />
      </VictoryChart>
    </View>
  );
};

export default memo(OEEChart);
