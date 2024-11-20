import Home from "../frontend/pages/home/home";
import About from "../frontend/pages/about/about";
import Contact from "../frontend/pages/contact/contact";
import Product from "../frontend/pages/product/product";
import News from "../frontend/pages/news/news";
import NotFound from "../frontend/pages/notFound";
import ProductDetail from "../frontend/pages/product/productDetail";
import ProductByCat from "../frontend/pages/product/productByCat";
import Registor from "../frontend/pages/user/register";
import LoginUser from "../frontend/pages/user/login";
import LogoutUser from "../frontend/pages/user/logout";
import Cart from "../frontend/pages/cart/cart";
import CheckOut from "../frontend/pages/cart/checkOut";
import AddOrder from "../frontend/pages/cart/addOrder";
import ProductByBrand from "../frontend/pages/product/productByBrand";
const FrontendRoute = [
    {'path': '','component': Home},
    {'path': '/about','component': About},
    {'path': '/contact','component': Contact},
    {'path': '/product','component': Product},
    {'path': '/news','component': News},
    {'path': '*','component': NotFound},
    {'path': '/product-detail/:slug', 'component': ProductDetail},
    {'path': '/product-by-cat/:slug', 'component': ProductByCat},
    {'path': '/register', 'component': Registor},
    {'path': '/login', 'component': LoginUser},
    {'path': '/logout', 'component': LogoutUser},
    {'path': '/cart', 'component': Cart},
    {'path': '/checkout', 'component': CheckOut},
    {'path': '/addorder', 'component': AddOrder},
    {'path': '/product-by-brand/:slug', 'component': ProductByBrand}



];
export default FrontendRoute; 