export default function ({ $axios, $axiosAuth, store, $i18n }) {
  $axios.onRequest(config => {
    if (store.getters['auth/authenticated']) {
      config.headers['x-access-token'] = store.state.auth.access_token;
    }
  })

  $axios.onResponseError(error => {
    if (error.response.data.message === 'ACCESS_TOKEN_EXPIRED') {
      return $axiosAuth.$post('/api/auth/refresh-token', {
        refresh_token: store.state.auth.refresh_token
      })
        .then(response => {
          store.commit('auth/setAccessToken', response.access_token);

          const originalRequest = error.config;
          originalRequest.headers['x-access-token'] = response.access_token;

          return $axios(originalRequest);

        })
        .catch(error => {
          store.commit('auth/logout');
          window.location.href = "/login";
        })
    }
  })
}
