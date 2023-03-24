export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const axiosAuth = $axios.create({
    headers: {}
  })

  // Set baseURL to something different
  axiosAuth.setBaseURL('http://localhost:3002')

  // Inject to context as $api
  inject('axiosAuth', axiosAuth)
}
