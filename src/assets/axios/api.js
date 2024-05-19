import axiosInstance from "./axiosInstance"

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