import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import colors from "../Common/colors";
import { windowHeight, windowWidth } from "../Common/dimentions";
import FormButton from "../components/button";

const SkipComponent = () => {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <LinearGradient
                colors={colors.colorHeader}
                style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    style={{
                        width: windowWidth / 1.3,
                        height: windowHeight / 8,
                    }}
                    source={require("../../assets/LogoMotorWatch.jpg")}
                />
                <FormButton buttonTitle={"GET START"} />
            </LinearGradient>
        </View>
    );
};

export default SkipComponent;

const styles = StyleSheet.create({});
