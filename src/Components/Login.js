import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { setAuthUser } from '../redux/authSlice';
const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [loding, setLoding] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector(store=>store.auth);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            setLoding(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'

                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
                setInput({
                    email: '',
                    password: ''
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        } finally {
            setLoding(false);
        }

    }

    useEffect(()=>{
        if(user){
            navigate('/');
        }
    },[])

    return (
        <div className='SignupMaindiv'>
            <form onSubmit={signupHandler} className='SignUpForm'>
                <div className='logoandtext'>
                    <p className='SignUpLogo'>LOGO</p>
                    <p className='SignUpText'>Login to see photos & videos from your friends</p>
                </div>
                <div>
                    <span className='SignupUsernamespan'>Email</span>
                    <input
                        type="email"
                        name='email'
                        className='SignupUsername'
                        value={input.email}
                        onChange={changeEventHandler}
                    />
                </div>
                <div>
                    <span className='SignupUsernamespan'>Password</span>
                    <input
                        type="password"
                        name='password'
                        className='SignupUsername'
                        value={input.password}
                        onChange={changeEventHandler}
                    />
                </div>
                {
                    loding ? (
                        <button>
                            <img src="./img/loader.png" alt="" className='Loader'/>
                            Please wait
                        </button>
                    ) : (
                            <button type='submit' className='SignupButton'>Login</button>
                    )
                }
                <span style={{textAlign:'center'}}>Don't have an account ? <NavLink className='SignUpNavLink' to='/Signup'>Sign Up</NavLink> </span>
            </form>
        </div>
    )
}

export default Login
