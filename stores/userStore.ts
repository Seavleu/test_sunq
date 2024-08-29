import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserStore {
  token: string | null = null;
  userInfo: any = null;  

  constructor() {
    makeAutoObservable(this);
    this.loadToken();
  }

  setToken(token: string) {
    this.token = token;
    AsyncStorage.setItem('authToken', token);
  }

  async loadToken() {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      this.token = token;
    }
  }

  setUserInfo(userInfo: any) {
    this.userInfo = userInfo;
    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  async loadUserInfo() {
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  logout() {
    this.token = null;
    this.userInfo = null;
    AsyncStorage.removeItem('authToken');
    AsyncStorage.removeItem('userInfo');
  }
}

const userStore = new UserStore();
export default userStore;
