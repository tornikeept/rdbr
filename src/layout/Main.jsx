import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

function Main() {
  return (
    <>
    <Header/>
    <Outlet/>
    <footer>footer but nothing is here</footer>
    </>
  )
}

export default Main