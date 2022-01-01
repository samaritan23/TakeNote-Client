import React, {useState} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const OffCanvasExample = (props) => {
    const [show, setShow] = useState(false);
    const { loginState, userDetails, signout, location } = props
    const handleClose = () => {setShow(false)}
    const handleShow = () => setShow(true);
    const handleClick = () => {setShow(false); signout()}
    

    return (
        <div className='OffCanvasExample'>
            <span className="navbar-toggler-icon" onClick={handleShow}></span>
            <Offcanvas show={show} onHide={handleClose} {...props} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <i className="far fa-user-circle fa-lg"></i>
                        <div style={{ fontSize: "16px" }}>{userDetails.name}</div>
                        <div style={{ fontSize: "13px" }}>{(loginState) ? `${userDetails.email}` : ""}</div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Dropdown.Divider />
                {/* <Link className={`nav-link ${(location.pathname === '/') && `active`}`} style={{color: "black"}} onClick={handleClose} aria-current="page" to="/">Home</Link> */}
                <Link className={`nav-link ${(location.pathname === '/about') && `active`}`} style={{color: "black"}} onClick={handleClose} aria-current="page" to="/about">About</Link>
                <Link className={`nav-link ${(location.pathname === '/') && `active`}`} style={{color: "black"}} onClick={handleClose} aria-current="page" to="/">My Notes</Link>
                {loginState && <Dropdown.Item onClick={handleClick}>Sign out</Dropdown.Item>}
            </Offcanvas>
        </div>
    );
}