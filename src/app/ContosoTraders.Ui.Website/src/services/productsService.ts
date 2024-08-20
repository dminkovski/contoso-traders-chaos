import * as Constants from "app/config/constants";
import axios from "axios";
import qs from "qs";

class ProductService { 
    private static API_PREFIX = Constants.API_ENDPOINT;

    static async getHomePageData() {
        const response = await axios.get(`${this.API_PREFIX}/products/landing`)
        return response;
    };

    static async getCouponsPageData() {
        const response = await axios.get(`${this.API_PREFIX}/coupons`);
        return response;
    };

    static async getFilteredProducts(filters:any = {}) {        
        filters.type = filters.type.type === undefined ? filters.type : filters.type.type;

        const params = {
            'params': filters,
            'paramsSerializer': qs.stringify(filters, { arrayFormat: 'repeat' })
        }
        const response = await axios.get(`${this.API_PREFIX}/products/?`+params.paramsSerializer);
        return response;
    };

    static async getDetailProductData(productId) {
        const response = await axios.get(`${this.API_PREFIX}/products/${productId}`);
        return response && response.data ? response.data : null;
    };

    static async getRelatedProducts(formData) {
        const response = await axios.post(`${this.API_PREFIX}/products/imageclassifier`, formData);
        return response.data;
    };

    static async getSearchResults(term) {
        const response = await axios.get(`${this.API_PREFIX}/Products/search/${term}`);
        return response.data;
    };
}

export default ProductService;