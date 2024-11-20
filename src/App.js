import logo from './logo.svg';
import './App.css';
import Index from './frontend/Index';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontendRoute from './routes/frontend';
import { UserProvider } from './frontend/context/userContext';
import store from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import BackendRoute from './routes/backend';
import IndexAdmin from './backend';
function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Index />} >
              {
                FrontendRoute.map((router, index) => {
                  const Page = router.component;
                  return <Route key={index} path={router.path} element={<Page />} />;
                })
              }
            </Route>
            {/* -------------------------------------------------- */}
            <Route path='/admin' element={<IndexAdmin />} >
              {       
                BackendRoute.map((router, index) => {
                  const Page = router.component;
                  return <Route key={index} path={router.path} element={<Page />} />;
                })
              }
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
}

export default App;
