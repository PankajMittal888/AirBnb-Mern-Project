import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import logo from '../assets/logo.png';

import { IoSearch, IoPersonCircleOutline, IoBedOutline } from 'react-icons/io5';
import { GiHamburgerMenu, GiFamilyHouse, GiWoodCabin } from 'react-icons/gi';
import { MdWhatshot, MdBedroomParent, MdOutlinePool } from 'react-icons/md';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { FaTreeCity } from 'react-icons/fa6';
import { BiBuildingHouse } from 'react-icons/bi';

import { authProvider } from '../context/AuthContext';
import { CurrentUserContext } from '../context/UserContext';
import { CreateListingContext } from '../context/ListingContext';
import { useEffect } from 'react';


const NavBar = () => {

  const [show, setShow] = useState(false);
  const[cat,setCat]=useState("");
  const[input,setInput]=useState("")

  const { server } = useContext(authProvider);
  // const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const{currentUser,setCurrentUser}=useContext(CurrentUserContext)
  const {newListData,setNewListData, listData,setListDate,HandleSearch,searchData,setSearchData,ViewCard}=useContext(CreateListingContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${server}/api/auth/logout`, {}, { withCredentials: true });
      console.log(res);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const HandleCategory=(category)=>{
    setCat(category);

    if(category=="Trending"){
      setNewListData(listData)
    }else{
       setNewListData(listData.filter((item)=>item.category==category));
    }
   
  }


   const HandleViewCard=(id)=>{
    if(currentUser){
            ViewCard(id);
    }else{
            navigate('/login')
    }
  }


  useEffect(()=>{
    HandleSearch(input)
  },[input])


  return (
    <>
      {/* Top Navbar */}
      <div className="w-full px-2 md:px-6 py-3 md:py-4 flex items-center justify-between border-b border-gray-700 bg-gradient-to-r from-[#0f182c] to-[#647792] shadow-md relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Cozystay Logo" className="h-12 w-auto object-contain border rounded-lg" />
        </div>

        {/* Search Box */}
        <div className="w-[45%] md:w-[40%] relative flex mt-2 sm:mt-0">
          <input
            type="text"
            placeholder="Anywhere | Any location | Any city"
            className="w-full md:py-3 py-2 px-4 pr-10 rounded-full bg-white/90 text-gray-800 placeholder-gray-500 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            onChange={(e)=>setInput(e.target.value)}
            value={input}
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 text-white rounded-full md:w-8 md:h-8 flex items-center justify-center w-6 h-6">
            <IoSearch className="text-lg" />
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 relative">
          {/* List your home */}
          <h2
            className="text-white text-sm md:text-base font-medium cursor-pointer transition-all hidden sm:block hover:bg-gray-300 rounded-3xl p-2 px-3 hover:text-blue-950"
            onClick={() => {
              navigate('/Listpage1');
              setShow(false);
            }}
          >
            List your home
          </h2>

          {/* User / Menu Icon */}
          <div
            className="flex items-center gap-1 p-2 border border-white rounded-full hover:shadow-lg cursor-pointer text-white"
            onClick={() => setShow(prev => !prev)}
          >
            <GiHamburgerMenu className="text-lg" />
            {currentUser ? (
              <span className="w-[30px] h-[30px] bg-blue-950 text-white flex items-center justify-center rounded-full">
                {currentUser?.user?.name?.charAt(0).toUpperCase()}
              </span>
            ) : (
              <IoPersonCircleOutline className="text-xl" />
            )}
          </div>

          {/* Dropdown Menu */}
          {show && (
            <div className="absolute top-11 right-0 w-48 sm:w-56 bg-white rounded-xl shadow-xl p-4 z-50">
              <ul className="flex flex-col gap-2 text-sm text-gray-700">
                {!currentUser && (
                  <li
                    className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                    onClick={() => {
                      navigate('/login');
                      setShow(false);
                    }}
                  >
                    Login
                  </li>
                )}

                {currentUser && (
                  <li
                    className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                    onClick={() => {
                      handleLogout();
                      setShow(false);
                    }}
                  >
                    Logout
                  </li>
                )}

                <div className="w-full h-[1px] bg-gray-300 my-2" />

                <li
                  className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                  onClick={() => {
                    navigate('/Listpage1');
                    setShow(false);
                  }}
                >
                  List Your Home
                </li>
                <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer" onClick={()=>navigate('/MyListing')}>My Listings</li>
                <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer" onClick={()=>navigate('/mybooking')}>Check Bookings</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {searchData?.length>0 &&<div className='w-[100%] h-[450px] flex items-center justify-center flex-col top-0 z-30 gap-4 absolute  left-0 overflow-auto'>
        <div className='w-[90%] md:w-[55%] h-[300px]  overflow-hidden flex flex-col bg-[#fefdfd] p-5 rounded-lg border-1 cursor-pointer border-gray-400'>
          {
            searchData.map((search)=>(
           <div className='border-b border-black p-1.5 text-[20px]' onClick={()=>HandleViewCard(search._id)}>
                  {search.title} in {search.landMark},{search.city}
              </div>
            ))
          }

        </div>
      </div>}

      {/* Category Icons Row */}
      <div className="flex items-center justify-start md:justify-center h-[60px] gap-14 mt-2 px-2 overflow-auto scrollbar-hide">
        {[
          { icon: <MdWhatshot />, label: 'Trending' },
          { icon: <GiFamilyHouse />, label: 'House' },
          { icon: <MdBedroomParent />, label: 'Bedroom' },
          { icon: <MdOutlinePool />, label: 'Pool' },
          { icon: <GiWoodCabin />, label: 'Cabin' },
          // { icon: <SiHomeassistantcommunitystore />, label: 'Community' },
          { icon: <IoBedOutline />, label: 'Bed' },
          { icon: <FaTreeCity />, label: 'FarmHouse' },
          { icon: <BiBuildingHouse />, label: 'Building' },
        ].map((item, index) => (
          <div key={index} className={`flex flex-col items-center justify-center hover:border-b cursor-pointer ${cat==item.label ? "border-b-2":""}`} onClick={()=>{HandleCategory(item.label)}}>
            {React.cloneElement(item.icon, { className: 'text-[25px]' })}
            <h2 className="text-[12px]">{item.label}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default NavBar;
