import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (key, value) => {
  try {
    const jsonValue = typeof value !== 'string' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getStorage = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const getObjetctStorage = async key => {
  try {
    const object = await AsyncStorage.getItem(key);
    const objectParsed = JSON.parse(object);
    return objectParsed;
  } catch (e) {
    console.log(e);
  }
};

export const removeStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
