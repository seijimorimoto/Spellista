import { AsyncStorage } from "react-native";

const setUserData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) { }
}

const getUserData = async (key: string): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) { }
}

export { setUserData, getUserData }