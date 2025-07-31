import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CreateListingContext } from "../context/ListingContext";

const ListingPage1 = () => {
  const navigate = useNavigate();

  const {
    title, setTitle,
    description, setDescription,
    frontendImage1, setFrontendImage1,
    frontendImage2, setFrontendImage2,
    frontendImage3, setFrontendImage3,
    backendImage1, setBackendImage1,
    backendImage2, setBackendImage2,
    backendImage3, setBackendImage3,
    city, setCity,
    rent, setRent,
    landMark, setLandMark,
  } = useContext(CreateListingContext);

  const handleImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    switch (index) {
      case 1:
        setFrontendImage1(url);
        setBackendImage1(file);
        break;
      case 2:
        setFrontendImage2(url);
        setBackendImage2(file);
        break;
      case 3:
        setFrontendImage3(url);
        setBackendImage3(file);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Listpage2");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef1f8] to-[#eef2fa] flex items-center justify-center px-4 py-10 relative">
      {/* Left Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 border border-gray-700 bg-gradient-to-r from-[#11244d] to-[#90aace] text-white p-4 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 z-10"
        aria-label="Go back"
      >
        <FaArrowLeftLong size={20} />
      </button>

      {/* Right Badge */}
      <div className="absolute top-6 right-6 border border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white px-6 py-3 rounded-full shadow-md text-md font-medium z-10 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2">
        Set Up Your Stay
      </div>

      {/* Form Card */}
      <div className="w-full max-w-3xl mt-10 md:mt-4 max-h-[100vh] bg-white backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="max-h-[85vh] overflow-y-auto p-8 md:p-12" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#0e1d3b] to-[#98b0d1] bg-clip-text text-transparent">
            List Your Property
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grid Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600 font-medium">Title</label>
                <input
                  type="text"
                  placeholder="Sunny 2BHK Apartment"
                  className="rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-300 outline-none transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600 font-medium">City</label>
                <input
                  type="text"
                  placeholder="Delhi"
                  className="rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-300 outline-none transition-all"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600 font-medium">Landmark</label>
                <input
                  type="text"
                  placeholder="Near Metro Station"
                  className="rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-300 outline-none transition-all"
                  value={landMark}
                  onChange={(e) => setLandMark(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600 font-medium">Rent (₹)</label>
                <input
                  type="number"
                  placeholder="12000"
                  className="rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-300 outline-none transition-all"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600 font-medium">Description</label>
              <textarea
                rows={3}
                placeholder="Write something about the property..."
                className="rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-300 outline-none transition-all resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Image Uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((img) => (
                <div key={img} className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600 font-medium">Image {img}</label>
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
            <div className="flex justify-end w-full">
              <button
                type="submit"
                className="w-full sm:w-[50%] md:w-[30%] mt-4 border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white text-lg font-medium py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
              >
                Next Page
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingPage1;
