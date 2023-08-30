import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseURL = async () => {
  try {
    const value = await AsyncStorage.getItem("URL");

    if (value !== null) {
      return value;
      // value previously stored
    } else {
      return "";
    }
  } catch (e) {
    // error reading value
    return e;
  }
};
