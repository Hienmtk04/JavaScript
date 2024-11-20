import axiosInstance from "./axios";
 const apiUser = {
    createUser: (data) => {
        return axiosInstance.post("/auth/local/register", data);
    },
    loginUser:(data) =>{
        return axiosInstance.post("/auth/local", data);
    }, 
    getAll: () => {
        return axiosInstance.get("/users?populate=*").then((res) => res.data);
    },
    getUserById: (id) => {
        return axiosInstance.get(`/users/${id}`);
    },
    getUserPagination: (page, limit) => {
        return axiosInstance.get(`/users?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`)
            .then((res) => res.data);
    },
    getAdmin:()=>{
        return axiosInstance.get("/users?filters[role][id][$eq]=3").then((res)=>res.data);
    }

 }
 export default apiUser; 