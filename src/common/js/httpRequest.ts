import {extend} from 'umi-request';
import {notification} from 'antd';
import {getToken} from "./cache";

type codeType = {
  [index: number]: string
};
const codeMessage: codeType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const getReqToken = (url: string) => {
  if (url === '/noa/user/login' || url === '/code') {
    return '';
  }
  return `Bearer ${getToken()}`;
};

const errorHandler = async (error: { response: Response }): Promise<Response> => {
  const {response} = error;
  let data: { message: string };
  try {
    data = await response.clone().json();
  } catch (e) {
    data = {message: "网络错误"};
  }
  const {message} = data;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const {status} = response;

    notification.error({
      message: `请求错误 ${status}`,
      description: message || errorText,
    });
    if (response.status === 401) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 500);
    }
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

request.use(async (ctx, next) => {
  // 请求前中间件
  const {req} = ctx;
  const {url, options} = req;
  options.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: getReqToken(url),
  };
  // 请求
  await next();

  // 请求后中间件
  const {res} = ctx;
  const {code = 0, message = '请求失败'} = res;
  if (code !== 0) {
    notification.error({
      description: '请求失败',
      message: message,
    });
  } else {
    if ((options.params as any).showMsg) {
      notification.success({
        description: '请求成功',
        message: message,
      });
    }
  }

});

export default request;
