import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";

import { MainConText } from "../ConText/MainContext";
const ModalUser = () => {
    const { modalVisibleUser, setModalVisibleUser } = useContext(MainConText);
    return (
        <Modal
            visible={modalVisibleUser}
            transparent={true}
            animationType="fade"
        >
            <TouchableOpacity
                onPress={() => {
                    setModalVisibleUser(false);
                }}
                activeOpacity={1}
                style={styles.modalContainer}
            >
                <View style={styles.modalContent}>
                    <TextInput
                        placeholder="Nhập dữ liệu"
                        style={styles.input}
                    />

                    <Button
                        title="Đóng"
                        onPress={() => setModalVisibleUser(false)}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default ModalUser;

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
