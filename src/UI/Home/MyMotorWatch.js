import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from "react-native";
import React, { useState } from "react";

import {
    VictoryChart,
    VictoryBar,
    VictoryTheme,
    VictoryLegend,
    VictoryGroup,
    VictoryContainer,
} from "victory-native";

import colors from "../../Common/colors";
import { windowHeight, windowWidth } from "../../Common/dimentions";
import { Svg } from "react-native-svg";
const MyMotorWatch = () => {
    const data = [
        { date: "07/10", male: 30, female: 25 },
        { date: "08/10", male: 20, female: 15 },
        { date: "09/10", male: 20, female: 15 },
        { date: "10/10", male: 20, female: 15 },
        { date: "11/10", male: 20, female: 15 },
        { date: "12/10", male: 20, female: 15 },

        // Thêm dữ liệu cho các ngày khác
    ];

    const labels = data.map((item) => item.date);
    const maleData = data.map((item) => ({ x: item.date, y: item.male }));
    const femaleData = data.map((item) => ({ x: item.date, y: item.female }));

    const [focusedBar, setFocusedBar] = useState(null);

    const handleBarPressIn = (datum) => {
        setFocusedBar(datum);
    };

    const handleBarPressOut = () => {
        setFocusedBar(null);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, borderWidth: 1 }}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        width={windowWidth + 10} // Tùy chỉnh chiều rộng của biểu đồ
                        height={windowHeight / 2} // Tùy chỉnh chiều cao của biểu đồ
                        containerComponent={<Svg />}
                    >
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
                        <VictoryLegend
                            x={windowWidth / 3} // Canh giữa theo chiều ngang
                            orientation="horizontal"
                            gutter={20}
                            colorScale={["blue", "red"]}
                            data={[{ name: "Nam" }, { name: "Nữ" }]}
                        />
                    </VictoryChart>
                    {/* </VictoryContainer> */}
                </View>
            </ScrollView>
        </View>
    );
};

export default MyMotorWatch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        padding: 10,
    },
    legendContainer: {},
});
