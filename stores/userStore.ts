import { makeAutoObservable } from 'mobx';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

class UserStore {
  token: string | null = null;
  userInfo: any = null;

  constructor() {
    makeAutoObservable(this);
    this.loadToken();
    this.loadUserInfo();
  }

  // Encrypts data using SHA-256
  async encryptData(data: string): Promise<string> {
    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, data);
  }
  
  async decryptData(encryptedData: string): Promise<string> {
    return encryptedData;
  }

  async setToken(token: string) {
    try {
      const encryptedToken = await this.encryptData(token);
      this.token = token;
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
        this.token = token;
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
      this.userInfo = userInfo;
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
        this.userInfo = userInfo;
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
      this.token = null;
      this.userInfo = null;
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
