import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom';

  import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ListingPage1 from './pages/ListingPage1';
import ListingPage2 from './pages/ListingPage2';
import ListingPage3 from './pages/ListingPage3';
import MyListing from './pages/MyListing';
import ViewCard from './pages/ViewCard';
import { useContext } from 'react';
import { CurrentUserContext } from './context/UserContext';
import MyBooking from './pages/MyBooking';
import Booked from './pages/Booked';
function App() {
    let {currentUser}=useContext(CurrentUserContext)
  return (
  <>
  {/* <h1>hkgyufgjb</h1> */}
  <ToastContainer/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Listpage1' element={currentUser!==null?<ListingPage1/>:<Navigate to={"/login"}/>}/>
  <Route path='/Listpage2' element={currentUser!==null?<ListingPage2/>:<Navigate to={"/"}/>}/>
  <Route path='/Listpage3' element={currentUser!==null?<ListingPage3/>:<Navigate to={"/"}/>}/>
  <Route path='/MyListing' element={currentUser!==null?<MyListing/>:<Navigate to={"/"}/>}/>
  <Route path='/viewcard' element={currentUser!==null?<ViewCard/>:<Navigate to={"/"}/>}/>
       <Route path='/mybooking' element={currentUser!==null?<MyBooking/>:<Navigate to={"/"}/>}/>
        <Route path='/booked' element={currentUser!==null?<Booked/>:<Navigate to={"/"}/>}/>
     </Routes>
  </>
  )
}

export default App


// import React from 'react'

// const App = () => {
//   return (
//     <div>App kl4nrjo4rufjonefonofwjlenfownfjlfuonfjlnfuoeflnefouwnelfnjenfjoenf</div>
//   )
// }

// export default App