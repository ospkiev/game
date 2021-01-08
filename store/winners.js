
export const state = () => ({
  winners: [],
});

export const mutations = {
  SET_USERS(state, data) {
    state.winners = data;
  },
};
export const actions = {
  async fetch({ commit }) {
    try {
      const { data } = await this.$axios.get('https://starnavi-frontend-test-task.herokuapp.com/winners');
      commit('SET_USERS', data);
      return false;
    } catch (error) {
      return alert('error');
    }
  },
  async add({ dispatch }, obj) {
    try {
      await this.$axios.post('https://starnavi-frontend-test-task.herokuapp.com/winners', obj);
      dispatch('fetch');
      return false;
    } catch (error) {
      return alert('error');
    }
  },
};
