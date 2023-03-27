export default function ({ $axios, store }, inject) {
  // Create a custom axios instance
  const axiosAuth = $axios.create({
    headers: {}
  })

  // Set baseURL to something different
  axiosAuth.setBaseURL(process.env.API_AUTH_URL)

  // Inject to context as $api
  inject('axiosAuth', axiosAuth)

  $axios.onRequest(config => {
    if (store.getters['auth/authenticated']) {
      config.headers['x-access-token'] = store.state.auth.access_token;
    }
  })
}
