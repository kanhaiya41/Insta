import React, { useState } from 'react'
import { readFileAsDataURL } from '../utills/util';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { setPosts } from '../redux/postSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faUser } from '@fortawesome/free-solid-svg-icons';

const CreatePost = ({ setOpen }) => {

    const [file, setFile] = useState('');
    const [caption, setCation] = useState('');
    const [imagePrev, setImagePrev] = useState("");
    const [loading, setLoading] = useState(false);
    const {user}=useSelector(store=>store.auth);
    const dispatch=useDispatch();
    const {posts}=useSelector(store=>store.post)

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUrl = await readFileAsDataURL(file);
            setImagePrev(dataUrl);
        }
    }

    const createPostHandler = async (e) => {
        const formData = new FormData();
        formData.append("cation", caption);
        if (imagePrev) formData.append("image", file);
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/post/addpost',formData,{
                headers:{
                    'Content-Type':'multipart/form/data'
                },
                withCredentials:true
            })
            if(res.data.success)
            {
                dispatch(setPosts([res.data.post,...posts]));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }


    return (
        <div id='CreatePostmodall'>
            
            <div className='CreatePost-contentt'>
            
                <b>Create New Post</b> <FontAwesomeIcon icon={faClose} onClick={()=>setOpen(false)} />
                <div id='CreatePost-formm' >

                    <span>{
                            user?.profilePicture? <img className='ProfilePicturesidebar' src={user.profilePicture} alt="CN" /> :<FontAwesomeIcon icon={faUser} />
                        }
                        
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><b>{user?.username}</b>
                        <span style={{ color: 'gray', fontSize: 'small' }}>Bio here...</span>
                    </div>
                </div>
                <textarea value={caption} onChange={(e) => setCation(e.target.value)} style={{ border: 'none', outline: 'none' }} placeholder='Write a Caption' name="" id="" /> <br /><br />
                {
                    imagePrev && (
                        <div style={{ width: '100%', height: '50%' }}>
                            <img src={imagePrev} alt="preview_img" style={{ objectFit: 'cover', height: '400px', borderRadius: '0 0 5px 5px' }} />
                        </div> 
                    )
                } <br />
                <input type="file" style={{ display: 'none' }} id='choosefile' onChange={fileChangeHandler} file={file} />
                <label className='slectpostbtncreatepost' htmlFor='choosefile'>Select from computer</label> <br />
                {
                    imagePrev && (
                        loading ? (
                            <button className='buttonncreatepost'>
                                <img src="./img/loader.png" alt="" className='Loader' />
                                Please wait
                            </button>
                        ) : (
                            <button onClick={createPostHandler} className='buttonncreatepost'>Post</button>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default CreatePost
