import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import '../assets/css/jquery.mCustomScrollbar.min.css';
import '../assets/css/owl.carousel.min.css';
import '../assets/css/font-awesome.min.css';
import trolly from '../assets/images/search-icon.png';
import { Link } from 'react-router-dom';
import Menu from './menu';
import React from 'react';
function Header() {
    return (
        <>

            <div className="header_section header_bg">
                <Menu />
                <div className="banner_section layout_padding">
                    <div id="main_slider" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="best_text">Best</div>
                                            <div className="image_1"><img src="../images/img-1.png" /></div>
                                        </div>
                                        <div className="col-md-5">
                                            <h1 className="banner_taital">New Model Cycle</h1>
                                            <p className="banner_text">It is a long established fact that a reader will be distracted by the readable content </p>
                                            <div className="contact_bt"><Link to="/contact">Shop Now</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="best_text">Best</div>
                                            <div className="image_1"><img src="images/img-1.png" /></div>
                                        </div>
                                        <div className="col-md-5">
                                            <h1 className="banner_taital">New Model Cycle</h1>
                                            <p className="banner_text">It is a long established fact that a reader will be distracted by the readable content </p>
                                            <div className="contact_bt"><Link to="/contact">Shop Now</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="best_text">Best</div>
                                            <div className="image_1"><img src="images/img-1.png" /></div>
                                        </div>
                                        <div className="col-md-5">
                                            <h1 className="banner_taital">New Model Cycle</h1>
                                            <p className="banner_text">It is a long established fact that a reader will be distracted by the readable content </p>
                                            <div className="contact_bt"><Link to="/contact">Shop Now</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to="" className="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </Link>
                        <Link to="" className="carousel-control-next" href="#main_slider" role="button" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
