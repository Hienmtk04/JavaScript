import axiosInstance from "./axios"

const apiCategory = {
    getAll: () => {
        return axiosInstance.get("/categories").then((res) => res.data);
    },
    createCat: (data) => {
        return axiosInstance.post("/categories", data).then((res) => res.data);
    },
    getCategoryById: (id) => {
        return axiosInstance.get(`/categories/${id}`);
    },

    editCategory: (id, category) => {
        return axiosInstance.put(`/categories/${id}`, category);
    },
    delCategory: (id) => {
        return axiosInstance.delete(`/categories/${id}`);
    }
}
export default apiCategory;