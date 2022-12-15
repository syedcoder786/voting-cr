import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/auth/authSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

  return (
    <div>
        <header>
            <div className="container">
                <div id="branding">
                    <h4><span className="highlight">Welcome</span> {user.name}</h4>
                </div>
                <nav>
                    <ul>
                    <li className="current"><a href="index.html">Home</a></li>
                    <li><a href="#listofvoters">Voters</a></li>
                    <li><a style={{cursor:"pointer"}} onClick={() => { dispatch(logout()) }}>Logout</a></li>
                    </ul>
                </nav>
                </div>
                {/* <br/> */}
        </header>
  </div>
  )
}

export default Navbar