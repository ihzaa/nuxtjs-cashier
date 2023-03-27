export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const axiosAuth = $axios.create({
    headers: {}
  })

  // Set baseURL to something different
  axiosAuth.setBaseURL(process.env.API_AUTH_URL)

  // Inject to context as $api
  inject('axiosAuth', axiosAuth)
}
