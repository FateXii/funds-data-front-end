import { createStore, createLogger } from 'vuex';
import UserState from './modules/userModule';
import UserGoals from './modules/investmentGoals';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: UserState,
    goals: UserGoals,
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
});
