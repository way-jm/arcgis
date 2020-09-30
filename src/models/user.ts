import {Reducer, Effect} from 'umi';
import {login} from '@/services/user'
import {setUserInfo,setToken} from "@/common/js/cache";
import {userInfoType} from "@/common/js/custom";
import { history } from 'umi';

export interface UserModelState {
  userInfo: userInfoType
  token: string
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    getUserInfo: Effect;
  };
  reducers: {
    changeUserInfo: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    userInfo: {},
    token: ''
  },

  effects: {
    * getUserInfo({payload}, {put}) {
      // 这里可以进行异步操作
      const res = yield login(payload)
      if(res.code === 0 ){
        const {userInfo,token} = res.data
        setUserInfo(userInfo)
        setToken(token)
        yield put({
          type: 'changeUserInfo',
          payload: {userInfo,token},
        });
        history.push('/')
      }
    }
  },
  reducers: {
    changeUserInfo(state = {userInfo: {}, token: ''}, {payload}): UserModelState {
      return {
        ...state,
        userInfo: payload.userInfo,
        token: payload.token
      };
    },
  },
};

export default UserModel;
