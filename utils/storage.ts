// import AsyncStorage from '@react-native-async-storage/async-storage'

// export const setToken = async (token: string) => {
//   await AsyncStorage.setItem('sun_q_token', token)
// }

// export const getToken = async () => await AsyncStorage.getItem('sun_q_token')

// export const removeToken = async () =>
//   await AsyncStorage.removeItem('sun_q_token')

import { makeAutoObservable, action, runInAction } from 'mobx';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

class UserStore {
  token: string | null = null;
  userInfo: any = null;

  constructor() {
    makeAutoObservable(this, {
      setToken: action,
      setUserInfo: action,
      logout: action,
    });
    this.loadToken();          
    this.loadUserInfo();      
  }

  async encryptData(data: string): Promise<string> {
    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, data);
  }

  async decryptData(encryptedData: string): Promise<string> {
    return encryptedData;
  }

  async setToken(token: string) {
    try {
      const encryptedToken = await this.encryptData(token);
      runInAction(() => {
        this.token = token;
      });
      await SecureStore.setItemAsync('authToken', encryptedToken);
      console.log('Token stored securely.');
    } catch (error) {
      console.error('Error storing token securely:', error);
    }
  }

  async loadToken() {
    try {
      const encryptedToken = await SecureStore.getItemAsync('authToken');
      if (encryptedToken) {
        const token = await this.decryptData(encryptedToken);
        runInAction(() => {
          this.token = token;
        });
        console.log('Token retrieved securely.');
      } else {
        console.log('No token found in SecureStore.');
      }
    } catch (error) {
      console.error('Error retrieving token securely:', error);
    }
  }

  async setUserInfo(userInfo: any) {
    try {
      const encryptedUserInfo = await this.encryptData(JSON.stringify(userInfo));
      runInAction(() => {
        this.userInfo = userInfo;
      });
      await SecureStore.setItemAsync('userInfo', encryptedUserInfo);
      console.log('User info stored securely.');
    } catch (error) {
      console.error('Error storing user info securely:', error);
    }
  }

  async loadUserInfo() {
    try {
      const encryptedUserInfo = await SecureStore.getItemAsync('userInfo');
      if (encryptedUserInfo) {
        const userInfo = JSON.parse(await this.decryptData(encryptedUserInfo));
        runInAction(() => {
          this.userInfo = userInfo;
        });
        console.log('User info retrieved securely.');
      } else {
        console.log('No user info found in SecureStore.');
      }
    } catch (error) {
      console.error('Error retrieving user info securely:', error);
    }
  }

  async logout() {
    try {
      runInAction(() => {
        this.token = null;
        this.userInfo = null;
      });
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userInfo');
      console.log('User logged out and data cleared.');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}

const userStore = new UserStore();
export default userStore;


