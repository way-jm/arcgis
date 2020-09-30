import React,{useEffect} from 'react';
import {ConfigProvider } from "antd";
import Header from '@/components/Header';
import  zhCN  from  'antd/es/locale/zh_CN'
import styles from './index.css';

interface propsType {
  location: { pathname: string }
}

const BasicLayout: React.FC<propsType> = props => {
  // 如果是路由是login，不走layout
  if (props.location.pathname === '/login') {
    return <>{props.children}</>;
  }
  // 全局layout样式
  return (
    <div className={styles.normal}>
      <Header/>
      <ConfigProvider locale= { zhCN }>
      {props.children}
      </ConfigProvider>
    </div>
  );
};

export default BasicLayout;
