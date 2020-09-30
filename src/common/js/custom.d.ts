import { GlobalModelState } from '@/models/global';
import { UserModelState } from '@/models/user';

interface ConnectState {
  global: GlobalModelState;
  user:UserModelState
}

interface UserValueType {
  userEmail: string,
  password:string
}

interface userInfoType {
  userName?: string,
  userId?:any,
  stageName?:string,
  userEmail?:string,
  lastLoginTime?:string
}

interface passType {
  password?: string,
  newPassword?:any,
  confirmPassword?:string,
}

interface getListPassType {
  pageNum: number,
  pageSize:number,
  [index: string]: any
}

interface timeSheetType {
  projectId: number,
  useTime:any,
  content: String,
  work_date:string
}

export {ConnectState,UserValueType,userInfoType,passType,getListPassType,timeSheetType}
