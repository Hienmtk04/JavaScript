import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiOrder from "../../../api/apiOrder";
import apiUser from "../../../api/apiUser";
import { imgURL } from "../../../api/config";
import apiProduct from "../../../api/apiProduct";

function OrderDetail() {
    const { id } = useParams();
    const [users, setUser] = useState([]);
    const [userId, setUserId] = useState(0);
    const [order, setOrder] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [status, setStatus] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    let total = 0


    useEffect(() => {
        apiOrder.getOrderById(id).then((res) => {
            try {
                console.log("Order: ", res)
                const OrderData = res.data.data.attributes; 
                const Order = {
                    order_id: res.data.data.id,
                    user_id: OrderData.user_id,
                    status: OrderData.status
                };
                console.log("Order1: ", Order)
                setOrder(Order);
                setUserId(Order.user_id);
            }
            catch (e) {
                console.log('Get error: ' + e);
            }
        });
    }, [])

    useEffect(() => {
        apiUser.getUserById(userId).then((res) => {
            try {
                console.log("User1: ", res)
                const userData = res.data;
                const User = {
                    user_name: userData.username,
                };
                console.log("User: ", User)
                setUser(User)
            }
            catch (e) {
                console.log('Get error: ' + e);
            }
        });
    }, [userId]);
    useEffect(() => {
        apiOrder.getOrderDetailById(id).then((res) => {
            try {
                console.log("OrderDetail1: ", res)
                const orderDetailData = res.data.map((item) => {
                    return {
                        id: item.id,
                        product_id: item.attributes.product_id,
                        product_name: item.attributes.product_name,
                        quantity: item.attributes.quantity,
                        price: item.attributes.price,
                        total_price: item.attributes.total_price,
                        // img_product: res.data[item].attributes.img_product.data.attributes.url,
                    };

                });
                console.log("OrderDetail2: ", orderDetailData)
                setOrderDetail(orderDetailData);
            } catch (e) {
                console.log('Get error: ' + e);
            }  
        });
    }, [id]);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const statusData = {
                status: status
            };
            const response = await apiOrder.editOrder(id,{data: statusData});  
            console.log(response);
            console.log('Update successful: ', response);
            alert('Update successful');
            navigate('/admin/order-list');
        } catch (e) {
            console.log('Update error: ' + e);
        }
    }


    return (
        <>
            <h1 style={{ fontFamily: "Sofia, sans-serif", textAlign: "center", paddingBottom: "20px" }}>Chi tiết đặt hàng</h1>
            <div className="row content" style={{ textAlign: "center", marginTop: "50dp" }}>
                <div className="col-md-5 cart" style={{ textAlign: "left" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-3">
                            <b>Mã hóa đơn: </b> {order.order_id}
                        </div>

                        <div className="mb-3 mt-3">
                            <b>Tên khách hàng: </b> {users.user_name}
                        </div>

                        <div className="mb-3 mt-3">
                            <b>Tình trạng đơn hàng:  </b>
                            <select name="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                                <option value="Đã giao hàng">Đã giao hàng</option>
                                <option value="Đang giao hàng">Đang giao hàng</option>
                                <option value="Chưa giao hàng">Chưa giao hàng</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-success" style={{ margin: "10px" }}>Cập nhật</button>
                    </form>
                </div>

                <div className="col-md-5">
                    <form action="#" method=" POST">
                        <table className="table table-bordered table-sm">
                            <tr>
                                <th>Id</th>
                                <th>Tên sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                            {
                                orderDetail.map((pro, index) => {
                                    total += pro.total_price
                                    return (
                                        <tr key={index}>
                                            <td>{pro.id}</td>
                                            <td>{pro.product_name}</td>
                                            <td>{pro.price}</td>
                                            <td>{pro.quantity}</td>
                                            <td>{pro.total_price}</td>
                                        </tr>
                                    )
                                })
                            }
                            <th colSpan="4">Tổng tiền</th>
                            <td colSpan="1">{total}</td>
                        </table>
                    </form>
                </div>
            </div>
        </>
    )
}
export default OrderDetail;