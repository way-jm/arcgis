import React from 'react';
import {Button} from 'antd'
import {connect} from 'dva'
import {ConnectState} from '@/common/js/custom'
interface indexProps {
  global: { collapsed:boolean }
  dispatch:any
}
const Index:React.FC<indexProps>= (props) => {
  const {global,dispatch} = props;
  const changeRedux =()=>{
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !global.collapsed,
    });
  }
  const changeReduxAsync =()=>{
    dispatch({
      type: 'global/effectDemo',
      payload: !global.collapsed,
    });
  }
  return (
    <div>
     demo
      {global.collapsed.toString()}
      <Button type="primary" onClick={()=>changeRedux()}>改变redux的值</Button>
      <Button type="primary" onClick={()=>changeReduxAsync()}>异步延迟改变redux的值</Button>
    </div>
  );
}

const mapStateToProps = ({ global }:ConnectState) => ({
  global
})
export default connect(mapStateToProps)(Index);



