export default {
  state: ():InvestmentGoals => ([]),
  getters: {
    getLength(state:InvestmentGoals) {
      return state.length;
    },
    getGoalById(state:InvestmentGoals) {
      return (id:number) => {
        state.find((goal:InvestmentGoal) => goal.id === id);
      };
    },
  },
  mutations: {
    addInvestmentGoal(state:InvestmentGoals, payload:InvestmentGoal) {
      state.push(payload);
    },
  },
};
