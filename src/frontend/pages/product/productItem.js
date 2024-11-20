import React,{useState} from "react";
import { imgURL } from "../../../api/config";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ADD } from "../../../redux/action/cartAction";
import ProductDetail from "./productDetail";
function ProductItem(props) {
    const [amountItem, setAmountItem] = useState(1);
    const disPatch = useDispatch();
     const handleAddToCart = (amountItem) => {
        const product = {
            ...ProductDetail,
            amount: amountItem,
        }
        disPatch(ADD(product))
    }
    return (
        <div>
            <div className="col-md-3 card" key={props.key} style={{ margin: '20px', float: 'left', padding: 'auto', width: '410px', height: '550px' }}>
                <Link to={`/product-detail/${props.product.slug}`} key={props.key}>
                    <img src={imgURL + props.product.image} alt={props.product.name} />
                    <h3 className="card-title"><b>{props.product.name}</b></h3>
                    <h4 key={props.key}>{props.product.price} vnđ</h4>
                </Link>
                <Link to="/cart" className="btn btn-success mr-6 mb-4 flex-column" style={{height:"50px"}} onClick={()=> {handleAddToCart(amountItem)}}>
                    Add to cart
                </Link>
            </div>
        </div>
    )
}
export default ProductItem;