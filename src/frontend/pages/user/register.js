import React, { useState } from "react";
import apiUser from "../../../api/apiUser";
import { useNavigate } from "react-router-dom";
function Registor() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const user = { username: username, email: email, password: password, phone: phone, address: address };
            const response = await apiUser.createUser(user);

            console.log(response);
            console.log('Registration successful: ', response);
            alert('Registration successful');
            navigate('/');
        } catch (e) {
            console.log('Registration error: ' + e);
        }
    }
    return (

        <div className="container mt-3 registerForm" style={{ border: "1px solid black", height: "100%", marginBottom: "30px" }}>
            <h1 className="text-success" style={{ textAlign: "center" }}>ĐĂNG KÝ THÀNH VIÊN</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label for="name"><b>Họ Tên</b></label>
                    <input type="text" className="form-control" id="name" placeholder="Hồ Diên Lợi" name="name" value={username} onChange={(e)=> setUserName(e.target.value)} />
                </div>

                <div className="mb-3 mt-3">
                    <label for="phone"><b>Điện thoại</b></label>
                    <input type="text" className="form-control" id="phone" placeholder="0779839548" name="phone" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                </div>

                <div className="mb-3 mt-3">
                    <label for="email"><b>Email</b></label>
                    <input type="email" className="form-control" id="email" placeholder="admin@gmail.com" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>

                <div className="mb-3 mt-3">
                    <label for="address"><b>Địa chỉ</b></label>
                    <input type="text" className="form-control" id="address" placeholder="sadasdsa" name="address" value={address} onChange={(e)=> setAddress(e.target.value)} />
                </div>

                <div className="mb-3 mt-3">
                    <label for="pass"><b>Mật khẩu</b></label>
                    <input type="password" className="form-control" id="pass" placeholder="•••••••" name="pass" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-success" style={{ margin: "20px" }}>Lấy thông tin</button>
            </form>
        </div>
    );
}
export default Registor;