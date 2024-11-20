    import React, { useContext, useState } from "react";
    import UserContext from "../../context/userContext";
    import {  useSelector } from "react-redux";
    import { Link, useNavigate } from "react-router-dom";
    import { useEffect } from "react";
    import apiOrder from "../../../api/apiOrder";
    import apiOrderDetail from "../../../api/apiOrderDetail";
    import { CLEAR } from "../../../redux/action/cartAction";
    import { useDispatch } from "react-redux";
    import { imgURL } from "../../../api/config";
    function CheckOut() {
        const { user } = useContext(UserContext);
        const [userId, setUserId] = useState("");
        const [orderId, setOrderId] = useState();
        const getDataCart = useSelector((state) => state.cart.carts);
        const totalAmount = useSelector((state) => state.cart.totalAmount);
        const navigate = useNavigate();

        const [productsName, setProductsName] = useState("");
        const [price, setPrice] = useState("");
        const [quantity, setQuantity] = useState("");
        const [total, setTotal] = useState("");
        const [image, setImage] = useState(null);
        const [orderDetails, setOrderDetails] = useState([]);


        useEffect(() => {
            if (user && user.id) { 
                setUserId(user.id); 
            }
        }, [user]);
        const disPatch = useDispatch();

        const handleSubmit= async(e)=>{
            try{
                e.preventDefault();
                const  orders={
                    total_price:totalAmount,
                    username:user.username,
                    phone:user.phone,
                    address:user.address,
                    user_id:user.id,
                    
                }
                console.log("order_data:",orders)
                const addOrder= await apiOrder.createOrder({data:orders});
                console.log("ccccc:",getDataCart)
                const orderDetails =getDataCart.map((item) => ({
                    order_id:addOrder.data.data.id,
                    // img_product: [item].image,
                    product_id:item.id,
                    product_name: item.name,
                    quantity:item.quantity,
                    price: item.price,
                    total_price:item.price*item.quantity,
                }));

                const orderDetailResponses = await Promise.all(
                    orderDetails.map((detail) =>
                    apiOrder.createOrderDetail({ data: detail })
                    )
                );
                // const  addOrderDetail = await apiCheckout.createOrderDetail ({data:data})
                console.log("order:",orderDetails)
                console.log("Error: ", orderDetailResponses);
                console.log("Order successful:",orders);
                disPatch(CLEAR());
                alert("Đặt hàng thành công");
                navigate("/");
            }catch(error){
                console.log("order error:",error)
            }
        }
        

        return (
            user ?
                <div className="row content">

                    <div className="col-md-6" style={{ marginLeft: "30px" }}>
                        <h1 className="text-success" style={{ textAlign: 'center' }}>Thông tin khách hàng</h1>
                        <form onSubmit={handleSubmit}>
                
                            <div className="mb-3 mt-3">
                                <label for="name"><b>Họ Tên</b></label>
                                <input type="text" className="form-control" placeholder="Ho ten" name="name" value={user.username}/>
                            </div>

                            <div className="mb-3 mt-3">
                                <label for="phone"><b>Điện thoại</b></label>
                                <input type="text" className="form-control" id="phone" name="phone" value={user.phone} />
                            </div>

                            <div className="mb-3 mt-3">
                                <label for="email"><b>Email</b></label>
                                <input type="email" className="form-control" id="email" name="email" value={user.email} />
                            </div>

                            <div className="mb-3 mt-3">
                                <label for="address"><b>Địa chỉ</b></label>
                                <input type="text" className="form-control" id="address" name="address" value={user.address}  />
                            </div>
                            <button type="submit" className="btn btn-success" style={{ margin: '20px' }}>Thanh toán</button>
                        </form>
                    </div>


                    <div className="col-md-5" >
                        <h1 className="text-success" style={{ marginBottom: '20px' }}>Thông tin đặt hàng</h1>
                        <table className="table table-bordered table-sm">
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                            {
                                getDataCart.map((e) => {
                                    return (
                                        <tr>
                                            <td><img src ={imgURL + e.image}/></td>
                                            <td>{e.name}</td>
                                            <td>{e.price}</td>
                                            <td>{e.quantity}</td>
                                            <td>{e.price * e.quantity}</td>
                                        </tr>
                                    )

                                })
                            }
                            <th colSpan="3">Tổng tiền</th>
                            <td colSpan="1">{totalAmount}</td>
                        </table>
                    </div>
                </div> :
                <div className="justify-content-center cart " style={{ textAlign: 'center' }}>
                    <h1>Bạn cần đăng nhập để thanh toán</h1>
                    <button type="button" className="btn btn-success" style={{ margin: "20px" }}><Link to="/login" className="text-white text-decoration-none">Đăng nhập</Link></button>
                </div>
        )
    }
    export default CheckOut;