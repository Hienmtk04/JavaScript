import React, { useState, useEffect } from 'react';
import apiProduct from '../../../api/apiProduct';
import { imgURL } from '../../../api/config';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD } from '../../../redux/action/cartAction';
function ProductDetail() {
    const { slug } = useParams();
    const [productDetail, setProductDetail] = useState([]);
    const [amountItem, setAmountItem] = useState(1);
    const disPatch = useDispatch();

    useEffect(() => {
        apiProduct.getDetailProductBySlug(slug).then((res) => {
            try {
                const productAttributes = res.data[0].attributes;
                const product = {
                    id: res.data[0].id,
                    name: productAttributes.product_name,
                    price: productAttributes.price,
                    slug: productAttributes.slug,
                    description: productAttributes.description,
                    image: productAttributes.image.data[0].attributes.url,
                    sale_price: productAttributes.sale_price,
                }
                setProductDetail(product);
                console.log("Product:", product);
            } catch (e) {
                console.log("Error:", e);
            }
        });
    }, []);
    const handleAddToCart = (amountItem) => {
        const product = {
            ...productDetail,
            amount: amountItem,
        }
        disPatch(ADD(product));
    }
    const increaseItemCart = () => {
        setAmountItem(amountItem + 1);
    }
    const decreaseItemCart = () => {
        setAmountItem(amountItem - 1);
    }
    return (
        <div className="row content" style={{padding: '20px' ,width:'1200px', marginLeft: 'auto', marginRight: 'auto'}}>

            <div className="col-md-5 img-detail border ">
                <img src={imgURL + productDetail.image} alt={productDetail.name} />

            </div>
            <div className="col-md-7">

                <h1 style={{ fontSize: '30px' }}><b>{productDetail.name}</b></h1>
                <h6 className="mb-4" style={{ fontSize: '25px' }}>Giá: {productDetail.price}</h6>
                <p className="mb-4">{productDetail.description}</p>
                <div className="d-flex align-items-center mb-4 pt-2 ">

                </div>
                <div className="d-flex align-items-center mb-4 pt-2 ">
                    <div className="input-group quantity mr-3" style={{width:'130px'}}>
                        <button className='btn btn-success btn-plus' onClick={() => decreaseItemCart()}>
                            <i className="fa fa-minus"></i>
                        </button>
                        <input type="number" className="text-center form-control input-number" value={amountItem} onChange={(e) => setAmountItem(e.target.value)}/>
                        <button className='btn btn-success btn-plus' onClick={() => increaseItemCart()}>
                            <i className='fa fa-plus'></i>
                        </button>
                    </div>
                    <span className="" style={{width:'20px'}}></span>
                    <button className='btn btn-success px-4 ms-2' onClick={() => { handleAddToCart(amountItem) }}>
                        <img src='images/trolly-icon.png' alt="" />
                        Add to cart
                    </button>
                </div>

            </div>
        </div>
    );

}
export default ProductDetail;