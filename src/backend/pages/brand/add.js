import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiBrand from "../../../api/apiBrand";

function AddBrand(){
    const [brandName, setBrandName] = useState("");
    const [address, setAddress] = useState("");
    const [slug, setSlug] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const brand = { brand_name: brandName, slug: slug, address: address };
            const response = await apiBrand.createBrand({data :brand});

            console.log(response);
            console.log('Add brand successful: ', response);
            alert('Add brand successful');
            navigate('/admin/brand-list');
        } catch (e) {
            console.log('Add brand error: ' + e);
        }
    }
    return(
        <div className="container mt-3" style={{ border: "1px solid black", height: "100%", marginBottom: "30px" }}>
            <h1 className="text-success" style={{ textAlign: "center" }}>Thêm nhà cung cấp</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label for="name"><b>Tên nhà cung cấp:</b></label>
                    <input type="text" className="form-control" id="name" name="name" value={brandName} onChange={(e)=> setBrandName(e.target.value)} />
                </div>

                <div className="mb-3 mt-3">
                    <label for="address"><b>Địa chỉ:</b></label>
                    <input type="text" className="form-control" id="address" name="address" value={address} onChange={(e)=> setAddress(e.target.value)} />
                </div>

                <div className="mb-3 mt-3">
                    <label for="slug"><b>Slug:</b></label>
                    <input type="text" className="form-control" id="slug" name="slug" value={slug} onChange={(e)=> setSlug(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-success" style={{ margin: "20px" }}>Thêm nhà cung cấp</button>
            </form>
        </div>
    )
}
export default AddBrand;