import { View, Text } from "react-native";
import React from "react";

const IconInCircle = ({ size = 20, color = "black", text = "a" }) => {
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: 0.5 * size,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderColor: color,
                borderWidth: 1.2,
            }}
        >
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 11,
                    color: color,
                    fontWeight: "bold",
                }}
            >
                {text}
            </Text>
        </View>
    );
};

export default IconInCircle;
