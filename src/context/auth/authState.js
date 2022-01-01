import React, {useState} from 'react'
import authContext from './authContext'

const AuthState = (props) => {
    const initialState = localStorage.getItem('token') !== null
    const [loginState, setLoginState] = useState(initialState)

    const createUser = async ({name, email, password, cpassword}, history) => {
        //API call for signing up the user
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password, cpassword})
        });
        const json = await response.json()
        if(json.success){
            localStorage.setItem('token', json.jwtAuthToken)
            setLoginState(true)
            props.showAlert("Signed up successfuly", "success")
            history.push("/")
        }
        else if(json.errors){
            props.showAlert(json.errors[0].msg, "danger")
        }
        else{
            props.showAlert(json.error, "danger")
        }
    }

    const loginUser = async (loginInfo, history) => {
        //API call for logging in the user
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo)
        });
        const json = await response.json()
        if(json.success){
            localStorage.setItem('token', json.jwtAuthToken)
            setLoginState(true)
            props.showAlert("Logged in successfuly", "success")
            history.push("/")
            // console.log(json)
        }
        else if(json.errors){
            console.clear()
            props.showAlert(json.errors[0].msg, "danger")

        }
        else{
            console.clear()
            props.showAlert(json.error, "danger")
        }
        // setNotes(json)
    }

    const logoutUser = (history) => {
        localStorage.removeItem('token')
        setLoginState(false)
        history.push('/login')
    }

    return (
        <authContext.Provider value={{ loginState, logoutUser, loginUser, createUser }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState