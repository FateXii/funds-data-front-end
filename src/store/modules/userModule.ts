export default {
  state: ():User => ({
    name: '',
    surname: '',
    email: '',
    phonenumber: '',
  }),
  mutations: {
    register(state:User, payload:User) {
      state.name = payload.name;
      state.surname = payload.surname;
      state.email = payload.email;
      state.phonenumber = payload.phonenumber;
    },
    login(state:User, payload:User) {
      state.name = payload.name;
      state.surname = payload.surname;
      state.email = payload.email;
      state.phonenumber = payload.phonenumber;
    },
  },
};
