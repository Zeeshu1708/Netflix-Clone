import React from 'react';
import logo from '../../Logonetflix.png'
import { Link } from 'react-router-dom';
import { ImSearch } from "react-icons/im";


const Header = () => {
  return (
    <nav className="header">
        <img src={logo} alt="" />

        <div>
          <Link to={'/'}>TV Shows</Link>
          <Link to={'/'}>Movies</Link>
          <Link to={'/'}>Resently Added</Link>
          <Link to={'/'}>My List</Link>
        </div>

        <ImSearch/>
    </nav>
  )
}

export default Header
