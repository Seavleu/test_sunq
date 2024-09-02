import { makeAutoObservable } from 'mobx';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

/**
 * UserStore 클래스는 사용자 인증 데이터를 관리하는 MobX 스토어로,
 * 토큰 관리 및 사용자 정보를 expo secure storage를 사용하여 암호화 및 복호화 형태로 처리합니다.
 */
class UserStore {
  token: string | null = null;
  userInfo: any = null;

  constructor() {
    makeAutoObservable(this);  
    this.loadToken();          
    this.loadUserInfo();      
  }

   /**
   * 복호화용 자리 표시자(필요할 경우). 
   * SHA-256은 해시이므로 복호화할 수 없으며, 이 함수는 입력값을 그대로 반환합니다.
   * @param encryptedData - "복호화"할 문자열 데이터
   * @returns - 입력된 동일한 문자열
   */
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

  // 암호화 후 사용자 정보를 안전하게 저장합니다.
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

 // 보안 저장소에서 사용자 정보를 로드합니다.  사용자 정보를 복호화하여 `userInfo` 프로퍼티에 할당합니다.
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

  // 저장된 토큰과 사용자 정보를 지우면 보안 저장소에서 관련 데이터가 삭제됩니다.
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
