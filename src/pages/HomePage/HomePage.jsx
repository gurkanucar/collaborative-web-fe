import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import "./HomePage.css"

export const HomePage = () => {

    const navigate = useNavigate();

    useEffect(() => {
     navigate("/project")
    }, [])
    

  return (
    <div>HomePage</div>
  )
}
