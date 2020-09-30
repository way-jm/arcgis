import {Reducer, Effect} from 'umi';

export interface GlobalModelState {
  collapsed: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    effectDemo: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  effects: {
    * effectDemo({payload}, {put}) {
     // 这里可以进行异步操作
      yield put({
        type: 'changeLayoutCollapsed',
        payload: payload,
      });
    }
  },
  reducers: {
    changeLayoutCollapsed(state = {collapsed: true}, {payload}): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },

};

export default GlobalModel;
