import React, {useEffect} from 'react';
import {connect} from 'dva'
import {Menu, Dropdown} from 'antd';
import {getUserInfo, getToken,removeToken,clearUserInfo} from "@/common/js/cache";
import {UserOutlined} from '@ant-design/icons';
import {ConnectState} from "@/common/js/custom";
import {userInfoType} from "@/common/js/custom";

interface AvatarProps {
  isDesk?: Boolean;
  dispatch: any
  user: { userInfo: userInfoType, token?: string }
}

const Avatar: React.FC<AvatarProps> = props => {
  const {isDesk, user: {userInfo}, dispatch} = props;

  useEffect(() => {
    const userInfo = getUserInfo();
    const token = getToken()
    if (userInfo) {
      dispatch({
        type: 'user/changeUserInfo',
        payload: {userInfo, token},
      });
    }
  }, [])

  const exitLogin = ()=>{
    clearUserInfo();
    removeToken();
    window.location.href = '/login'
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{exitLogin()}}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement={isDesk ?'bottomCenter':'topCenter'}>
      <div className={isDesk ? 'header-lang desktop' : 'header-lang'}>
        <a className="active">
          <UserOutlined/> {userInfo && userInfo.stageName ? userInfo.stageName : '未登录'}
        </a>
      </div>
    </Dropdown>
  );
};

const mapStateToProps = ({user}: ConnectState) => ({
  user
})
export default connect(mapStateToProps)(Avatar);
