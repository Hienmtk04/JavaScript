import UserContext from "../../context/userContext";
import { useContext } from "react";
function AddOrder(){
    const { user } = useContext(UserContext);

    const [user_id] = user.id;

    return(
        <h1>Don hang da duoc luu vao he thong</h1>
    )
}
export default AddOrder;