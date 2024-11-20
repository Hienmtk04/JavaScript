import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "./cartItem";
import { useDispatch } from "react-redux";
import { CLEAR, TOTAL_CART } from "../../../redux/action/cartAction";
function Cart() {
    const getDataCart = useSelector(state => state.cart.carts);
    const disPatch = useDispatch();
    disPatch(TOTAL_CART());
    const clearCart = () => {
        disPatch(CLEAR());
    }
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    console.log("Product: ", getDataCart);
    return (
        <div>
            <table class="table table-bordered">
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th >Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                        <th>Xóa</th>
                    </tr>
                    {
                        getDataCart.map((e) => {
                            return (
                                <CartItem item={e} />)
                        })
                    }

                    <tr>
                        <td colSpan="5">Tổng tiền</td>
                        <td colSpan="3">{totalAmount}</td>

                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="p-2 text-end">
                <p>
                    <button type="submit" className="btn btn-success" style={{ marginRight: "10px" }}>Cập nhật</button>
                    <Link to=""><button type="button" className="btn btn-success" style={{ marginRight: "10px" }} onClick={() => clearCart()}>Hủy giỏ
                        hàng</button></Link>
                    <Link to="/checkout"><button type="button" className="btn btn-success" style={{ marginRight: "10px" }}>Thanh toán</button></Link>

                </p>
            </div>
        </div>
    )
}
export default Cart;

