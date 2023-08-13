import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";

import colors from "../../Common/colors";
import Consumption from "./TieuHao";
import EngineState from "./EngineState";

const MyMotorWatch = () => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {/* <Consumption /> */}
                <EngineState />
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
});
