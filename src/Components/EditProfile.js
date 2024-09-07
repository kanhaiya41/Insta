import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { setAuthUser } from '../redux/authSlice'

const EditProfile = () => {
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        profilePhoto: user?.profilePicture,
        bio: user?.bio,
        gender: user?.gender
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInput({ ...input, profilePhoto: file });
        }

    }

    const seletChangeHandler = (e) => {
        setInput({ ...input, gender: e.target.value });
    }


    const editProfileHandler = async () => {
        const fromData=new FormData();
        fromData.append('bio',input.bio);
        fromData.append("gender",input.gender);
        if(input.profilePhoto)
        {
            fromData.append('profilePicture',input.profilePhoto);
        }
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/profile/edit',fromData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            if(res.data.success)
            {
                const updatedUserData={
                    ...user,
                    bio:res.data.user?.bio,
                    profilePicture:res.data.user?.profilePicture,
                    gender:res.data.user?.gender
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/${user?._id}/profile`)
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }

    }

    return (
        <div>
            <Sidebar />
            <div style={{ display: 'flex', marginLeft: '400px', paddingLeft: '100px', paddingTop: '30px', width: '60%' }}>
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Edit Profile</p>
                    <div className='rightSidebardiv' style={{ background: 'gray', borderRadius: '12px', padding: '10px', justifyContent: 'space-between' }} >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {
                                user.profilePicture ? (
                                    <img src={user.profilePicture} alt="" className='ProfilePicturesidebar' style={{ height: '50px', width: "50px" }} />
                                ) : (
                                    <FontAwesomeIcon icon={faUser} />
                                )
                            }

                            <div style={{ paddingLeft: '10px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: 'small', marginTop: '20px', paddingTop: '10px' }}> {user.username} </span> <br />
                                <span style={{ fontSize: 'small' }}>{user?.bio || 'bio here'}</span>
                            </div>
                        </div>
                        <input type="file" style={{ display: 'none' }} className='chngphtedtprfl' id='editppic' onChange={fileChangeHandler} />
                        <label className='chngphtedtprfl' htmlFor='editppic'>Change photo</label>

                    </div>
                    <div>
                        <p style={{ fontWeight: '700', fontSize: '20px' }}>Bio</p>
                        <textarea value={input.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} style={{ outline: 'none', width: '100%', height: '80px' }} />
                    </div>
                    <div>
                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Gender</p>
                        <select value={input.gender} onChange={seletChangeHandler} name="" id="" style={{ width: "200px", padding: '10px', outline: 'none', borderRadius: '5px' }}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        {
                            loading ? (
                                <button className='chngphtedtprfl'>
                                    <img src="/img/loader.png" alt="" className='Loader' />
                                    Please wait
                                </button>
                            ) : (
                                <button className='chngphtedtprfl' onClick={editProfileHandler}>Submit</button>
                            )
                        }
                    </div>
                </section>
            </div>

        </div>
    )
}

export default EditProfile
