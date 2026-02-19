import React from 'react'
import { Outlet } from 'react-router-dom'
import UpperNav from '../Components/UpperNav'
import Navbar from '../Components/Navbar'
function Nav() {
    return (
        <>
            <UpperNav />
            <Navbar />
            <Outlet />
        </>
    )
}

export default Nav