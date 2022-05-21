
import './App.css';
import Header from './Pages/Shared/Header/Header';
import Home from './Pages/Home/Home/Home';
import Footer from './Pages/Shared/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import ServiceDetails from './Pages/ServiceDetails/ServiceDetails';
import NotFound from './Pages/Shared/NotFound/NotFound';
import Ragister from './Pages/Register/Ragister';
import CheckOut from './Pages/CheckOut/CheckOut';
import RequireAuth from './Pages/Shared/RequireAuth/RequireAuth';
import AddService from './Pages/AddService/AddService';
import ManageService from './Pages/ManageService/ManageService';
import Orders from './Pages/Orders/Orders';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>} ></Route>
        <Route path='/home' element={<Home></Home>} ></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/service/:serviceId' element={
          <RequireAuth>
            <ServiceDetails></ServiceDetails>
          </RequireAuth>}></Route>
        <Route path='/checkout' element={
          <RequireAuth>
            <CheckOut></CheckOut>
          </RequireAuth>
        } ></Route>
        <Route path='/addservice' element={
          <RequireAuth>
            <AddService></AddService>
          </RequireAuth>
        } ></Route>
        <Route path='/manage' element={
          <RequireAuth>
            <ManageService></ManageService>
          </RequireAuth>
        } ></Route>
        <Route path='/orders' element={
          <RequireAuth>
            <Orders></Orders>
          </RequireAuth>
        } ></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Ragister></Ragister>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
