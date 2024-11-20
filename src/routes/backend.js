import IndexAdmin from "../backend"
import CategoryList from "../backend/pages/category/list";
import AddList from "../backend/pages/category/add";
import EditCat from "../backend/pages/category/edit";
import ProductsList from "../backend/pages/product/list";
import AddProduct from "../backend/pages/product/add";
import EditProduct from "../backend/pages/product/edit";
import UserList from "../backend/pages/user/list";
import BrandList from "../backend/pages/brand/list";
import AddBrand from "../backend/pages/brand/add";
import EditBrand from "../backend/pages/brand/edit";
import OrderList from "../backend/pages/order/list";
import OrderDetail from "../backend/pages/order/orderDetail";
import LoginAdmin from "../backend/pages/user/login";
import ViewUser from "../backend/pages/user/view";


const BackendRoute = [
    {'path': "/admin/category-list", 'component': CategoryList},
    {'path': "/admin/add-list", 'component': AddList},
    {'path': "/admin/edit-list/:id", 'component': EditCat},
    {'path': "/admin/product-list/:page", 'component': ProductsList},
    {'path': "/admin/product-list/:slug", 'component': ProductsList},
    {'path': "/admin/add-product", 'component': AddProduct},
    {'path': "/admin/edit-product/:id", 'component': EditProduct},
    {'path': "/admin/user-list", 'component': UserList},
    {'path': "/admin/brand-list", 'component': BrandList},
    {'path': "/admin/add-brand", 'component': AddBrand},
    {'path': "/admin/edit-brand/:id", 'component': EditBrand},
    {'path': "/admin/order-list", 'component': OrderList},
    {'path': "/admin/orderDetail/:id", 'component': OrderDetail},
    {'path': "/admin/view-user/:id", 'component': ViewUser},
    {'path': "/admin/loginAdmin", 'component': LoginAdmin},




]

export default BackendRoute;