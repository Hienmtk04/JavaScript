import React, { useState, useEffect } from "react";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "../product/productItem";
import { Link } from "react-router-dom";
import { imgURL } from "../../../api/config";
import { useDispatch } from 'react-redux';
import { ADD } from "../../../redux/action/cartAction";

function Home() {
    const [newProduct, setNewProduct] = useState([]);
    //Lấy sản phẩm mới nhất
    useEffect(() => {
        apiProduct.getNewProduct().then((res) => {
            try {
                const newProduct = res.data.map((product) => {
                    return {
                        id: product.id,
                        name: product.attributes.product_name,
                        price: product.attributes.price,
                        slug: product.attributes.slug,
                        description: product.attributes.description,
                        image: product.attributes.image.data[0].attributes.url,
                    }
                });
                console.log(newProduct)
                setNewProduct(newProduct);
            } catch (e) {
                console.log("Error: " + e.message);
            }
        });
    }, []);

    //Lấy sản phẩm khuyến mãi
    const [saleProduct, setSaleProduct] = useState([]);
    useEffect(() => {
        apiProduct.getSaleProduct().then((res) => {
            try {
                const saleProduct = res.data.map((product) => {
                    return {
                        id: product.id,
                        name: product.attributes.product_name,
                        price: product.attributes.price,
                        sale_price: product.attributes.sale_price,
                        slug: product.attributes.slug,
                        description: product.attributes.description,
                        image: product.attributes.image.data[0].attributes.url,
                    }
                });
                console.log(saleProduct)
                setSaleProduct(saleProduct);
            } catch (e) {
                console.log("Error: " + e.message);
            }

        });

    }, []);
    const [amountItem, setAmountItem] = useState(1);
    const disPatch = useDispatch();
     const handleAddToCart = (amountItem) => {
        const product = {
            ...ProductItem,
            amount: amountItem,
        }
        disPatch(ADD(product))
    }
    return (
        <div style={{ height: '3000px', textAlign:"center"}}>
            <div style={{ textAlign: 'center', margin: '0 auto', height: '2000px'}}>
                <h1 style={{ fontStyle: 'Sofia', fontSize: '50px' }}>Sản phẩm mới</h1>
                {
                    newProduct.map((product, index) => {
                        return (
                            <ProductItem key={index} product={product} />
                        )
                    })
                }
            </div>
            <div style={{ textAlign: 'center', width: 'auto', margin: 'auto', height: '3000px' }}>
                <h1 style={{ fontStyle: 'Sofia', fontSize: '50px' }}>Sản phẩm khuyến mãi</h1>
                {
                    saleProduct.map((product) => {
                        return (
                            // <ProductItem key={index} product={product} />
                            <div className="col-md-3 card" key={product.id} style={{ margin: '20px', float: 'left', padding: 'auto', width: '410px', height: '550px' }}>
                                <Link to={`/product-detail/${product.slug}`} key={product.key}>
                                    <img src={imgURL + product.image} alt={product.name} />
                                    <h3 className="card-title"><b>{product.name}</b></h3>
                                    <div className="d-flex justify-content-between">
                                        <h4 key={product.id} style={{ float: 'left' }} className="p-2 text-danger"><del>{product.price} vnđ</del></h4>
                                        <h4 key={product.id} style={{ clear: 'float' }} className="p-2">{product.sale_price} vnđ</h4>
                                    </div>
                                </Link>
                                <Link to="/cart" className="btn btn-success mr-6 mb-4 flex-column" style={{ height: "50px" }} onClick={()=> {handleAddToCart(amountItem)}}>
                                    Add to cart
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}
export default Home;