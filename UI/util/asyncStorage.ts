import { AsyncStorage } from 'react-native';
import { constants } from './constants';

const setUserData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
};

const getUserData = async (key: string): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (err) {
    console.error(err);
  }
};

const clearUserData = async (keys?: string[]) => {
  try {
    const userKeys = keys ? keys : constants.USER_DATA_KEYS;
    await AsyncStorage.multiRemove(userKeys);
  } catch (err) {
    console.error(err);
  }
};

export { setUserData, getUserData, clearUserData };
