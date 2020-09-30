import request from '../common/js/httpRequest';
import {UserValueType,passType} from '@/common/js/custom'

// 登录
export async function login(userValue:UserValueType) {
  return request('/noa/user/login', {
    method: 'POST',
    params:{showMsg:true},
    data:userValue
  });
}


// 修改密码
export async function changePass(value:passType) {
  return request('/api/user/change-pwd', {
    method: 'POST',
    params:{showMsg:true},
    data:value
  });
}

// 修改密码
export async function changeStageName(value:object) {
  return request('/api/user/change-stage', {
    method: 'POST',
    params:{showMsg:false},
    data:value
  });
}

// 修改密码
export async function getUserList() {
  return request('/api/user/stage-list', {
    method: 'get',
    params:{showMsg:false},
  });
}
