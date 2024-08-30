import { makeAutoObservable } from 'mobx';
import * as SecureStore from 'expo-secure-store';

class UserStore {
  token: string | null = null;
  userInfo: any = null;

  constructor() {
    makeAutoObservable(this);
    this.loadToken();
    this.loadUserInfo();
  }

  async setToken(token: string) {
    this.token = token;
    await SecureStore.setItemAsync('authToken', token);
    console.log('Token stored securely:', token);
  }

  async loadToken() {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      this.token = token;

      console.log('Token retrieved securely:', token);
    } else {
      console.log('No token found in SecureStore.');
    }
  }

  async setUserInfo(userInfo: any) {
    this.userInfo = userInfo;
    await SecureStore.setItemAsync('userInfo', JSON.stringify(userInfo));
  }

  async loadUserInfo() {
    const userInfo = await SecureStore.getItemAsync('userInfo');
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  async logout() {
    this.token = null;
    this.userInfo = null;
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('userInfo');
  }
}

const userStore = new UserStore();
export default userStore;
