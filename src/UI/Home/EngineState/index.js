import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
    VictoryPie,
    VictoryAxis,
    VictoryContainer,
    VictoryVoronoiContainer,
    VictoryTheme,
    VictoryLegend,
    VictoryLabel,
} from "victory-native";
import { Svg } from "react-native-svg";
import colors from "../../../Common/colors";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
const EngineState = () => {
    const data = [
        { x: "Cats", y: 35 },
        { x: "Dogs", y: 40 },
        { x: "Birds", y: 55 },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleChart}>
                    <Text style={styles.textTitle}>Tình trạng động cơ</Text>
                </View>
            </View>
            <View style={styles.chartPie}>
                <VictoryPie
                    padAngle={1}
                    innerRadius={50}
                    theme={VictoryTheme.material}
                    width={windowHeight / 2}
                    height={windowHeight / 2}
                    data={[
                        { x: "Cats", y: 35 },
                        { x: "Dogs", y: 40 },
                        { x: "Birds", y: 55 },
                    ]}
                    animate={{
                        easing: "exp",
                        duration: 2000,
                    }}
                    labels={() => ""}
                    colorScale={[
                        colors.primary,
                        colors.primarySecond,
                        colors.gray,
                    ]}
                />
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
        flex: 0.2,
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
});
