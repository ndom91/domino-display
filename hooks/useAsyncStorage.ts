import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key: string, value: Record<string, unknown> | string | number | boolean) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error Saving Data: ', e)
  }
};


export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error Retrieving Data: ', e)
  }
};
