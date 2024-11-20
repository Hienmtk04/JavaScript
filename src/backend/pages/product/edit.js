import apiProduct from "../../../api/apiProduct";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiCategory from "../../../api/apiCategory";
import apiBrand from "../../../api/apiBrand";
import axiosInstance from "../../../api/axios";
import { imgURL } from "../../../api/config";
function EditProduct() {
    const { id } = useParams();
    const [productsName, setProductsName] = useState("");
    const [slug, setSlug] = useState("");
    const [catID, setCatId] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isOnSale, setIsOnSale] = useState(false);
    const [salePrice, setSalePrice] = useState(0);
    const [image, setImage] = useState(null);
    const [brandId, setBrandId] = useState();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        apiProduct.getProductById(id).then(res => {
            try {
                console.log(res);
                const productData = res.data.data.attributes;
                setProductsName(productData.product_name);
                setSlug(productData.slug);
                setCatId(productData.cat_id);
                setPrice(productData.price);
                setDescription(productData.description);
                setIsOnSale(productData.is_on_sale);
                setSalePrice(productData.sale_price);
                setBrandId(productData.brand_id);
                setImage(productData.image);

            }
            catch (e) {
                console.log("Error:", e);
            }
        })
    }, []);
    useEffect(() => {
        apiCategory.getAll().then((res) => {
            try {
                console.log(res);
                const categoryData = res.data.map((cat) => {
                    return {
                        id: cat.id,
                        name: cat.attributes.category_name,
                        slug: cat.attributes.slug,
                        status: cat.attributes.status
                    };
                });
                setCategories(categoryData);
            }
            catch (e) {
                console.log("Error:", e);
            }
        })
    }, []);

    useEffect(() => {
        apiBrand.getAll().then(res => {
            try {
                const brandData = res.data.map((item) => {
                    return {
                        id: item.id,
                        name: item.attributes.brand_name,

                    }
                });
                setBrands(brandData);
            } catch (e) {
                console.log(e);
            }
        })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = {
            product_name: productsName,
            cat_id: catID,
            price: price,
            description: description,
            is_on_sale: isOnSale,
            sale_price: salePrice,
            slug: slug,
            image: [],
            category: catID,
            brand_id: brandId
        };
        let file = new FormData();
        file.append("files", image);

        axiosInstance.enableUploadFile();
        axiosInstance.post("/upload", file)
            .then(async (res) => {
                const fileId = res.data[0].id;
                product.image.push(fileId);
                console.log("ProductData: ", product);
                axiosInstance.enableJson();
                const reponseProduct = await apiProduct.editProduct(id,{ data: product });
                console.log("Successful:", reponseProduct);
                alert("Edit product successful.")
                navigate("/admin/product-list/1")
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className="container mt-3" style={{ border: "1px solid black", height: "100%", marginBottom: "30px" }}>
            <h1 className="text-success" style={{ textAlign: "center" }}>Sửa sản phẩm</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-3 mt-3">
                    <label htmlFor="name" ><b>Tên sản phẩm:</b></label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Nhập tên sản phẩm" value={productsName} onChange={(e) => setProductsName(e.target.value)} />
                </div>

                <div className="mb-3 mt-3">
                    <label for="category_name" className="form-label">Tên danh mục</label>
                    <select className="form-control" name="category_name" value={catID} onChange={(e) => setCatId(e.target.value)}>
                        {
                            categories.map((category, index) => {
                                return (
                                    <option key={index} value={category.id}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="slug"><b>Slug:</b></label>
                    <input type="text" className="form-control" id="slug" name="slug" placeholder="Nhập slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="price"><b>Đơn giá:</b></label>
                    <input type="text" className="form-control" id="price" name="price" placeholder="Nhập đơn giá" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="description"><b>Mô tả sản phẩm:</b></label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Nhập mô tả" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="is_on_sale">Khuyến mãi</label>
                    <select className="form-control" name="is_on_sale" value={isOnSale} onChange={(e) => setIsOnSale(e.target.value)} >
                        <option value="true">Khuyến mãi</option>
                        <option value="false">Không khuyến mãi</option>
                    </select>
                </div>

                <div className="mb-3 mt-3">
                    <label for="sale_price"><b>Giá khuyến mãi:</b></label>
                    <input type="text" className="form-control" id="sale_price" name="sale_price" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="image" className="form-label">Hình ảnh</label>
                    <input type="file" className="form-control" id="image" name="image" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="image" className="form-label">Nhà cung cấp</label>
                    <select className="form-control" name="parent_id" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                        {   
                            brands.map((brand, index) => {
                                return (
                                    <option key={index} value={brand.id}>{brand.name}</option>
                                )
                            })
                        }
                    </select>
                </div>


                <button type="submit" className="btn btn-success" style={{ margin: "20px" }}>Sửa sản phẩm</button>
            </form>
        </div>
    )
}
export default EditProduct;