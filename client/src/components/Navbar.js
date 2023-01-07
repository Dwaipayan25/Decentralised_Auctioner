import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = ({account}) => {
  return (
    <div style={{color:"blue", backgroundColor:"yellow"}}>
      <p>Connected Account: {account}</p>
      
    </div>
  )
}

export default Navbar
