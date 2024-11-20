import { useEffect, useState, useContext} from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { CgAdd } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import apiBrand from "../../../api/apiBrand";
import UserContext from "../../../frontend/context/userContext";


function BrandList() {
    const { user } = useContext(UserContext);

    const [brandList, setBrandList] = useState([]);
    const [delBrandItem, setDelBrandItem] = useState(false);


    useEffect(() => {
        apiBrand.getAll().then((res) => {
            try {
                console.log(res);
                const brandData = res.data.map((brand) => {
                    return {
                        id: brand.id,
                        name: brand.attributes.brand_name,
                        slug: brand.attributes.slug, 
                        address: brand.attributes.address
                    };
                });
                setBrandList(brandData);
            }
            catch (e) {
                console.log("Error:", e);
            }
        })
    },[delBrandItem]);

    const delBrand = async(id) => {
        apiBrand.delBrand(id).then(res => {
            try{
                alert("Delete successful.")
                setDelBrandItem(id);
            }
            catch(e){
                console.log("Error: ", e);
            }
        })
        
    }
    return (
        user ?
        <>
            <h1>Danh sách nhà cung cấp</h1>
            <Link to="/admin/add-brand"><button type="button" className="btn btn-success ml-1 mb-4"><CgAdd/> Thêm nhà cung cấp</button></Link>
            <table className="table table-bordered table-sm">
                <tr>
                    <th>ID</th>
                    <th>Tên nhà cung cấp</th>
                    <th>Slug</th>
                    <th>Địa chỉ</th>
                    <th>Hành động</th>
                </tr>

                {
                    brandList.map((brand, index) => {
                        return (
                            <tr key={index}>
                                <td>{brand.id}</td>
                                <td>{brand.name}</td>
                                <td>{brand.slug}</td>
                                <td>{brand.address}</td>
                                <td>
                                    <Link to={`/admin/edit-brand/${brand.id}`}><button type="button" className="btn btn-warning ml-2"><AiFillEdit/></button></Link>
                                    <Link to=""><button type="button" className="btn btn-danger ml-2" onClick={()=>delBrand(brand.id)}><FaDeleteLeft/></button></Link>
                                </td>
                            </tr>

                        )
                    })
                }
            </table>
        </> :
        <div className="justify-content-center cart " style={{ textAlign: 'center' }}>
        <h1>Bạn cần đăng nhập để xem danh sách nhà cung cấp</h1>
        <button type="button" className="btn btn-success" style={{ margin: "20px" }}><Link to="/admin/loginAdmin" className="text-white text-decoration-none">Đăng nhập</Link></button>
    </div>
    )
}
export default BrandList;