import React from 'react';
import {connect} from 'dva'
import styles from './login.less';
import { Form, Input, Button } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import {UserValueType} from '@/common/js/custom'
import {ConnectState} from "@/common/js/custom";

interface loginProps {
  user: { userInfo:object,token:string }
  dispatch:any
}
const Login:React.FC<loginProps>= (props) => {
  const {dispatch} = props;
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const changeReduxAsync =(userValue:UserValueType)=>{
    dispatch({
      type: 'user/getUserInfo',
      payload:userValue,
    });
  }
  const onFinish = (values: any) => {
    changeReduxAsync(values)
  };

  return (
    <div className={styles.login}>
      <video src={'/login_video.mp4'} width='1920' height='1080' id="loginVideo" muted={true} autoPlay={true}
             loop={true}>
        your browser does not support the video tag
      </video>
      <div className={styles.form}>
        <h1 className={styles.title}>阡陌工时系统</h1>
        <Form
          className={styles.formCon}
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="userEmail"

            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input size="large" prefix={<UserOutlined />}/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password size="large" prefix={<LockOutlined />}/>
          </Form.Item>

            <Button type="primary" htmlType="submit" size="large" className={styles.loginBtn}>
              登录
            </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }:ConnectState) => ({
  user
})
export default connect(mapStateToProps)(Login);


