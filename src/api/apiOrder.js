import axiosInstance from "./axios";
 const apiOrder = {
    createOrder: (data) => {
        return axiosInstance.post("/orders", data);
    },
    getAll: () => {
        return axiosInstance.get("/orders").then((res) => res.data);
    },
    getOrderById: (id) => {
        return axiosInstance.get(`/orders/${id}`);
    },
    editOrder: (id, status) => {
        return axiosInstance.put(`/orders/${id}`, status);
    },
    getOrderDetailById: (id) => {
        return axiosInstance.get(`/order-details?filters[order_id]=${id}&populate=*`).then((res) => res.data);
    },
    createOrderDetail:(data)=>{
        return axiosInstance.post('/order-details',data).then((res) => res.data);
    },

 }
 export default apiOrder; 