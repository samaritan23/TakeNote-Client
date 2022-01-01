import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useHistory, useLocation } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import { OffCanvasExample } from './OffCanvasExample';
import './Navbar.css';

export const Navbar = () => {
    let location = useLocation()
    const context = useContext(authContext)
    const { loginState, logoutUser } = context
    const [userDetails, setUserDetails] = useState({ name: "Not logged in", email: "" })
    let history = useHistory()

    function signOut() {
        logoutUser(history)
        setUserDetails({ name: "Not logged in", email: "" })
    }

    useEffect(() => {
        if (loginState) {
            const getUser = async (history) => {
                const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/getUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                })
                const json = await response.json()
                if (json.error) {
                    localStorage.removeItem('token')
                    console.clear()
                    history.push('/login')
                }
                else {
                    setUserDetails(json)
                }
            }
            getUser(history)
        }
    }, [loginState, history])

    return (
        <div>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <div className='logo'>
                        <a href="/">
                        <img src="note.png" alt="" width="30px" height="30px" /></a>
                        <h3>Take-A-Note</h3>
                    </div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === '/') && `active`} `} aria-current="page" to="/">My Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === '/about') && `active`} `} aria-current="page" to="/about">About</Link>
                        </li>
                        {/* <span className="nav-item">
                            <Link className={`nav-link ${(location.pathname === '/myNotes') && `active`} `} aria-current="page" to="/myNotes">My Notes</Link>
                        </span> */}
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                <i className="far fa-user-circle fa-lg"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-items" variant="dark">
                                <i className="fas fa-user fa-2x"></i>
                                <div style={{ fontSize: "16px" }}>{userDetails.name}</div>
                                <div style={{ fontSize: "13px" }}>{(loginState) ? `${userDetails.email}` : ""}</div>
                                <Dropdown.Divider style={{ margin: "0.5rem auto" }} />
                                <Dropdown.Item><button type="button" className="btn btn-light btn-sm" onClick={signOut}>{(loginState) ? 'Sign out' : 'Sign in'}</button></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>
                    <OffCanvasExample placement={'end'} name={'end'} userDetails={userDetails} loginState={loginState} signout={signOut} location={location} />
                </div>
            </nav>
        </div>
    )
}
