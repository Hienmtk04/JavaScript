import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import apiOrder from "../../../api/apiOrder";
import UserContext from "../../../frontend/context/userContext";


function OrderList() {
    const { user } = useContext(UserContext);

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        apiOrder.getAll().then((res) => {
            try {
                console.log(res);
                const orderData = res.data.map((order) => {
                    return {
                        id: order.id,
                        user_id: order.attributes.user_id,
                        status: order.attributes.status, 
                    };
                });
                setOrderList(orderData);
            }
            catch (e) {
                console.log("Error:", e);
            }
        })
    },);

    return (
        user ?
        <>
            <h1>Danh sách hóa đơn</h1>
            <table className="table table-bordered table-sm">
                <tr>
                    <th>ID</th>
                    <th>ID khách hàng</th>
                    <th>Status</th>
                    <th>Hành động</th>
                </tr>

                {
                    orderList.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td>{order.id}</td>
                                <td>{order.user_id}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Link to={`/admin/orderDetail/${order.id}`}><button type="button" className="btn btn-success ml-2"><GrView/></button></Link>
                                </td>
                            </tr> 

                        )
                    })
                }
            </table>
        </> :
        <div className="justify-content-center cart " style={{ textAlign: 'center' }}>
        <h1>Bạn cần đăng nhập để xem danh sách sản phẩm</h1>
        <button type="button" className="btn btn-success" style={{ margin: "20px" }}><Link to="/admin/loginAdmin" className="text-white text-decoration-none">Đăng nhập</Link></button>
    </div>
    )
}
export default OrderList;