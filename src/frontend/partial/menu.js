import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import '../assets/css/jquery.mCustomScrollbar.min.css';
import '../assets/css/owl.carousel.min.css';
import '../assets/css/font-awesome.min.css';
import trolly from '../assets/images/trolly-icon.png';
import { Link } from 'react-router-dom';
import apiCategory from '../../api/apiCategory';
import { useEffect, useState } from 'react';
import UserContext from '../context/userContext';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import apiBrand from '../../api/apiBrand';

function Menu() {
    const { user } = useContext(UserContext);
    const getData = useSelector((state) => state.cart.carts);
    if (user) {
        var username = user.username;
    }
    else {
        var username = "";
    }
    const [subMenu, setSubMenu] = useState([]);
    const [brandMenu, setBrandMenu] = useState([]);

    useEffect(() => {
        apiCategory.getAll().then((res) => {
            try {
                console.log("res:", res);
                const menuData = res.data.map((item) => {
                    return {
                        id: item.id,
                        name: item.attributes.category_name,
                        slug: item.attributes.slug,
                        parent_id: item.attributes.parent_id
                    };
                });
                console.log(menuData);
                setSubMenu(menuData);
            } catch (e) {
                console.log("Error:", e);
            }
        });
    }, []);

    useEffect(() => {
        apiBrand.getAll().then((res) => {
            try {
                console.log("res:", res);
                const menuData = res.data.map((item) => {
                    return {
                        id: item.id,
                        name: item.attributes.brand_name,
                        slug: item.attributes.slug,
                    };
                });
                console.log(menuData);
                setBrandMenu(menuData);
            } catch (e) {
                console.log("Error:", e);
            }
        });
    }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="" className="logo"><img src={require('../assets/images/logo.png')} alt="logo" /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span><img src="images/toggle-icon.png" style={{ height: '30px' }} alt=''/></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active" >
                        <Link to="" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="/product" className="nav-link">Shop</Link>
                        <ul className='dropdown-content'>
                            {
                                subMenu.map((menu, index) => {
                                    return (
                                        <li><Link to={`/product-by-cat/${menu.slug}`}>{menu.name}</Link></li>
                                    )
                                })
                            }
                        </ul>   
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="/product" className="nav-link">Brand</Link>
                        <ul className='dropdown-content'>
                            {
                                brandMenu.map((menu, index) => {
                                    return (
                                        <li><Link to={`/product-by-brand/${menu.slug}`}>{menu.name}</Link></li>
                                    )
                                })
                            }
                        </ul>   
                    </li>
                    <li className="nav-item">
                        <Link to="/news" className="nav-link">News</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link">Contact us</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Sign up</Link>
                    </li>
                    {
                        user ? (
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link">Sign out</Link>
                                </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Sign in</Link>
                                </li>
                        )
                    }
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <div className="login_menu">
                        <ul>
                            <li><Link to="/cart"><img src={trolly} alt="" /> {getData.length}</Link></li>
                            <li><Link to="/"><img src={require('../assets/images/search-icon.png')} alt="search" /></Link></li>
                            <li><Link to="/"><img src="../images/account.png" alt="" style={{ width: "20px", height: "20px" }} /> {username}</Link></li>
                        </ul>
                    </div>
                </form>
            </div>

        </nav>

    );
}
export default Menu;