import axios from "axios"


const API = "https://jsonplaceholder.org/posts"

const axiosInstance = axios.create({
    baseURL: API,
    timeout: 5000,
    headers: { 'X-Custom-Header': 'foobar' }
})

axiosInstance.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        _limit: 10
    }
    return config
}, (error) => {
    console.log(error)
    return Promise.reject(error);
})
export default axiosInstance;