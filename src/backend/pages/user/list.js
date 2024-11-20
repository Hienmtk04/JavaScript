import React, { useEffect, useState , useContext} from "react";
import { Link, useParams } from "react-router-dom";
import apiUser from "../../../api/apiUser";
import { GrView } from "react-icons/gr";
import UserContext from "../../../frontend/context/userContext";


function UserList(){
    const { user } = useContext(UserContext);
    const [User, setUser] = useState([]);
    useEffect(() => {
        apiUser.getAll().then(res => {
            try {
                console.log(res)
                const UserData = res.map((user) => {
                    return {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        address: user.address,  
                        phone: user.phone,
                    }
                });
                setUser(UserData);
                console.log(UserData);
            }
            catch (e) {
                console.log("Error: ", e);
            }
        })

    });


    return(
        user ?
        <div>
            <h1>Danh sách người dùng</h1>
        
            <table className="table table-bordered table-lg" style={{width:"2000px"}}>
                <tr>
                    <th>ID</th>
                    <th>Tên khách hàng</th>
                    <th>Email</th>
                    <th style={{width:"150px"}}>Hành động</th>

                </tr>
                {
                    User.map((user) => {
                        return(
                            <tr key = {user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                <Link to={`/admin/view-user/${user.id}`}><button type="button" className="btn btn-success ml-2"><GrView/></button></Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            {/* <ul className="pagination">
                <li className="page-item"><Link className="page-link" to={`/admin/user-list/${page - 1}`}>Previous</Link></li>
                {
                    Array.from(Array(pages).keys()).map((index) => (
                        <li key={index} className={`page-item ${index+1 === page ? "active" : ""}`}>
                            <Link className="page-link" to={`/admin/user-list/${index+1}`}>{index+1}</Link>
                        </li>
                    ))
                }

                <li className="page-item"><Link className="page-link" to={`/admin/user-list/${page + 1}`}>Next</Link></li>
                
            </ul> */}

        </div> :
         <div className="justify-content-center cart " style={{ textAlign: 'center' }}>
         <h1>Bạn cần đăng nhập để xem danh sách người dùng</h1>
         <button type="button" className="btn btn-success" style={{ margin: "20px" }}><Link to="/admin/loginAdmin" className="text-white text-decoration-none">Đăng nhập</Link></button>
     </div>
    )
}
export default UserList;