import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEllipsisH, faHeart, faRoad } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart, faComment, faBookmark, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import CommentDialog from './CommentDialog';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'
import axios from 'axios';
import { setPosts, setSelectedPost } from '../redux/postSlice';

const Post = ({ post }) => {

    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const userId = user ? user._id : null;
    const postId = post.author ? post.author._id : null;
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [postLike, setPostLike] = useState(post.likes.length);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [comment, setComment] = useState(post.comment);

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const inputtext = e.target.value;
        if (inputtext.trim()) {
            setText(inputtext);
        }
        else {
            setText('');
        }

    }



    const showDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const deletePostHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, { withCredentials: true });
            if (res.data.success) {
                const updatedPostData = posts.filter((postItem) => postItem?._id != post?._id);
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                console.log(res.data.message)
                showDialog();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const likeOrDislikeHandler = async (postId) => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`http://localhost:8000/api/v1/post/${postId}/${action}`, { withCredentials: true });
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                // apne post ko update krenge
                const updatedPostDatak = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id != user._id) : [...p.likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostDatak));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const commentHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/post/${post._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            });
            console.log(res.data);
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText('');
            }
        } catch (error) {
            console.log(error)
        }
    }

    const bookMarkHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/post/${post?._id}/bookmark`, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='Postmaindiv'>
            <div className='Postinsidediv'>
                <div className='Postdiv'>
                    {
                        post.author.profilePicture ? (
                            <img src={post.author.profilePicture} alt="" className='ProfilePicturesidebar' />
                        ) : (
                            <FontAwesomeIcon icon={faUser} />

                        )
                    }
                    <div style={{ display: 'flex' }}>
                        <p style={{ marginTop: '15px' }}>{post.author.username}</p>
                        {
                            user?._id === post.author._id && <p className='authorpost' style={{ marginTop: '15px' }}>Author</p>
                        }
                    </div>
                </div>
                <FontAwesomeIcon icon={faEllipsisH} style={{ cursor: 'pointer' }} onClick={showDialog} />
            </div>

            {/* ************** */}
            {
                isDialogOpen &&
                <div id='PostOptionmodall' >
                    <div className='PostOption-contantt'>

                        <form id='PostOption-formm'>
                            {
                                post?.author?._id !== user?._id && <button className='PostOptionbuttonn' id='PostOptionsubmitmodal'>Unfollow</button>
                            }
                            <button className='PostOptionbuttonn' id='PostOptionsubmitmodal'>Add to Favourites</button>
                            {
                                userId === postId && <button className='PostOptionbuttonn' id='PostOptionsubmitmodal' onClick={deletePostHandler}>Delete</button>
                            }

                        </form>
                    </div>
                </div>
            }

            {/* ***************** */}
            <img className='postimg' src={post.image}
                alt="post_img" />

            <div className='divposticon'>
                <div className='divposticoninside'>
                    {
                        liked ? <FontAwesomeIcon icon={faHeart} className='postlikeicon' style={{ color: 'red' }} onClick={() => likeOrDislikeHandler(post._id)} /> : <FontAwesomeIcon className='postlikeicon' onClick={() => likeOrDislikeHandler(post._id)} icon={faRegularHeart} />

                    }
                    <FontAwesomeIcon className='postCommenticon' onClick={() => {
                        setOpen(true)
                        dispatch(setSelectedPost(post))
                    }} icon={faComment} />
                    <FontAwesomeIcon className='postsendicon' icon={faPaperPlane} />

                </div>
                <FontAwesomeIcon className='postsavebookmarkicon' icon={faBookmark} onClick={bookMarkHandler} />
            </div>
            <span className='postlikes' >{postLike} likes</span>
            <p>
                <span className='postusernamep'>{post.author.username}</span>
                {post.cation}
            </p>
            {
                comment.length > 0 && (
                    <span className='postveirallcomment' onClick={() => {
                        setOpen(true)
                        dispatch(setSelectedPost(post))
                    }}>View all {comment.length} comments</span>
                )
            }

            {
                open && <CommentDialog open={open} setOpen={setOpen} />
            }

            <div style={{ display: 'flex' }}>
                <input type="text"
                    className='postcommentinput'
                    placeholder='Add a comment...'
                    value={text}
                    onChange={changeEventHandler}
                />
                {
                    text && <span className='postposttext' id='id' onClick={commentHandler} >Post</span>
                }
            </div>
        </div>
    )
}

export default Post


//dialog box style krna h