import React, {useState, useContext, useEffect} from 'react'
import authContext from '../context/auth/authContext'
import './Auth.css'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const context = useContext(authContext)
    const {loginUser, loginState} = context
    let history = useHistory()
    const [loginInfo, setUserInfo] = useState({email: "", password: ""})

    function handleSubmit(event){
        event.preventDefault()
        loginUser(loginInfo, history)
        setUserInfo({email: "", password: ""})
    }

    function handleChange(event){
        setUserInfo({...loginInfo, [event.target.name] : event.target.value})
    }

    useEffect(() => {
        if(loginState)
            history.push('/')
    })

    return (
        <div className="Login">
            <div className="loginPage">
                <img src="Signup.png" alt="" />
                <div className="login">
                    <form id="contact" onSubmit={handleSubmit} className='loginForm'>
                        <h2>Login</h2>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="exampleInputEmail1">Email</label>
                            <input className="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" onChange={handleChange} name="email" value={loginInfo.email} required/>
                        </div>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="exampleInputPassword1">Password</label>
                            <input className="form-control" id="exampleInputPassword" type="password" onChange={handleChange} name="password" value={loginInfo.password} required/>
                        </div>
                        <div className="buttons">
                            <button className="btn btn-dark" type="submit">Login</button>
                            <div className="signupArea">
                                <div style={{ marginRight: "10px" }}>New User?</div>
                                <Link className="btn btn-outline-dark btn-signUpOrLogin" type="text" to="/signup">Sign up</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
