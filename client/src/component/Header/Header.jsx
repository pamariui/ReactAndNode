import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const Header = ({pagename}) => {
  return (
    <div className='header'>
        <div className='logo'>
            <div className='logo-left'>
                U/I
            </div>
            <div className='logo-right'>
                UI kit
            </div>
        </div>
        <div className='links'>
            <Link to='/'>Employees</Link>
            <Link to='/departaments'>Departments</Link>
            <Link to='/projects'>Projects</Link>
        </div>
        <div className="top">
            <div className='pagename'>
                {pagename}
            </div>
        </div>
    </div>
  )
}

export default Header   