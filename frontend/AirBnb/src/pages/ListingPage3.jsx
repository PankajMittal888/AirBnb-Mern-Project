import React, { useContext } from 'react';
import { CreateListingContext } from '../context/ListingContext';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const ListingPage3 = () => {
  const {
    title, description,
    frontendImage1, frontendImage2, frontendImage3,
    landMark, city,
    rent, category,
     HandleListing,
     addListing,setAddListing
  } = useContext(CreateListingContext);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen md:[h-100vh] w-full bg-gray-50 p-2 relative flex flex-col items-center justify-start">
      {/* Back Button */}
      <button
        onClick={() => navigate("/Listpage2")}
        className="absolute top-4 left-4 bg-gradient-to-r  from-[#11244d] to-[#90aace] text-white p-4 rounded-full shadow-md hover:scale-105 transition-all z-10"
        aria-label="Go back"
      >
        <FaArrowLeftLong size={20} />
      </button>

      {/* Location Display */}
    <div className="text-lg font-semibold text-gray-700   mb-4 flex items-start w-[85%] md:mt-7 mt-15  sm:mt-20">
       <span className="text-[#0e1d3d]"> IN {landMark.toUpperCase() }   </span>  , <span className="text-[#36435f]">     { city.toUpperCase()}</span>
      </div>

      {/* Image Section */}
      <div className="flex flex-col gap-0.5 md:flex-row w-full md:w-[90%] max-w-6xl">
  {/* LEFT SIDE IMAGE */}
  <div className="md:w-[60%] w-full h-[200px] md:h-[52vh]">
    <img
      src={frontendImage1}
      alt="Front View 1"
      className="w-full h-full object-cover"
    />
  </div>

  {/* RIGHT SIDE 2 IMAGES */}
  <div className="flex flex-col gap-0.5 md:w-[38%] w-full">
    <div className="h-[200px] md:h-[26vh]">
      <img
        src={frontendImage2}
        alt="Front View 2"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="h-[200px] md:h-[26vh]">
      <img
        src={frontendImage3}
        alt="Front View 3"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>


      {/* Info Section */}
      <div className="mt-6 flex flex-col  items-start w-[85%]  space-y-3 w-ful px-4 md:px-1 sm:px-0 ">
        <h1 className="text-xl font-bold text-gray-800">{title.toUpperCase()} — {category.toUpperCase()}</h1>
        <h2 className="text-gray-800 text-xl">{description}</h2>
        <p className="text-gray-800 text-lg font-semibold">Rent: ₹{rent}</p>
      </div>

      {/* Button */}
      <div className="mt-6 md:w-[86%] w-[85%]  flex items-start md:px-1 px-1  sm:px-0">
        <button
          type="submit"
          className="w-[70%] sm:w-[60%] md:w-[30%] lg:w-[25%] border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white text-lg font-medium py-3 rounded-xl hover:scale-102 transition-all shadow-lg"
          onClick={()=>{
            HandleListing();
            navigate('/')
          }}
        >
          {addListing?"Adding...":"Add Listing"}
        </button>
      </div>
    </div>
  );
};

export default ListingPage3;
