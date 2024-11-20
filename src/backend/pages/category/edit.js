import apiCategory from "../../../api/apiCategory";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCat(){
    const {id} = useParams();
    const [catName, setCatName] = useState("");
    const [slug, setSlug] = useState("");
    const [status, setStatus] = useState(0);
    const [categories, setCategoies] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        apiCategory.getCategoryById(id).then(res => {
            try {
                console.log(res);
                const categoryData = res.data.data.attributes; 
                setCatName(categoryData.category_name);
                setSlug(categoryData.slug);
                setStatus(categoryData.status);
            }
            catch (e) {
                console.log("Error:", e);
            }
        })
    },[]);

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
                setCategoies(categoryData);
            }
            catch (e) {
                console.log("Error:", e);
            }
        })
    },[]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const category = { 
                category_name: catName, 
                slug: slug, 
                status: status
            };
            const response = await apiCategory.editCategory(id,{data :category});

            console.log(response);
            console.log('Edit category successful: ', response);
            alert('Edit category successful');
            navigate('/admin/category-list');
        } catch (e) {
            console.log('Edit category error: ' + e);
        }
    }
    return(
        <div className="container mt-3" style={{ border: "1px solid black", height: "100%", marginBottom: "30px" }}>
        <h1 className="text-success" style={{ textAlign: "center" }}>Sửa danh mục</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
                <label htmlFor="name"><b>Tên danh mục:</b></label>
                <input type="text" className="form-control" id="name" name="name" value={catName} onChange={(e)=> setCatName(e.target.value)} />
            </div> 

            <div className="mb-3 mt-3">
                <label htmlFor="slug"><b>Slug:</b></label>
                <input type="text" className="form-control" id="slug" name="slug" value={slug} onChange={(e)=> setSlug(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select className="form-control" name="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option value="0">Không hiển thị</option>
                    <option value="1">Hiển thị</option>
                </select>
            </div>

            <button type="submit" className="btn btn-success" style={{ margin: "20px" }}>Sửa danh mục</button>
        </form>
    </div>
    )
}
export default EditCat;