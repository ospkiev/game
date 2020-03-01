
export const state = () => ({
  getMode: {},
});

export const mutations = {
  SET_MODE(state, data) {
    state.getMode = data;
  },
};
export const actions = {
  async fetch({ commit }) {
    try {
      const { data } = await this.$axios.get('https://starnavi-frontend-test-task.herokuapp.com/game-settings');
      commit('SET_MODE', data);
      return false;
    } catch (error) {
      return console.log(error);
    }
  },
};
