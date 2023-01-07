import React,{useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Auctions from "./Auctions";

const CreateAuction = ({state,account}) => {
     const [file,setFile]=useState(null);
     const [fileName,setFileName]=useState("No image selected");
     // const [ImgHash,setImgHash]=useState("");

     const newAuction=async(e)=>{
          e.preventDefault();
          const {contract}=state;
          const description=document.getElementById("description").value;
          const startPrice=document.getElementById("startPrice").value;
          console.log(description,startPrice);
          let imh="";

          if(file){
               try{
                 console.log(file);
                 const formData=new FormData();
                 formData.append("file",file);
                 const resFile=await axios({
                    method:"post",
                    url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data:formData,
                    headers:{
                      pinata_api_key:`dd41c64a3d7436504778`,
                      pinata_secret_api_key: `27e3fd3d1caff47b2a1c34e445455c19069518b3ff616ad07a303cbe778afeb9`,
                      "Content-Type":`multipart/form-data`,
                    }
                  });
                    imh = `ipfs://${resFile.data.IpfsHash}`;
                    // setImgHash(imh);
                    console.log(imh);
                 
               //   contract.add(account,ImgHash);
                 alert("Sucessfully image uploaded");
                 setFileName("No image selected");
                 setFile(null);
                 alert("Auction Created");
               }catch{
                 alert("Unable to upload image to pinata");
               }
             }
          //    console.log(ImgHash);
          const tx=await contract.startAuction(description,startPrice,imh);
          await tx.wait();
          console.log("Auction Created");
          console.log(description,startPrice,imh);
     }

     const retrieveFile=(e)=>{

          const data=e.target.files[0];
          console.log(data);
      
          const reader=new window.FileReader();
          reader.readAsArrayBuffer(data);
          reader.onloadend=()=>{
            setFile(e.target.files[0]);
          }
      
          setFileName(e.target.files[0].name);
          e.preventDefault();
     }

     return (
     <div style={{color:"blue", backgroundColor:"white"}}>
          <button>
          <Link to="/auctions">
          Auctions
          </Link>
          </button>
          <h2>Create New Auction</h2>
          <form onSubmit={newAuction}>
               <input type="text" id="description" placeholder="Auction Description"/><br />
               <input type="text" id="startPrice" placeholder="Auction Start Price"/><br />
               <label htmlFor='file-upload' className='choose' disabled={!account}>
                    Choose Image
               </label>
               <input 
               disabled={!state} 
               type="file" 
               id='file-upload' 
               name="data" 
               onChange={retrieveFile} 
               />
               <br />
               <button type="Submit" disabled={!state.contract}>Publish</button>
          </form>
     </div>
     )
}

export default CreateAuction
