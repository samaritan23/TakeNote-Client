import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import authContext from '../context/auth/authContext'
import './Auth.css'
import { Link } from 'react-router-dom'

const Signup = () => {
    const context = useContext(authContext)
    const [signupInfo, setSignupInfo] = useState({name: "", email: "", password: "", cpassword: ""})
    const {createUser} = context
    let history = useHistory()

    function handleSubmit(event){
        event.preventDefault()
        createUser(signupInfo, history)
        setSignupInfo({name: "", email: "", password: "", cpassword: ""})
    }

    function handleChange(event){
        setSignupInfo({...signupInfo, [event.target.name] : event.target.value})
    }

    return (
        <div className='Signup'>
            <div className="loginPage">
                <img src="login.png" alt="" />
                <div className="login">
                    <form id="contact" method="post" onSubmit={handleSubmit} className='signUpForm'>
                        <h2>Sign Up</h2>
                        <div className="mb-2">
                            <label className="form-label" htmlFor="exampleInputEmail1">Username</label>
                            <input className="form-control" type="text" aria-describedby="emailHelp" name="name" onChange={handleChange} value={signupInfo.name} required/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label" htmlFor="exampleInputEmail1">Email ID</label>
                            <input className="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" name="email" onChange={handleChange} value={signupInfo.email} required/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label" htmlFor="exampleInputPassword1">Password</label>
                            <input className="form-control" id="exampleInputPassword" type="password" name="password" onChange={handleChange} value={signupInfo.password} minLength={8} required/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label" htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input className="form-control" id="exampleInputPassword2" type="password" name="cpassword" onChange={handleChange} value={signupInfo.cpassword} minLength={8} required/>
                        </div>
                        <div className="buttons">
                            <button className="btn btn-dark" type="submit">Sign Up</button>
                            <div className="signupArea">
                                <div id="question" style={{ marginRight: "10px" }}>Existing User?</div>
                                <Link className="btn btn-outline-dark btn-signUpOrLogin" type="text" to="/login">Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
