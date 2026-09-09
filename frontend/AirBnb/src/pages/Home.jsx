// import React, {  useContext } from 'react'
// import NavBar from '../components/NavBar'
// import { CreateListingContext } from '../context/ListingContext'
// import Card from '../components/Card'
// const Home = () => {
//   let { listData,setListDate,newListData,setNewListData}=useContext(CreateListingContext)
//   // console.log(listData);
//   // console.log(newListData);
  
  
//   return (
//     <div>
//       <NavBar/>
//       <div className='w-[100%] flex items-center justify-center mt-2'>
//         <div className='w-[90%] h-[78vh] flex items-center  justify-center flex-wrap gap-8 px-3 py-2'>
//           {newListData.map((list)=>(
//              <Card key={list._id} list={list} />

//           ))}
//       </div>
//       </div>
//     </div>
//   )
// }

// export default Home

import React, {  useContext } from 'react'
import NavBar from '../components/NavBar'
import { CreateListingContext } from '../context/ListingContext'
import Card from '../components/Card'
const Home = () => {
  let { listData,setListDate,newListData,setNewListData,listingLoading}=useContext(CreateListingContext)

  return (
    <div>
      <NavBar/>
      <div className='w-[100%] flex items-center justify-center mt-2'>
        <div className='w-[90%] h-[78vh] flex items-center  justify-center flex-wrap gap-8 px-3 py-2'>
          {listingLoading ? (
            <div className='w-full flex flex-col items-center justify-center gap-3'>
              <div className='w-10 h-10 border-4 border-gray-300 border-t-[#ff385c] rounded-full animate-spin'></div>
              <p className='text-gray-500 text-sm'>Loading listings....</p>
            </div>
          ) : newListData.length === 0 ? (
            <p className='text-gray-500 text-sm'>No listings found..</p>
          ) : (
            newListData.map((list)=>(
             <Card key={list._id} list={list} />
            ))
          )}
      </div>
      </div>
    </div>
  )
}

export default Home