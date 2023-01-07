import { useState,useEffect } from "react";
import { ethers } from "ethers";
import { Link } from 'react-router-dom';

const Auctions = ({state,setid}) => {
     const [auctions,setAuctions]=useState([]);
     const {contract}= state;
     // const [data,setData]=useState("");

     useEffect(()=>{
          const showAuc=async()=>{
               const auctions=await contract.showAuctions();
               setAuctions(auctions);
               console.log(auctions);
          }
          contract && showAuc();
     },[contract])

     const clicked=()=>{
          console.log("hue");
     }

     const changeToInt=(_x)=>{
          const x= ethers.utils.formatEther(_x)*(10**18);
          return x;
     }


  return (
    <div>
      <button>
          <Link to="/">
               Home
          </Link>
      </button>
      <h1>Auctions</h1>
      {
          auctions
               .slice(0)
               .reverse()
               .map((auction)=>{
               return(
                    <div style={{color:"blue", backgroundColor:"yellow"}}>
                    
                    <table key={auction.AuctionId}>
                    <tbody>
                    <tr>
                    <button onClick={()=>{setid(changeToInt(auction.AuctionId))}}>
                    <Link to="/show">
                              View
                    </Link>
                    </button>
                         <img style={{maxWidth:"129px"}}
                              src={`https://gateway.pinata.cloud/ipfs/${auction.hash.substring(6)}`}
                              alt="new"
                         >
                         </img>
                         <td className="align-middle">{auction.auctionStarter}</td><br/>
                         <td className="align-middle">About:{auction.about}</td>
                         <td className="align-middle">{ethers.utils.formatEther(auction.startBidPrice)*(10**18)}</td>
                         <td className="align-middle">{auction.highestBidder}</td>
                         <td className="align-middle">{ethers.utils.formatEther(auction.highestBid)*(10**18)}</td>
                         <td className="align-middle">
                              {new Date(auction.startTime*1000).toLocaleString()}
                         </td>
                         {/* <Link to={/Auction} state={"hello"}> */}
                         <td className="align-middle">{auction.auctionActive ? "ongoing" : "ended "}</td>
                         {/* </Link> */}
                         <td className="align-middle">{auction.owner}</td>
                    </tr>
                    </tbody>
                    </table>
                    </div>
               )
          }
          )
      }
    </div>
  )
}

export default Auctions
