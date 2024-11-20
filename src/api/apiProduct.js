import axiosInstance from "./axios"
const apiProduct = {
    getAll: () => {
        return axiosInstance.get("/products?populate=*").then((res) => res.data);
    },

    getNewProduct: () => {
        return axiosInstance.get("/products?sort[0]=createdAt:desc&pagination[limit]=8&populate=*").then((res) => res.data);
    },
    getSaleProduct: () => {
        return axiosInstance.get("/products?filters[is_on_sale]=true&pagination[limit]=8&populate=*").then((res) => res.data);
    },
    getDetailProductBySlug: (slug) => {
        return axiosInstance.get(`/products?filters[slug][$eq]=${slug}&populate=*`).then((res) => res.data);
    },
    getDetailProductByCatSlug: (slug) => {
        return axiosInstance.get(`/products?filters[category][slug][$eq]=${slug}&populate=*`).then((res) => res.data);
    },
    getDetailProductByBrand: (slug) => {
        return axiosInstance.get(`/products?filters[brand][slug][$eq]=${slug}&populate=*`).then((res) => res.data);
    },
    getProductPagination: (page, limit) => {
        return axiosInstance.get(`/products?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`)
            .then((res) => res.data);
    },
    createProduct: (data) => {
        return axiosInstance.post("/products", data);
    },
    editProduct: (id, product) => {
        return axiosInstance.put(`/products/${id}`, product);
    },
    getProductById: (id) => {
        return axiosInstance.get(`/products/${id}?populate=*`);
    },
    delProduct: (id) => {
        return axiosInstance.delete(`/products/${id}`);
    },

}
export default apiProduct;