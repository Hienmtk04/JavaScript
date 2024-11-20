import apiUser from "../../../api/apiUser";
import React, { useContext, useState } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function LoginUser() { // Capitalized the function name
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            identifier: email, 
            password: password
        };
        try {
            const response = await apiUser.loginUser(data);
            console.log(response);
            var user = response.data.user;
            setUser(user);
            navigate("/");
        } catch (error) {
            console.error(error);
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

export default LoginUser; // Capitalized the export name
