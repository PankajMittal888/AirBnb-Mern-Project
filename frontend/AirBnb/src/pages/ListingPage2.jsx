import React, { useContext } from 'react';
import { MdWhatshot, MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaTreeCity } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CreateListingContext } from '../context/ListingContext';

const propertyTypes = [
  { label: "Trending", icon: <MdWhatshot size={30} /> },
  { label: "House", icon: <GiFamilyHouse size={30} /> },
  { label: "Bedroom", icon: <MdBedroomParent size={30} /> },
  { label: "Pool", icon: <MdOutlinePool size={30} /> },
  { label: "Cabin", icon: <GiWoodCabin size={30} /> },
  // { label: "Community", icon: <SiHomeassistantcommunitystore size={30} /> },
  { label: "Bed", icon: <IoBedOutline size={30} /> },
  { label: "FarmHouse", icon: <FaTreeCity size={30} /> },
  { label: "Building", icon: <BiBuildingHouse size={30} /> },
];

const ListingPage2 = () => {
  const navigate = useNavigate();
  const { category, setCategory } = useContext(CreateListingContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f5fa] to-[#eef0f3] flex items-center justify-center px-4 py-10 flex-col relative">
      
      {/* Go Back Button */}
      <button
        onClick={() => navigate("/Listpage1")}
        className="absolute top-6 left-6 border border-gray-700 bg-gradient-to-r from-[#11244d] to-[#90aace] text-white p-4 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 z-10"
        aria-label="Go back"
      >
        <FaArrowLeftLong size={20} />
      </button>

      {/* Right Badge */}
      <div className="absolute top-6 right-6 border border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white px-6 py-3 rounded-full shadow-md text-md font-medium z-10 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2">
        Set Your Category
      </div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl mt-10 md:mt-0 mb-1 md:mb-10 font-semibold text-center bg-gradient-to-r from-[#132f68] to-[#8cb8f7] bg-clip-text text-transparent">
        Which of these best describe your place?
      </h2>

      {/* Property Boxes */}
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[50%] mt-6 md:mt-0 max-w-5xl flex flex-wrap gap-6 justify-center">
        {propertyTypes.map((item, index) => {
          const isSelected = category === item.label;
          return (
            <div
              key={index}
              className={`relative w-[120px] sm:w-[140px] h-[120px] mx-2 rounded-xl 
                ${isSelected
                  ? 'bg-gradient-to-r from-[#11244d] to-[#90aace] p-[2.5px]'
                  : 'bg-gradient-to-r from-[#11244d] to-[#90aace] p-[1px] hover:p-[1.5px]'
                }
                hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg`}
              onClick={() => setCategory(item.label)}
            >
              <div className="flex flex-col items-center justify-center text-center w-full h-full rounded-xl bg-white p-3 sm:p-4">
                <div className="text-indigo-900 mb-2">{item.icon}</div>
                <p className="text-sm sm:text-md font-semibold text-gray-800">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Page Button */}
      <div className="flex justify-end w-full sm:w-[50%] md:w-[80%] lg:w-[80%] mt-6">
        <button
          type="button"
          disabled={!category}
          className={`w-[50%] sm:w-[50%] md:w-[40%] lg:w-[25%] mt-5 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white text-lg font-medium py-2.5 rounded-xl transition-all shadow-lg
            ${category ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'}`}
          onClick={() => navigate("/Listpage3")}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ListingPage2;
