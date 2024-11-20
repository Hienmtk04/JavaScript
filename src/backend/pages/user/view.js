import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiUser from "../../../api/apiUser";


function ViewUser() {
    const { id } = useParams();
    const [User, setUser] = useState([]);
    useEffect(() => {
        apiUser.getUserById(id).then(res => {
            try {
                console.log(res)
                const user = res.data;
                const UserData = {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                };
                setUser(UserData);
                console.log(UserData);
            }
            catch (e) {
                console.log("Error: ", e);
            }
        })

    });


    return (
        <>
            <h1>Danh sách người dùng</h1>

            <table className="table table-bordered table-lg" style={{ width: "2000px" }}>
                <tr>
                    <th>ID</th>
                    <th>Tên khách hàng</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>

                </tr>
                
                <tr>
                    <td>{User.id}</td>
                    <td>{User.name}</td>
                    <td>{User.email}</td>
                    <td>{User.phone}</td>
                    <td>{User.address}</td>
                </tr>

            </table>

        </>
    )
}
export default ViewUser;