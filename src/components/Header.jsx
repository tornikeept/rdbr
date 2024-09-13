import React from 'react'
import logo from "../../public/photos/LOGO.png"

function Header() {
    return (
        <div className="navbar bg-base-100">
            <a href='/'>
                <img className="logo" src={logo} alt="logo of Redberry" />
            </a>
        </div>
    )
}

export default Header