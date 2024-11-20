import { Link, Outlet, useParams } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { useContext } from "react";
import UserContext from "../frontend/context/userContext";
function IndexAdmin() {
    const { admin } = useContext(UserContext);
    if (admin) {
        var admin_name = admin.username;
    }
    else {
        admin_name = ""
    }
    return (
        <>

            <div className="p-5 bg-warning text-white text-center">
                <h1>My Cycle Shop</h1>
                <p>We are your best choice</p>
            </div>

            <nav className="navbar navbar-expand-md bg-info navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/admin/category-list" className="nav-link active">Danh mục</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/product-list/1" className="nav-link" >Sản phẩm</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/user-list" className="nav-link" >Người dùng</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/order-list" className="nav-link">Đơn hàng</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/brand-list" className="nav-link">Nhà cung cấp</Link>
                        </li>

                        {
                            admin ?
                                (
                                    <li className="nav-item">
                                        <Link to="/admin/loginAdmin" className="nav-link">Đăng xuất</Link>
                                    </li>
                                ) :
                                <li className="nav-item">
                                    <Link to="/admin/loginAdmin" className="nav-link">Đăng nhập</Link>
                                </li>
                        }


                    </ul>
                    {/* <form className="form-inline my-2 my-lg-0">
                        <div className="login_menu">
                            <ul>
                                <li><Link to="/"><img src="../images/account.png" alt="" style={{ width: "20px", height: "20px" }} /> {admin_name}</Link></li>
                            </ul>
                        </div>
                    </form> */}
                </div>
            </nav>

            <div className="container mt-5" style={{ textAlign: "center" }}>
                <div>
                    <h1 ><b>Welcome to Daskboard</b></h1>
                </div>
                <Outlet />

            </div>
        </>
    )
}
export default IndexAdmin;