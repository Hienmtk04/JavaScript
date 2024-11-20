import axiosInstance from "../../../api/axios";
import apiProduct from "../../../api/apiProduct";
import apiBrand from "../../../api/apiBrand";
import apiCategory from "../../../api/apiCategory";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function AddProduct(){
    const [ productsName , setProductsName] = useState("");
    const [slug , setSlug] = useState("");
   const [catID,setCatId] = useState("");
    const [price , setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isOnSale,setIsOnSale]=useState(false);
    const [salePrice,setSalePrice] = useState(0);
    const [image, setImage] = useState(null);
    const [brandId, setBrandId] = useState();
    const navigate = useNavigate();
    const [categories , setCategories] = useState([]);
    const [brands , setBrands] = useState([]);
    useEffect(() =>{
        apiCategory.getAll().then(res => {
            try {
                const categoryData = res.data.map((item) => {
                    return {
                        id:item.id,
                        name:item.attributes.category_name,
                        slug:item.attributes.slug,
                        parent_id:item.attributes.parent_id
                    }
                });
                setCategories(categoryData);
            } catch (e) {
                console.log(e);
            }
        })
    },[]);
   useEffect (() =>{
    apiBrand.getAll().then(res => {
        try {
            const brandData = res.data.map((item) => {
                return {
                    id:item.id,
                    name:item.attributes.brand_name,
                    
                }
            });
            setBrands(brandData);
        } catch (e) {
            console.log(e);
        }
    })
    },[]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const productData = {
            product_name: productsName,
            cat_id: catID,
            price: price,
            description: description,
            is_on_sale: isOnSale,
            sale_price: salePrice,
            image: [],
            brand_id: brandId,
            slug: slug,
            category : catID,
        };
        // console.log(productData);

        let file = new FormData();
        file.append("files",image);

        axiosInstance.enableUploadFile();
        axiosInstance.post("/upload",file)
        .then(async (res) => {
            const fileId = res.data[0].id;
            productData.image.push(fileId);
            console.log("ProductData: ", productData);
            axiosInstance.enableJson();
            const reponseProduct = await apiProduct.createProduct({data: productData});
            console.log("Successful:" ,reponseProduct);
            alert("Add product successful.")
            navigate("/admin/product-list/1")

        })
        .catch((err) => {
            console.log(err);
        })
    };
    return(
        <div className="container mt-3" style={{ border: "1px solid black", height: "100%", marginBottom: "30px" }}>
        <h1 className="text-success" style={{ textAlign: "center" }}>Thêm sản phẩm</h1>
        <form onSubmit={handleSubmit} >
            <div className="mb-3 mt-3">
                <label htmlFor="name" ><b>Tên sản phẩm:</b></label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Nhập tên sản phẩm" value={productsName} onChange={(e)=> setProductsName(e.target.value)}/>
            </div>

            <div className="mb-3 mt-3">
                <label for = "category_name" className="form-label">Tên danh mục</label>
                <select className="form-control" name="category_name" value={catID}  onChange={(e) => setCatId(e.target.value)}>
                {
                    categories.map((category,index) => {
                        return (
                            <option  key = {index} value={category.id}>{category.name}</option>
                        )
                    })
                }
                </select>
             </div>

            <div className="mb-3 mt-3">
                <label htmlFor="slug"><b>Slug:</b></label>
                <input type="text" className="form-control" id="slug" name="slug" placeholder="Nhập slug"  value={slug} onChange={(e)=> setSlug(e.target.value)}/>
            </div>

            <div className="mb-3 mt-3">
                <label htmlFor="price"><b>Đơn giá:</b></label>
                <input type="text" className="form-control" id="price" name="price" placeholder="Nhập đơn giá" value={price} onChange={(e)=> setPrice(e.target.value)}  />
            </div>

            <div className="mb-3 mt-3">
                <label htmlFor="description"><b>Mô tả sản phẩm:</b></label>
                <input type="text" className="form-control" id="description" name="description" placeholder="Nhập mô tả" value={description} onChange={(e)=> setDescription(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="is_on_sale">Khuyến mãi</label>
                <select className="form-control" name="is_on_sale" value={isOnSale} onChange={(e)=> setIsOnSale(e.target.value)} >
                    <option value="true">Khuyến mãi</option>
                    <option value="false">Không khuyến mãi</option>
                </select>
            </div>

            <div className="mb-3 mt-3">
                <label for="sale_price"><b>Giá khuyến mãi:</b></label>
                <input type="text" className="form-control" id="sale_price" name="sale_price" value={salePrice} onChange={(e)=> setSalePrice(e.target.value)}   />
            </div>
            <div className="mb-3 mt-3">
                <label for = "image" className="form-label">Hình ảnh</label>
                <input type="file" className="form-control" id = "image" name = "image"  onChange={(e)=> setImage(e.target.files[0])} />
             </div>
             <div className="mb-3 mt-3">
                <label for = "image" className="form-label">Nhà cung cấp</label>
                <select className="form-control" name="parent_id" value={brandId}  onChange={(e) => setBrandId(e.target.value)}>
                {
                    brands.map((brand,index) => {
                        return (
                            <option  key = {index} value={brand.id}>{brand.name}</option>
                        )
                    })
                }
                </select>
             </div>


            <button type="submit" className="btn btn-success" style={{ margin: "20px" }}>Thêm sản phẩm</button>
        </form>
    </div>
    )
}
export default AddProduct;