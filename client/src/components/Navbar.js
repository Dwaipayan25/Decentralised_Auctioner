import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = ({account}) => {
  return (
    <div style={{width:"50%",height:"3%",border:"2px solid #000",borderRadius:"30px",marginTop:"-2px" }}>
      <p>Connected Account: {account}</p>
      
    </div>
  )
}

export default Navbar
