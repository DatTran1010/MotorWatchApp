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

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return 1;
  } catch (e) {
    // error reading value
    return e;
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);

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

export const deleteItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return 1;
  } catch (e) {
    // error reading value
    return e;
  }
};
