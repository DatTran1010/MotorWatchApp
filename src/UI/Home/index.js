import {
    View,
    Text,
    Modal,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";

import HeaderApp from "./HeaderApp";
import TabBottom from "./TabBottom";
const Home = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={{ flex: 1 }}>
            <HeaderApp
                navigation={navigation}
                title="My Ecomaint"
                headerLeftVisible={true}
            />
            <TabBottom navigation={navigation} />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
    },
});
