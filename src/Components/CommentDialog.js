import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faUser, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setPosts } from '../redux/postSlice';
const CommentDialog = ({ open, setOpen }) => {

    const [text, setText] = useState('');
    const {selectedPost,posts} = useSelector(store => store.post);
    const dispatch=useDispatch();
    const [comment,setComment]=useState(selectedPost?.comment);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }



    useEffect(() => {
        const id = document.getElementById('Commentmodall');
        const body = document.getElementById('backgroundOverlay');
        if (open) {
            id.style.display = 'block'
            body.style.display = 'block'
        }
        else {
            id.style.display = 'none'
            body.style.display = 'none'
        }
        return () => {
            body.style.display = 'none';
        }

    }, [open]);

    const showDialogdialog = () => {
        const id = document.getElementById('cddialogmodall');
        if (id.style.display === 'none') {
            id.style.display = 'block'
        }
        else {
            id.style.display = 'none'
        }
    }

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            });
            
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText('');
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(selectedPost)
        {
            setComment(selectedPost.comment);
        }
    },[selectedPost])

    return (

        <div>
            <div
                id="backgroundOverlay"

            ></div>
            <div id='Commentmodall' >
                <FontAwesomeIcon className='closecommentdialog' icon={faClose} onClick={() => setOpen(false)} />

                <div className='Comment-contantt'>

                    <form id='Comment-formm'>

                        <div className='commentdialogflexdiv'>
                            <div className='commentdialogimgvaladiv'>
                                <img className='CommentDailogtimg' id=''
                                    src={selectedPost?.image}
                                    alt="post_img" />
                            </div>
                            <div className='commentdialogmaindiv'>
                                <div className='commentdialogdiv'>
                                    <div className='commentdialogdivdivdiv'>
                                        
                                        <div>
                                        <NavLink>
                                            {
                                                selectedPost.author.profilePicture ? <img className='ProfilePicturesidebar' src={selectedPost?.author?.profilePicture} alt="" /> : <FontAwesomeIcon icon={faUser} />}

                                        </NavLink>
                                            <NavLink className='commentdialogusnamenvlink'>{selectedPost?.author?.username}</NavLink>
                                            {/* <span className='commentdialogbiohere'>Bio here...</span> */}
                                        </div>
                                        <FontAwesomeIcon className='opendialogdialogicon' onClick={showDialogdialog} icon={faEllipsisH} />

                                    </div>
                                    <div id='cddialogmodall' >

                                        <div className='cddialogmodal-contantt'>

                                            <form id='cddialogcustom-formm'>
                                                <button className='cddialogbuttonnn'>Unfollow</button>
                                                <button className='cddialogbuttonn'>Add to favorites</button>
                                            </form>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='commentDialogcommentayenge'>
                                        {
                                            comment.map((com)=><Comment key={com._id} com={com}/>)
                                        }
                                    </div>
                                    <div className='commentayengesenichevala'>
                                        <div className='cmtinpbtndiv'>
                                            <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='addacmtiptfldniche' />
                                            <button disabled={!text.trim()} onClick={sendMessageHandler} className='sendcommentcmtdlg'>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CommentDialog
