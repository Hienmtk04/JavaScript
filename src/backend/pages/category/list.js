import { useEffect, useState, useContext } from "react";
import apiCategory from "../../../api/apiCategory";
import { FaDeleteLeft } from "react-icons/fa6";
import { CgAdd } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import UserContext from "../../../frontend/context/userContext";


function CategoryList() {
    const { user } = useContext(UserContext);

    const [categoryList, setCategoryList] = useState([]);
    const [delCategoryItem, setDelCategoryItem] = useState(false);


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
                setCategoryList(categoryData);
            }
            catch (e) {
                console.log("Error:", e);
            }
        })
    },[delCategoryItem]);

    const delCategory = async(id) => {
        apiCategory.delCategory(id).then(res => {
            try{
                alert("Delete successful.")
                setDelCategoryItem(id);
            }
            catch(e){
                console.log("Error: ", e);
            }
        })
        
    }
    return (
        user ?
        <>
            <h1>Danh sách danh mục</h1>
            <Link to="/admin/add-list"><button type="button" className="btn btn-success ml-1 mb-4"><CgAdd/> Thêm danh mục</button></Link>
            <table className="table table-bordered table-sm">
                <tr>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Hành động</th>
                </tr>

                {
                    categoryList.map((cat, index) => {
                        return (
                            <tr key={index}>
                                <td>{cat.id}</td>
                                <td>{cat.name}</td>
                                <td>{cat.slug}</td>
                                <td>{cat.status}</td>
                                <td>
                                    <Link to={`/admin/edit-list/${cat.id}`}><button type="button" className="btn btn-warning ml-2"><AiFillEdit/></button></Link>
                                    <Link to=""><button type="button" className="btn btn-danger ml-2" onClick={()=>delCategory(cat.id)}><FaDeleteLeft/></button></Link>
                                </td>
                            </tr>

                        )
                    })
                }
            </table>
        </> :
         <div className="justify-content-center cart " style={{ textAlign: 'center' }}>
         <h1>Bạn cần đăng nhập để xem danh sách danh mục</h1>
         <button type="button" className="btn btn-success" style={{ margin: "20px" }}><Link to="/admin/loginAdmin" className="text-white text-decoration-none">Đăng nhập</Link></button>
     </div>
    )
}
export default CategoryList;