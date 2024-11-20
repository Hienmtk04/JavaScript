
import React, { useEffect, useState } from "react";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "./productItem";
import { useParams } from "react-router-dom";
function ProductByBrand() {
    const {slug} = useParams();
    const [ProductByBrand, setProductByBrand] = useState([]);

    useEffect(() => {
        apiProduct.getDetailProductByBrand(slug).then((res) => {
            try {
                console.log("res:",res);
                const productByBrand = res.data.map((product) => {
                    return {
                        id: product.id,
                        name: product.attributes.product_name,
                        price: product.attributes.price,
                        slug: product.attributes.slug,
                        description: product.attributes.description,
                        image: product.attributes.image.data[0].attributes.url,

                    };
                });
                console.log(productByBrand);
                setProductByBrand(productByBrand);
            } catch (e) {
                console.log("Error:", e);
            }
        });
    }, []);
    return (
        <div style={{ textAlign: 'center' }} className=" justify-content-between">
            <h1 style={{fontFamily:'Sofia, sans-serif', fontSize:'50px'}}>Sản phẩm của chúng tôi</h1>
            <div id="product-list">
            {
                ProductByBrand.map((product, index) => {
                    return(
                        <ProductItem key = {index} product={product}/>
                    )
                })
            }

            </div>
        </div>

    );
}
export default ProductByBrand;