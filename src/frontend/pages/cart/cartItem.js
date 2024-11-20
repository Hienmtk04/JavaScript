import { imgURL } from "../../../api/config";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { REMOVE_ITEM } from "../../../redux/action/cartAction";
function CartItem(props) {
    const disPatch = useDispatch();
    const removeItem = (item) =>{ 
        disPatch(REMOVE_ITEM(item));
    }
    return (
        <>
            <tr>
                <td><img src={imgURL + props.item.image} alt="product" style={{width:"150px", height:"150px"}}/></td>
                <td>{props.item.name}</td>
                <td>{props.item.quantity}</td>
                <td>{props.item.price}</td>
                <td>{props.item.price * props.item.quantity}</td>
                <td><button type="button" className="btn btn-danger" style={{width:"30px", height:"30px"}} onClick={() => removeItem(props.item)} > <FaTrashCan/></button></td>
            </tr>
        </>
    )
}
export default CartItem;