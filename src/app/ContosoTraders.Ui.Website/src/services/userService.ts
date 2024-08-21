import * as Constants from "app/config/constants";
import axios from "axios";

class UserService { 
    private static API_PREFIX = Constants.API_ENDPOINT;


    static async postLoginForm(formData) {
        const response = await axios.post(`${this.API_PREFIX}/login`, formData);
        return response;
    };

    static async getUserInfoData() {
        const response = await axios.get(`${this.API_PREFIX}/profiles/me`);
        return response.data;
    };

    static async getProfileData() {
        const response = await axios.get(`${this.API_PREFIX}/profiles/navbar/me`);
        return response.data;
    };
}


export default UserService;