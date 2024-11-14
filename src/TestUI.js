import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const TestUI = () => {
  const [data, setData] = useState([]);

  // const socket = useRef(null);
  // useEffect(() => {
  //   console.log("initiateSocketConnection");

  //   socket.current = new WebSocket("ws://192.168.2.17:7174/api/ws");
  //   socket.current.onclose = (e) => {
  //     // connection closed
  //     console.log(e.code, e.reason);
  //   };
  //   socket.onerror = (e) => {
  //     // an error occurred
  //     console.log(e.message);
  //   };
  //   return () => {
  //     socket.current.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.current.onmessage = (e) => {
  //     const response = JSON.parse(e.data);
  //     console.log(response);
  //     setData(response);
  //   };
  // }, []);

  const handleConnect = () => {};
  const handleDisconect = () => {
    // socket.current.close();
  };

  return (
    <View>
      <Text>X = {data.x}</Text>
      <Text>Y = {data.y} </Text>
      <Button title="Conected" onPress={handleConnect} />
      <Button title="Disconect" onPress={handleDisconect} />
    </View>
  );
};

export default TestUI;

const styles = StyleSheet.create({});
