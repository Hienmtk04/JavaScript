import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { CgAdd } from "react-icons/cg";
import { FaDeleteLeft } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { imgURL } from "../../../api/config";
import { GrView } from "react-icons/gr";
import UserContext from "../../../frontend/context/userContext";



function ProductsList() {
    const { user } = useContext(UserContext);
    const [product, setProduct] = useState([]);
    const [pages, setPages] = useState(1);
    const [delProductItem, setDelProductItem] = useState(false);
    const page = parseInt(useParams().page);
    const limit = 5;

    useEffect(() => {
        apiProduct.getProductPagination( page, limit).then(res => {
            try {
                const numberOfPages = Math.ceil(res.meta.pagination.total / res.meta.pagination.pageSize);
                setPages(numberOfPages);
                const ProductData = res.data.map((product) => {
                    return {
                        id: product.id,
                        name: product.attributes.product_name,
                        slug: product.attributes.slug,
                        cat_name: product.attributes.category.data[0].attributes.category_name,
                        description: product.attributes.description,  
                        is_on_sale: product.attributes.is_on_sale,
                        price: product.attributes.price,
                        sale_price: product.attributes.sale_price,
                        image: product.attributes.image.data[0].attributes.url,

                    }
                });
                setProduct(ProductData);
                console.log(ProductData);
            }
            catch (e) {
                console.log("Error: ", e);
            }
        })

    }, [page][delProductItem]);
    const delProduct = async(id) => {
        apiProduct.delProduct(id).then(res => {
            try{
                alert("Delete successful.")
                setDelProductItem(id);
            }
            catch(e){
                console.log("Error: ", e);
            }
        })
        
    }

    return (
        user ?
        <>
            <h1>Danh sách sản phẩm</h1>
            <Link to="/admin/add-product"><button type="button" className="btn btn-success ml-1 mb-4"><CgAdd /> Thêm sản phẩm</button></Link>
            <table className="table table-bordered table-lg" style={{width:"2000px"}}>
                <tr>
                    <th>ID</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Mô tả</th>
                    <th>Giá bán</th>
                    <th>Khuyến mãi</th>
                    <th>Giá khuyến mãi</th>
                    <th style={{width:"150px"}}>Hành động</th>

                </tr>

                {
                    product.map((product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img src={imgURL + product.image} alt={product.name} style={{width:"300px", height:"180px"}} /></td>
                                <td>{product.name}</td>
                                <td>{product.cat_name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.is_on_sale}</td>
                                <td>{product.sale_price}</td>
                                <td>
                                    <Link to={`/admin/product-list/${product.slug}`}><button type="button" className="btn btn-success ml-2"><GrView/></button></Link>
                                    <Link to={`/admin/edit-product/${product.id}`}><button type="button" className="btn btn-warning ml-2"><AiFillEdit/></button></Link>
                                    <Link to=""><button type="button" className="btn btn-danger ml-2" onClick={() => delProduct(product.id)}><FaDeleteLeft/></button></Link>
                                </td>
                            </tr>

                        )
                    })
                }
            </table>
            <ul className="pagination">
                <li className="page-item"><Link className="page-link" to={`/admin/product-list/${page - 1}`}>Previous</Link></li>
                {
                    Array.from(Array(pages).keys()).map((index) => (
                        <li key={index} className={`page-item ${index+1 === page ? "active" : ""}`}>
                            <Link className="page-link" to={`/admin/product-list/${index+1}`}>{index+1}</Link>
                        </li>
                    ))
                }

                <li className="page-item"><Link className="page-link" to={`/admin/product-list/${page + 1}`}>Next</Link></li>
                
            </ul>

        </> :
        <div className="justify-content-center cart " style={{ textAlign: 'center' }}>
        <h1>Bạn cần đăng nhập để xem danh sách sản phẩm</h1>
        <button type="button" className="btn btn-success" style={{ margin: "20px" }}><Link to="/admin/loginAdmin" className="text-white text-decoration-none">Đăng nhập</Link></button>
    </div>

    )
}
export default ProductsList;