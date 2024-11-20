
import React, { useEffect, useState } from "react";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "./productItem";
function Product() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        apiProduct.getAll().then((res) => {
            try {
                console.log("res:",res);
                const productData = res.data.map((product) => {
                    return {
                        id: product.id,
                        name: product.attributes.product_name,
                        price: product.attributes.price,
                        slug: product.attributes.slug,
                        description: product.attributes.description,
                        image: product.attributes.image.data[0].attributes.url,

                    };
                });
                console.log(productData);
                setProduct(productData);
            } catch (e) {
                console.log("Error:", e);
            }
        });
    }, []);
    return (
        <div style={{ textAlign: 'center' }} className=" justify-content-between">
            <h1 style={{fontFamily:'Sofia, sans-serif', fontSize:'50px'}}>Tất cả sản phẩm</h1>
            <div id="product-list">
            {
                product.map((product, index) => {
                    return(
                        <ProductItem key = {index} product={product}/>
                    )
                })
            }

            </div>
        </div>

    );
}
export default Product;