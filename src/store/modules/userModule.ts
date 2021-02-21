export default {
  state: ():User => ({
    name: '',
    surname: '',
    email: '',
    phonenumber: '',
    loggedIn: false,
  }),
  mutations: {
    logout(state:User) {
      state.loggedIn = false;
    },
    login(state:User, payload:User) {
      state.name = payload.name;
      state.surname = payload.surname;
      state.email = payload.email;
      state.phonenumber = payload.phonenumber;
      state.loggedIn = true;
    },
  },
};
