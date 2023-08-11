import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { MainConText } from "../ConText/MainContext";

const Overlay = () => {
    // const { overLay } = useContext(MainConText);
    const overLay = useSelector((state) => state.overlay);
    return (
        overLay && (
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ScrollView
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: "50%",
                    }}
                >
                    <ActivityIndicator style={{}} size="large" />
                </ScrollView>
            </View>
        )
    );
};

export default Overlay;
