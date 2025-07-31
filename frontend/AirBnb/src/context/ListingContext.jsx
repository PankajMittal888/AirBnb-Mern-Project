import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { authProvider } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const CreateListingContext=createContext();


const ListingContext = ({children}) => {
  const navigate=useNavigate();
    const {server}=useContext(authProvider)
    const[title,setTitle]=useState("");
     const[description,setDescription]=useState("");
      const[frontendImage1,setFrontendImage1]=useState("");
       const[frontendImage2,setFrontendImage2]=useState("");
        const[frontendImage3,setFrontendImage3]=useState("");
         const[backendImage1,setBackendImage1]=useState("");
          const[backendImage2,setBackendImage2]=useState("");
           const[backendImage3,setBackendImage3]=useState("");
            const[city,setCity]=useState("");
            const[rent,setRent]=useState(null);
            const[landMark,setLandMark]=useState("");
            const[addListing,setAddListing]=useState(false)
            const[category,setCategory]=useState("");
            const[listData,setListDate]=useState([])
            const[newListData,setNewListData]=useState([]);
            const[card,setCard]=useState(null)
            const[updateList,setUpdateList]=useState(false);
            const[deleteList,setDeleteList]=useState(false);
            const[searchData,setSearchData]=useState([]);
          

            const HandleListing= async ()=>{
                    const formData=new FormData();
                    formData.append("title",title);
                    formData.append("description",description);
                    formData.append("image1",backendImage1);
                    formData.append("image2",backendImage2);
                    formData.append("image3",backendImage3);
                    formData.append("city",city);
                    formData.append("rent",rent);
                    formData.append("landMark",landMark);
                    formData.append("category",category);
                  setAddListing(true)

                   try {
                    let result=await axios.post(server+'/api/listing/add',formData,{withCredentials:true})
                    console.log(result.data +"l5ntjouh35itio5tituiutuhuihppppppppppppppppppppp");
                    setAddListing(false)
                     toast.success("List Created SuccesFully")
                   } catch (error) {
                    console.log("error come in listing context",error);
                        toast.error(error.response.data.message);
                   }

            }

            const GetListing=async ()=>{
                try {
                  let list=await axios.get(server+'/api/listing/get',{withCredentials:true})
                // console.log(list.data);
                setListDate(list.data)
                setNewListData(list.data)
                } catch (error) {
                  console.log("error come in get liating datad context",error); 
                }
            }


              const ViewCard=async(id)=>{
                // console.log(id);
                try {
                  let res=await axios.get(server+`/api/listing/find/${id}`,{withCredentials:true})
                    console.log(res);
                    navigate('/viewcard')
                    setCard(res.data);
                } catch (error) {
                  console.log("error come in view card context",error);
                }
              }


              const HandleSearch=async(data)=>{
                try {
                  let result=await axios.get(server+`/api/listing/search?query=${data}`,{withCredentials:true})
                  // searchData(result.data);
                  setSearchData(result.data);
                } catch (error) {
                    setSearchData(null)
                    console.log("erroe come in handle search",error);   
                }

              }

             

            useEffect(()=>{
                GetListing()
            },[addListing,updateList,deleteList])

    let value={
            title,setTitle,
            description,setDescription,
            frontendImage1,setFrontendImage1,
            frontendImage2,setFrontendImage2,
            frontendImage3,setFrontendImage3,
            backendImage1,setBackendImage1,
            backendImage2,setBackendImage2,
            backendImage3,setBackendImage3,
            city,setCity,
            rent,setRent,
            landMark,setLandMark,
            category,setCategory,
            addListing,setAddListing,
            HandleListing,
            GetListing,
            listData,setListDate,
            newListData,setNewListData,
            card,setCard,ViewCard,
            updateList,setUpdateList,
            deleteList,setDeleteList,HandleSearch,searchData,setSearchData
    }
    
  return (
    <CreateListingContext.Provider value={value}>
        {children}
    </CreateListingContext.Provider>
  )
}

export default ListingContext
