import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { setSelectedUser } from '../redux/authSlice';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import Messages from './Messages';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setMessages } from '../redux/chatSlice';

function ChatPage() {

    const [textMessage,setTextMessage]=useState('');

    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const {onlineUsers,messages} = useSelector(store=>store.chat) ;
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId)=>{
        try {
            const res=await axios.post(`http://localhost:8000/api/v1/message/send/${receiverId}`,{textMessage},{
                headers:{
                    "Content-Type":'application/json',
                    
                },
                withCredentials:true
            });
            if(res.data.success)
            {
                dispatch(setMessages([...messages,res.data.newMessage]));
                setTextMessage('');
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        return()=>{
            dispatch(setSelectedUser(null));
        }
    },[])

    return (
        <div>
            <Sidebar />
            <div style={{ display: 'flex', marginLeft: '17.5%', height: '100vh' }} >
                <section style={{ width: '50%', margin: '30px 0' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '15px', border: 'gray solid 0.5' }} >{user?.username}</p>
                    <hr style={{ marginBottom: 'px', border: 'gray solid 0.5' }} />
                    <div style={{ overflow: 'auto', height: '80vh' }}>
                        {
                            suggestedUsers.map((suggestedUser) => {
                                const isOnline=onlineUsers.includes(suggestedUser?._id);
                                return (
                                    <div className='chatpagereturnnichediv' onClick={() => dispatch(setSelectedUser(suggestedUser))}>
                                        {
                                            suggestedUser.profilePicture ? (
                                                <img src={suggestedUser.profilePicture} alt="" className='ProfilePicturesidebarr' />
                                            ) : (
                                                <FontAwesomeIcon style={{ height: '40px', width: '40px', borderRadius: '50%', color: 'white', background: 'gray', padding: '4px' }} icon={faUser} />
                                            )
                                        }
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 'medium' }}>{suggestedUser?.username}</span>
                                            <span style={{ fontSize: '10px', color: isOnline ? 'green' : 'red', fontWeight: 'bold' }}>{isOnline ? 'Online' : 'Offine'}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                {
                    selectedUser ? (
                        <section style={{ display: 'flex', borderLeft: 'gray solid 0.5px', flexDirection: 'column', height: '100%' }}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '7px 10px', borderBottom: 'gray solid 0.5', position: 'sticky', top: '0', background: 'none', zIndex: '10' }}>
                                {
                                    selectedUser.profilePicture ? (
                                        <img src={selectedUser.profilePicture} alt="" className='ProfilePicturesidebar' />
                                    ) : (
                                        <FontAwesomeIcon icon={faUser} />
                                    )
                                }
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>{selectedUser?.username}</span>
                                </div> 
                            </div><hr />
                            <Messages selectedUser={selectedUser} />
                            <div style={{ display: 'flex', alignItems: 'center', padding: '15px', borderTop: 'gray solid 0.5px' }}>
                                <input value={textMessage} onChange={(e)=>setTextMessage(e.target.value)} type="text" style={{ display: 'flex', marginRight: '10px', outline: 'none', padding: '10px', width: '100vh' }} placeholder='messages...' />
                                <button className='chngphtedtprfl' onClick={()=>sendMessageHandler(selectedUser?._id)}>Send</button>
                            </div>
                        </section>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
                            <FontAwesomeIcon icon={faFacebookMessenger} style={{ width: '100px', height: '100px', margin: '14px 0', color: 'white', background: 'black', borderRadius: '50%', border: 'solid black 8px' }} />
                            <h3 >Your messages</h3>
                            <span>send a message to start a chat</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ChatPage
