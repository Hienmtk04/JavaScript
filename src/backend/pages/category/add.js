import apiCategory from "../../../api/apiCategory";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddList(){
    const [catName, setCatName] = useState("");
    const [slug, setSlug] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const category = { category_name: catName, slug: slug };
            const response = await apiCategory.createCat({data :category});

            console.log(response);
            console.log('Add category successful: ', response);
            alert('Add category successful');
            navigate('/admin/category-list');
        } catch (e) {
            console.log('Add category error: ' + e);
        }
    }
    return(
        <div className="container mt-3" style={{ border: "1px solid black", height: "100%", marginBottom: "30px" }}>
            <h1 className="text-success" style={{ textAlign: "center" }}>Thêm danh mục</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label for="name"><b>Tên danh mục:</b></label>
                    <input type="text" className="form-control" id="name" name="name" value={catName} onChange={(e)=> setCatName(e.target.value)} />
                </div>

                <div className="mb-3 mt-3">
                    <label for="slug"><b>Slug:</b></label>
                    <input type="text" className="form-control" id="slug" name="slug" value={slug} onChange={(e)=> setSlug(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-success" style={{ margin: "20px" }}>Thêm danh mục</button>
            </form>
        </div>
    )
}
export default AddList;