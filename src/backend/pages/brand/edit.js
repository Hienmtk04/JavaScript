import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiBrand from "../../../api/apiBrand";

function EditBrand(){
    const {id} = useParams();
    const [brandName, setBrandName] = useState("");
    const [slug, setSlug] = useState("");
    const [address, setAddress] = useState("");
    const [Brand, setBrand] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        apiBrand.getBrandById(id).then(res => {
            try {
                console.log(res);
                const brandData = res.data.data.attributes; 
                setBrandName(brandData.brand_name);
                setAddress(brandData.address);
                setSlug(brandData.slug);
            }
            catch (e) {
                console.log("Error:", e);
            }
        })
    },[]);

    useEffect(() => {
        apiBrand.getAll().then((res) => {
            try {
                console.log(res);
                const brand = res.data.map((brand) => {
                    return {
                        id: brand.id,
                        name: brand.attributes.brand_name,
                        slug: brand.attributes.slug,
                        address: brand.attributes.address
                    };
                });
                setBrand(brand);
            }
            catch (e) {
                console.log("Error:", e);
            }
        })
    },[]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const brand = { 
                brand_name: brandName, 
                slug: slug, 
                address: address
            };
            const response = await apiBrand.editBrand(id,{data :brand});

            console.log(response);
            console.log('Edit brand successful: ', response);
            alert('Edit brand successful');
            navigate('/admin/brand-list');
        } catch (e) {
            console.log('Edit brand error: ' + e);
        }
    }
    return(
        <div className="container mt-3" style={{ border: "1px solid black", height: "100%", marginBottom: "30px" }}>
        <h1 className="text-success" style={{ textAlign: "center" }}>Sửa thông tin nhà cung cấp</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
                <label htmlFor="name"><b>Tên nhà cung cấp:</b></label>
                <input type="text" className="form-control" id="name" name="name" value={ brandName} onChange={(e)=> setBrandName(e.target.value)} />
            </div>

            <div className="mb-3 mt-3">
                <label htmlFor="slug"><b>Slug:</b></label>
                <input type="text" className="form-control" id="slug" name="slug" value={slug} onChange={(e)=> setSlug(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="address">Địa chỉ</label>
                <input type="text" className="form-control" id="address" name="address" value={address} onChange={(e)=> setAddress(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-success" style={{ margin: "20px" }}>Sửa thông tin</button>
        </form>
    </div>
    )
}
export default EditBrand;