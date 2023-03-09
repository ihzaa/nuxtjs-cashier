export const state = () => ({
  access_token: null,
  refresh_token: null,
  fullname: null
});

export const getters = {
  authenticated: (state) => {
    if (state.access_token) {
      return true;
    }
    return false;
  }
}

export const mutations = {
  setAccessToken(state, access_token) {
    state.access_token = access_token;
  },
  setRefreshToken(state, refresh_token) {
    state.refresh_token = refresh_token;
  },
  setFullname(state, fullname) {
    state.fullname = fullname;
  }
};

export const actions = {
  login({ commit }, payload) {
    commit('setAccessToken', payload.access_token);
    commit('setRefreshToken', payload.refresh_token);
    commit('setFullname', payload.fullname);
  },
  logout({ commit }) {
    commit('setAccessToken', null);
    commit('setRefreshToken', null);
    commit('setFullname', null);
  }
}
