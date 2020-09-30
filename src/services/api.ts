import request from '../common/js/httpRequest';
import {getListPassType,timeSheetType} from '@/common/js/custom'

// 登录
export async function getTimeSheet(params:getListPassType) {
  return request('/api/time-sheet', {
    method: 'GET',
    params:params,
  });
}

export async function getProjectList() {
  return request('/api/project', {
    method: 'GET',
  });
}

export async function addTimeSheet(data:timeSheetType) {
  return request('/api/time-sheet', {
    method: 'POST',
    data:data
  });
}
