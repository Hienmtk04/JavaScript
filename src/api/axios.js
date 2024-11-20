import axios from "axios";
import { apiURL } from "./config";
const axiosInstance = axios.create({
    baseURL: apiURL,
    timeout: 1000,
    headers: {
        "Content-Type" : "application/json",
    }
});
axiosInstance.enableUploadFile = () => {
    axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
}

axiosInstance.enableJson = () => {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json';
}

export default axiosInstance;