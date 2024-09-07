import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faMagnifyingGlass, faCompass, faHeart, faSquarePlus, faUser, faRightFromBracket, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import toast from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '../redux/postSlice';



const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const { likeNotification } = useSelector(store => store.realTimeNotification);


  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === 'Create') {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/${user?._id}/profile`);
    } else if (textType === 'Home') {
      navigate('/')
    } else if (textType === 'Messages') {
      navigate('/chat');
    } else if (textType === 'Notification')
      setShowNotification(!showNotification);

  }

  const sidebarItems = [
    {
      icon: <FontAwesomeIcon icon={faHouse} />,
      text: "Home"
    }, {
      icon: <FontAwesomeIcon icon={faSearch} />,
      text: "Search"
    },
    {
      icon: <FontAwesomeIcon icon={faCompass} />,
      text: "Explore"
    }, {
      icon: <FontAwesomeIcon icon={faFacebookMessenger} />,
      text: "Messages"
    }, {
      icon: <FontAwesomeIcon icon={faHeart} />,
      text: "Notification"
    }, {
      icon: <FontAwesomeIcon icon={faSquarePlus} />,
      text: "Create"
    },
    {
      icon: user && user.profilePicture ? (
        <img src={user.profilePicture} alt="Profile" className='ProfilePicturesidebar' />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      ),
      text: "Profile"
    },
    {
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      text: "Logout"
    }
  ]

  return (
    <div className='sidebar'>
      <div className='sidebardiv'>
        <h1>LOGO</h1>
        <div>
          {
            sidebarItems.map((item, index) => {
              return (
                <div onClick={() => sidebarHandler(item.text)} className='sidebaritemdiv' key={index}>
                  <span style={{ fontSize: '24px' }}>{item.icon}</span>
                  <span>{item.text}</span>

                  {
                    item.text === 'Notification' && likeNotification.length > 0 && (
                      <>
                        <div style={{ background:'red', borderRadius: '50%', height: '22px', width: '22px', position: 'absolute', margin: '0 0 14px 10px' }}>
                          <button className='sdbrntfnbtn' >{likeNotification.length}</button>

                        </div> 
                        <div>
                          {
                            showNotification &&
                            <div style={{position:'absolute',boxShadow:'gray .1px .1px 1px 1px', padding:'5px'}}>
                              {
                                likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                  likeNotification.map((notification) => {
                                    return (
                                      <div key={notification.userId} style={{display:'flex',alignItems:'center',gap:'8px'}} >
                                        {notification.userDetails?.profilePicture ? (
                                          <img src={notification.userDetails?.profilePicture} alt="Profile" className='ProfilePicturesidebar' />
                                        ) : (
                                          <FontAwesomeIcon icon={faUser} />
                                        )}
                                        <p style={{ fontSize: 'small',paddingTop:'20px' ,}}> <span style={{ fontWeight: 'bold'}}>{notification.userDetails?.username}</span> liked your post </p>
                                      </div>
                                    )
                                  })
                                )
                              }
                            </div>
                          }
                        </div>

                      </>
                    )
                  }
                </div>
              )
            })
          }
          {
            open && <CreatePost setOpen={setOpen} />
          }

        </div>
      </div>

    </div>
  )
}

export default Sidebar
