import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Signup = () => {
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loding, setLoding] = useState(false);
    const {user}=useSelector(store=>store.auth);

    const navigate=useNavigate();

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
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
                headers: {
                    'Content-Type': 'application/json'

                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate('/Login');
                toast.success(res.data.message);
                setInput({
                    username: '',
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
                    <p className='SignUpText'>Signup to see photos & videos from your friends</p>
                </div>
                <div>
                    <span className='SignupUsernamespan'>Username</span>
                    <input
                        type="text"
                        name='username'
                        className='SignupUsername'
                        value={input.username}
                        onChange={changeEventHandler}
                    />
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
                        <button className='submit'>
                            <img src="/img/loader.png" alt="load" className='Loader' />
                            Please wait
                        </button>
                    ) : (
                        <button type='submit' className='SignupButton'>Sign Up</button>
                    )
                }
                <span style={{ textAlign: 'center' }}>Already have an account ? <NavLink className='SignUpNavLink' to='/login'>Login</NavLink> </span>
            </form>
        </div>
    )
}

export default Signup
