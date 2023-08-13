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
} from "victory-native";

import { Svg } from "react-native-svg";
import colors from "../../../Common/colors";
import { windowHeight, windowWidth } from "../../../Common/dimentions";

const ConsumtionChart = ({ data }) => {
    console.log("rerender-Chart");

    const labels = data.map((item) => item.date);
    const maleData = data.map((item) => ({ x: item.date, y: item.male }));
    const femaleData = data.map((item) => ({ x: item.date, y: item.female }));

    const [focusedBar, setFocusedBar] = useState(null);

    return (
        <View style={{ flex: 1 }}>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
                width={windowWidth + 10} // Tùy chỉnh chiều rộng của biểu đồ
                height={windowHeight / 2} // Tùy chỉnh chiều cao của biểu đồ
                containerComponent={<Svg />}
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
                <VictoryGroup offset={20}>
                    <VictoryBar
                        animate
                        data={maleData}
                        style={{
                            data: {
                                width: 20,
                                fill: "blue",
                            },
                        }}

                        //   labels={({ datum }) => `${datum.y}`}
                    />
                    <VictoryBar
                        animate
                        data={femaleData}
                        style={{
                            data: {
                                width: 20,
                                fill: colors.primary,
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

export default memo(ConsumtionChart);
