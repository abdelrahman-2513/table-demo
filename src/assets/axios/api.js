import ProductAxiosInstance from "./products/axiosInstanceProducts"

/**
 * This function is used to add a product
 * @param {productData} productData 
 * @returns new product
 */
export const addProduct = async (productData) => {

    const response = await ProductAxiosInstance.post('', productData);
    console.log(response.data);
    return response.data


}

/**
 * This function  is used to update product using ID
 * @param {updateProduct} productData 
 * @returns Updated product
 */
export const updateProduct = async (productData) => {
    productData = Object.fromEntries(
        Object.entries(productData).filter(([key, value]) => value !== undefined)
    );
    console.log(productData)
    const response = await ProductAxiosInstance.put(`/${productData.id}`, productData);
    console.log(response.data);
    return response.data


}

/**
 * This function is used to Delete product using the product id
 * @param {number} productId 
 * @returns The product id after deleting it from server
 */
export const deleteProduct = async (productId) => {

    const response = await ProductAxiosInstance.delete(`/${productId}`,);
    console.log(response.data);
    return productId

}

/**
 * This function used to fetch the data using the page param from the infinite query 
 * @param {number} param0 
 * @returns  Object with data , currentpage and next page
 */
export const fetchProducts = async ({ pageParam = 0 }) => {
    const limit = 10
    const response = await ProductAxiosInstance.get('', {
        params: {
            offset: pageParam,
            limit,

        }
    })
    console.log(response.data)
    return {
        data: response.data,
        currentPage: pageParam,
        nextPage: pageParam + limit < 908/* the length of items in the fake API*/ ? pageParam + limit : null
    }

}
/**
 * This function used to search for the products of the same title
 * @param {string} title 
 * @returns server response of filtered products
 */
export const fetchProductsByTitle = async (title) => {
    const response = await ProductAxiosInstance.get('', {
        params: {
            title: title

        }
    })
    console.log(response.data)
    return response.data
}


/**
 * This function takes the data to be sorted without calling the server side
 * @param {pageData, string, string} param0 
 * @returns return sorted data
 */
export const sortData = async ({ data, sortBy, dir }) => {


    const sortedData = data.sort((prod1, prod2) => {
        const price1 = Number(prod1.price);
        const price2 = Number(prod2.price);
        return dir === "desc" ? price2 - price1 : price1 - price2;
    });

    return sortedData;

};

