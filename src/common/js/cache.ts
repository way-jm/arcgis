import xrStorage from 'xr-storage';

const TOKEN_KEY = 'TOKEN';
const USER_INFO_KEY = '__userInfo__';
// token
export function setToken(token: string): string {
  xrStorage.set(TOKEN_KEY, token);
  return token;
}

export function getToken(): string {
  return xrStorage.get(TOKEN_KEY);
}

export function removeToken(): void {
  return xrStorage.remove(TOKEN_KEY);
}

// 用户信息
export function setUserInfo(userInfo: object) {
  xrStorage.set(USER_INFO_KEY, userInfo);
  return userInfo;
}

export function getUserInfo() {
  return xrStorage.get(USER_INFO_KEY);
}
export function clearUserInfo() {
  xrStorage.remove(USER_INFO_KEY);
}

