import '../frontend/assets/css/bootstrap.min.css';
import '../frontend/assets/css/style.css';
import '../frontend/assets/css/responsive.css';
import '../frontend/assets/css/jquery.mCustomScrollbar.min.css';
import '../frontend/assets/css/owl.carousel.min.css';
import '../frontend/assets/css/font-awesome.min.css';
// import trolly from '../frontend/assets/images/search-icon.png';
import Header from './partial/header';
import Footer from './partial/footer';
import { Outlet } from 'react-router-dom';


function Index() {
    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>

            <Footer />
        </>

    );
}

export default Index;