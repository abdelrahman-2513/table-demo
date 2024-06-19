import axios from "axios"

const PRODUCTS_API = "https://api.escuelajs.co/api/v1/products"

const ProductAxiosInstance = axios.create({
    baseURL: PRODUCTS_API,
    headers: { 'X-Custom-Header': 'foobar' }
})




export default ProductAxiosInstance;