import React, { useState } from "react";
import apiUser from "../../../api/apiUser";
import UserContext from "../../../frontend/context/userContext";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginAdmin() {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [admin,setAdmin]=useState([]);
    const navigate=useNavigate();
    const {setUser}=useContext(UserContext);
    useEffect(()=>{
        apiUser.getAdmin().then(res=>{
            console.log("admin ",res)
            try{
                const adminData=res.map((user)=>{
                    return{
                        id:user.id,
                        username:user.username,
                        email:user.email,
                        phone:user.phone,
                        addresss:user.address
                    };
                });
                setAdmin(adminData)
                console.log("admin data: ",adminData)
                console.log("admin length: ",admin.length)
            }catch(e){
                console.log(e)
            }
        })
    },[])
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data={
            identifier:email,
            password:password,
        };
        try{
            const response= await apiUser.loginUser(data);
            console.log(response)
            var user=response.data.user;
            for(let i=0;i<admin.length;i++){
                if(user.id===admin[i].id){
                    var user=admin[i]
                    setUser(user)
                    navigate("/admin")
                    break;
                }
                
            }
            alert("Đăng nhập thành công")

            // setUser(user);
            // navigate("/admin");
        }catch(error){
            alert("Đăng nhập không thành công")
            console.log(error)
        }
    };
    return (
        <div className="container mt-3 loginForm" style={{ border: "1px solid black", height: "100%", marginBottom: "30px" }}>
            <h1 className="text-success" style={{ textAlign: "center" }}>ĐĂNG NHẬP</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="email"><b>Email</b></label> {/* Changed for to htmlFor */}
                    <input type="email" className="form-control" id="email" placeholder="admin@gmail.com" name="email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="pass"><b>Mật khẩu</b></label> {/* Changed for to htmlFor */}
                    <input type="password" className="form-control" id="pass" placeholder="•••••••" name="pass" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success" style={{ margin: "20px" }}>Đăng nhập</button>
            </form>
        </div>
    );
}

export default LoginAdmin;