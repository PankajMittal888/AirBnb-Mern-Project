import React, { useContext, useEffect, useState } from "react";
import { CreateListingContext } from "../context/ListingContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { CurrentUserContext } from "../context/UserContext";
import axios from "axios";
import { authProvider } from "../context/AuthContext";
import { FaStar } from "react-icons/fa6";
import { BookDataContext } from "../context/BookingContext";
import { toast } from "react-toastify";
// import { getListing } from "../../../../backend/controller/listing.controller";

const ViewCard = () => {
  // let {}=useContext(CreateListingContext);\
  let { server } = useContext(authProvider);
  let { card, setCard, updateList, setUpdateList, deleteList, setDeleteList } =
    useContext(CreateListingContext);
    let {checkIn,setCheckIn,CheckOut,setCheckOut,night,setNight,total,setTotal,HandleBooking}=useContext(BookDataContext)
  const [showpop, setShowpop] = useState(false);
  const[bookpop,setBookpop]=useState(false);

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [backendImage1, setBackendImage1] = useState("");
  const [backendImage2, setBackendImage2] = useState("");
  const [backendImage3, setBackendImage3] = useState("");
  const [city, setCity] = useState(card.city);
  const [rent, setRent] = useState(card.rent);
  const [landMark, setLandMark] = useState(card.landMark);
  const[minDate,setMinDate]=useState("");
  
  const { currentUser } = useContext(CurrentUserContext); 
   
  const navigate = useNavigate();
  const HandleUpdate = async () => {
    setUpdateList(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (backendImage1) {
      formData.append("image1", backendImage1);
    }
    if (backendImage2) {
      formData.append("image2", backendImage2);
    }
    if (backendImage3) {
      formData.append("image3", backendImage3);
    }
    formData.append("city", city);
    formData.append("rent", rent);
    formData.append("landMark", landMark);
    // formData.append("category",category);
    // setAddListing(true)
    try {
      let result = await axios.post(
        server + `/api/listing/update/${card._id}`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      setUpdateList(false);
      toast.success("Listing Update Successfully");
      navigate("/");

      // setAddListing(false)
    } catch (error) {
      console.log("error come in listing context", error);
      toast.error(error.response.data.message);
    }
  };

  const handleImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    switch (index) {
      case 1:
        setBackendImage1(file);
        break;
      case 2:
        setBackendImage2(file);
        break;
      case 3:
        setBackendImage3(file);
        break;
      default:
        break;
    }
  };

  const HandleDelete = async () => {
    setDeleteList(true);
    try {
      let result = await axios.delete(
        server + `/api/listing/delete/${card._id}`,
        { withCredentials: true }
      );
    
      console.log(result.data);
      navigate("/");
        toast.success("List Deleted");
      setDeleteList(false);
    } catch (error) {
      console.log("erroe come in delteing context", error);
        toast.error(error.response.data.message);
    }
  };


  useEffect(()=>{
    let today=new Date().toISOString().split('T')[0]
    setMinDate(today)
  },[])

  useEffect(()=>{
    if(checkIn && CheckOut){
      let inDate=new Date(checkIn);
      let outDate=new Date(CheckOut);
      let n=(outDate-inDate)/(24*60*60*1000)
      setNight(n);
      let baserent=card.rent*n;
      let airbnbCharge=(baserent*(7/100));
      let tax=(baserent*(7/100));
      if(n>0){
        setTotal((baserent)+airbnbCharge+tax)
      }else{
        setTotal(0)
      }
    }
  },[checkIn,CheckOut,card.rent,total])

  return (
    <>


     <div
  className={`min-h-screen md:h-[100vh] w-full bg-gray-50 relative flex flex-col items-center justify-start ${
    !showpop && !bookpop ? "p-2" : "p-0"
  }`}
>
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 bg-gradient-to-r  from-[#11244d] to-[#90aace] text-white p-4 rounded-full shadow-md hover:scale-105 transition-all z-10"
          aria-label="Go back"
        >
          <FaArrowLeftLong size={20} />
        </button>

        {/* Location Display */}
        <div className="text-lg font-semibold text-gray-700   mb-4 flex items-start w-[85%] md:mt-7 mt-15  sm:mt-20">
          <span className="text-[#0e1d3d]">
            {" "}
            IN {card.landMark.toUpperCase()}{" "}
          </span>{" "}
          , <span className="text-[#36435f]"> {card.city.toUpperCase()}</span>
        </div>

        {/* Image Section */}
        <div className="flex flex-col gap-0.5 md:flex-row w-full md:w-[90%] max-w-6xl">
          {/* LEFT SIDE IMAGE */}
          <div className="md:w-[60%] w-full h-[200px] md:h-[52vh]">
            <img
              src={card.image1}
              alt="Front View 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT SIDE 2 IMAGES */}
          <div className="flex flex-col gap-0.5 md:w-[38%] w-full">
            <div className="h-[200px] md:h-[26vh]">
              <img
                src={card.image2}
                alt="Front View 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[200px] md:h-[26vh]">
              <img
                src={card.image3}
                alt="Front View 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 flex flex-col  items-start w-[85%]  space-y-3 w-ful px-4 md:px-1 sm:px-0 ">
          <h1 className="text-xl font-bold text-gray-800">
            {card.title.toUpperCase()} — {card.category.toUpperCase()}
          </h1>
          <h2 className="text-gray-800 text-xl">{card.description}</h2>
          <p className="text-gray-800 text-lg font-semibold">
            Rent: ₹{card.rent}
          </p>
        </div>

        {/* Button */}
        <div className="mt-6 md:w-[86%] w-[85%]  flex items-start md:px-1 px-1   sm:px-0">
          {card.host == currentUser.user._id && (
            <button
              type="submit"
              className="w-[70%] sm:w-[60%] md:w-[30%] lg:w-[25%] border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white text-lg font-medium py-3 rounded-xl hover:scale-102 transition-all shadow-lg"
              onClick={() => setShowpop(true)}
            >
              Edit Listing
            </button>
          )}

          {card.host !== currentUser.user._id && (
            <button
              type="submit"
              className="w-[70%] sm:w-[60%] md:w-[30%] lg:w-[25%] border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white text-lg font-medium py-3 rounded-xl hover:scale-102 transition-all shadow-lg"
              onClick={()=>setBookpop(true)}
            >
              Booking
            </button>
          )}
        </div>

        {/* now the update popup will come */}

        {showpop && (
          <div className="w-[100vw] h-full z-[100] flex items-center absolute justify-center bg-gray-500/30 backdrop-blur-md p-0">
            {/* Close Button */}
            <button
              onClick={() => setShowpop(false)}
              className="absolute top-4 left-4 bg-gradient-to-r from-[#11244d] to-[#90aace] text-white p-3 rounded-full shadow-md hover:scale-105 transition-all z-10"
              aria-label="Go back"
            >
              <RxCross2 size={20} />
            </button>

            {/* Top Info Tag */}
            <div className="absolute top-6 right-6 border border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white px-6 py-3 rounded-full shadow-md text-md font-medium z-10 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2">
              Update Your Details
            </div>

            {/* Form Container */}
            <div className="w-full  max-w-3xl mt-10 md:mt-4 max-h-[100vh] bg-gradient-to-br from-[#e9f1fa] to-[#d8e4f3] rounded-xl shadow-2xl overflow-hidden border border-[#aac3e9]">
              <div
                className="max-h-[85vh] overflow-y-auto p-8 md:p-12 scrollbar-hide"
                style={{ scrollbarWidth: "none" }}
              >
                {/* Heading */}
                <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#0e1d3b] to-[#98b0d1] bg-clip-text text-transparent">
                  Update Your Property
                </h2>

                {/* Form */}
                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* Grid Inputs */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700 font-medium">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="Sunny 2BHK Apartment"
                        className="rounded-xl border border-[#aec4e7] bg-white text-[#0e1d3b] p-3 focus:ring-2 focus:ring-[#91aad3] outline-none transition-all"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700 font-medium">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Delhi"
                        className="rounded-xl border border-[#aec4e7] bg-white text-[#0e1d3b] p-3 focus:ring-2 focus:ring-[#91aad3] outline-none transition-all"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    {/* Landmark */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700 font-medium">
                        Landmark
                      </label>
                      <input
                        type="text"
                        placeholder="Near Metro Station"
                        className="rounded-xl border border-[#aec4e7] bg-white text-[#0e1d3b] p-3 focus:ring-2 focus:ring-[#91aad3] outline-none transition-all"
                        value={landMark}
                        onChange={(e) => setLandMark(e.target.value)}
                      />
                    </div>

                    {/* Rent */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700 font-medium">
                        Rent (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="12000"
                        className="rounded-xl border border-[#aec4e7] bg-white text-[#0e1d3b] p-3 focus:ring-2 focus:ring-[#91aad3] outline-none transition-all"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700 font-medium">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write something about the property..."
                      className="rounded-xl border border-[#aec4e7] bg-white text-[#0e1d3b] p-3 focus:ring-2 focus:ring-[#91aad3] outline-none transition-all resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Image Uploads */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((img) => (
                      <div key={img} className="flex flex-col gap-1">
                        <label className="text-sm text-gray-700 font-medium">
                          Image {img}
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          className="file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition text-sm"
                          onChange={(e) => handleImage(e, img)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-5 w-full">
                    <button
                      type="submit"
                      className="w-full sm:w-[50%] md:w-[30%] mt-4 border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white text-lg font-medium py-2.5 rounded-xl hover:from-[#132a4a] hover:to-[#a0bad8] transition-all shadow-lg"
                      onClick={HandleUpdate}
                      disabled={updateList}
                    >
                      {updateList ? "Updateing..." : "Update List"}
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-[50%] md:w-[30%] mt-4 border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white text-lg font-medium py-2.5 rounded-xl hover:from-[#132a4a] hover:to-[#a0bad8] transition-all shadow-lg"
                      onClick={HandleDelete}
                      disabled={deleteList}
                    >
                      {deleteList ? "Deleting..." : "Delete List"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}


          {bookpop && 
              <div className="w-[100%] h-full z-[100] flex items-center absolute justify-center bg-[#f8faff93] backdrop-blur-md p-0">
            {/* Close Button */}
            <button
              onClick={() => setBookpop(false)}
              className="absolute top-4 left-4 bg-gradient-to-r from-[#11244d] to-[#90aace] text-white p-3 rounded-full shadow-md hover:scale-105 transition-all z-10"
              aria-label="Go back"
            >
              <RxCross2 size={20} />
            </button>

              <div className="w-[95%] md:w-[80%] md:h-[70%]  gap-4 md:gap-1    p-5 flex items-center flex-col md:flex-row justify-around ">

                <div className="md:w-[45%] w-[100%] rounded-md h-[95%] flex p-5 items-center flex-col bg-gray-100">

                  <h1 className="text-[#11244d] text-center text-2xl pb-2 border-b-2  border-gray-700 w-full font-bold">Confirm & Book </h1>


                  <div className="w-full h-[70%] p-2 items-start flex md:gap-3 gap-2 flex-col  md:m-2 m-0 ">
                    <h2 className="text-xl font-semibold">Your  Trip :-</h2>
                    <form action="" onSubmit={(e)=>e.preventDefault()}>
                    <div className="flex flex-col  md:flex-row md:gap-3 gap-1 md:items-center items-start px-5 md:px-1 justify-center w-full p-1 mt-2.5 ">
                      <label htmlFor="checkIn" className="text-[20px] ">CheckIn :-</label>
                      <input type="date" min={minDate} id="checkIn" name="checkIn" className="bg-gray-200 py-2 px-6 border border-gray-800 rounded-lg" onChange={(e)=>setCheckIn(e.target.value)} value={checkIn}  />
                    </div>

                 <div className="flex flex-col  md:flex-row md:gap-3 gap-1 md:items-center items-start px-5 md:px-1 justify-center w-full p-1 mt-2.5 ">
                      <label htmlFor="checkIn" className="text-[20px] ">CheckOut :-</label>
                      <input type="date" min={minDate} id="checkIn" name="checkOut" className="bg-gray-200 py-2 px-6 border border-gray-800 rounded-lg mr-5" onChange={(e)=>setCheckOut(e.target.value)} value={CheckOut} />
                      </div>
                    </form>

                    <button
              type="submit"
              onClick={()=>{HandleBooking(card._id);navigate('/booked')}}
              className="w-[60%] sm:w-[60%] md:w-[50%] lg:w-[50%] border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white text-lg ml-5 md:ml-0 font-medium py-2 md:self-center mt-6 rounded-xl hover:scale-102 transition-all shadow-lg"
            >
              Book Now
            </button>
                    
                  </div>




                </div>
                <div className="md:w-[45%] w-[100%] rounded-md h-[95%] flex p-2 flex-col gap-2 items-center justify-center bg-gray-100">

                  <div className="w-[95%] h-[30%] flex items-center rounded-lg justify-between border border-gray-400 gap-4 p-2 overflow-hidden">
                    <div className="w-[40%] h-[100%] p-2 rounded-xl flex items-center justify-center flex-shrink-0 ">
                      <img src={card.image1} className="rounded-xl" alt="" />
                    </div>

                      <div className="w-[60%] h-[100%]  flex items-center flex-col gap-1.5 justify-center flex-shrink-0 ">
                        <h1 className="w-[95%] truncate">IN, {card.landMark.toUpperCase()} , {card.city.toUpperCase() }</h1>
                      
                     <h2 className="w-[95%] truncate text-[13px]">{card.title.toUpperCase()}</h2>
                      <h2 className="w-[95%] truncate text-[12px]">{card.category.toUpperCase()}</h2>
                      {/* <h1>bjkqsbhih</h1> */}
                      <h2 className="flex gap-2 items-center justify-start w-[95%]"><FaStar className="text-[14px]"/> {card.rating}</h2>
                    </div>
                    
                  </div>

                  <div className="w-[95%] h-[60%] flex flex-col items-start rounded-lg justify-start border border-gray-400 gap-3 p-3 px-6 overflow-hidden">
                    <h1 className="text-[20px] font-semibold">Booking Price :-</h1>
                    <p className="flex items-center justify-between w-[100%] text-[17px]">
                      <span className="font-semibold">
                          {`₹ ${card.rent} X ${night} nights`}
                      </span>
                      <span>
                        {card.rent*night}
                      </span>
                    </p>


                    <p className="flex items-center justify-between w-[100%] text-[17px]">
                      <span className="font-semibold">
                           AirBnb Charge
                      </span>
                      <span>
                        {card.rent*night*(7/100)}
                      </span>
                    </p>

                    <p className="flex items-center pb-1.5 border-b-2 border-gray-600 justify-between w-[100%] text-[17px]">
                      <span className="font-semibold">
                      Tax
                      </span>
                      <span>
                       {card.rent*night*(7/100)}
                      </span>
                    </p>

                          <p className="flex items-center pb-2 md:pb-0  justify-between w-[100%] text-[17px]">
                      <span className="font-semibold">
                      Total
                      </span>
                      <span>
                       ₹{Math.round(total)}
                      </span>
                    </p>

                  </div>

                </div>

              </div>
            </div>
          }

      </div>
    </>
  );
};

export default ViewCard;
