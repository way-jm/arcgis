import React from 'react';
import './loading.less';

const Loading = () => {
  return <div className='loading-warp'>
    <div className="page-loading-warp">
      <div className="ant-spin ant-spin-lg ant-spin-spinning">
            <span className="ant-spin-dot ant-spin-dot-spin">
              <i className="ant-spin-dot-item"/>
              <i className="ant-spin-dot-item"/>
              <i className="ant-spin-dot-item"/>
              <i className="ant-spin-dot-item"/>
            </span>
      </div>
    </div>
  </div>;
};

export default Loading;
