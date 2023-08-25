import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const WorkRealtime = () => {
    const listGTDCCollection = firestore()
        .collection("listGTDC")
        .doc("BL-GF-01-01-0001");

    useEffect(() => {
        listGTDCCollection.onSnapshot((querySnapshot) => {
            // const data = [];
            // querySnapshot.forEach((doc) => {
            //     data.push({

            //     })
            // })

            console.log(querySnapshot.data());
        });
        console.log(listGTDCCollection);
    }, []);
    return (
        <View>
            <Text>WorkRealtime</Text>
        </View>
    );
};

export default WorkRealtime;

const styles = StyleSheet.create({});
