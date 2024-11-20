import axiosInstance from "./axios"

const apiBrand = {
    getAll:() => {
        return axiosInstance.get("/brands").then((res) => res.data);
    },
    createBrand: (data) => {
        return axiosInstance.post("/brands", data).then((res) => res.data);
    },

    editBrand: (id, brand) => {
        return axiosInstance.put(`/brands/${id}`, brand);
    },
    delBrand: (id) => {
        return axiosInstance.delete(`/brands/${id}`);
    },
    getBrandById: (id) => {
        return axiosInstance.get(`/brands/${id}`);
    }
}
export default apiBrand;