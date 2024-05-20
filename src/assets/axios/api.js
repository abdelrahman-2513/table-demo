import axiosInstance from "./axiosInstance"
import ProductAxiosInstance from "./products/axiosInstanceProducts"

export const fetchData = async ({ page, sortBy, sortOrder }) => {
    try {
        const response = await axiosInstance.get('', {
            params: {
                _page: page,
                _sort: sortBy,
                _order: sortOrder
            }
        })
        console.log(response.data)
        return {
            data: response.data,
            total: response.data.length,
        }

    } catch (err) {
        console.log(err)
    }
}

export const addPost = async (postData) => {
    try {
        const response = await axiosInstance.post('', postData);
        console.log(response.data);
        return postData
    } catch (err) {
        console.log(err)
    }
}

export const fetchProducts = async ({ pageParam }) => {
    try {
        const response = await ProductAxiosInstance.get('', {
            params: {
                limit: 10,
                offset: pageParam ? pageParam * 10 : 0,

            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}
export const fetchProductsByTitle = async (title) => {
    try {
        const response = await ProductAxiosInstance.get('', {
            params: {
                title: title

            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}