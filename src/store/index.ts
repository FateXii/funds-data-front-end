import { createStore } from 'vuex';
import UserState from './modules/userModule';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: UserState,
  },
});
