import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function LogoutUser(){
    const {setUser} = useContext(UserContext);
    const navigative = useNavigate();
    useEffect(() => {
        setUser("");
        navigative("/");
    });
     return(
       <div>
            <h1>Đăng xuất thành công!</h1>
       </div>

     )
}
export default LogoutUser;