
const initState = {
    barNumlists:[77,81,59,50],
    currentBar: 0,
    buttonLists:[29,22,-34,-14],
    limit:230,
}

export default {

  namespace: 'index',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {
        history.listen(({ pathname }) => {
            if (pathname === '/index') {
                // 初始化state
                dispatch({
                    type : 'updateState',
                    payload : {
                        ...initState,
                    }
                });
            }
        });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  
        // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    updateState(state, { payload }) {
        return { ...state, ...payload };
    },

    resetState() {
        return initState;
    },

    save(state, action) {
      return { ...state, ...action.payload };
    },
    
  },

};
