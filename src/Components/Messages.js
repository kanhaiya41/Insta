import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useGetAllMessages from '../hooks.js/useGetAllMessages';
import useGetRTM from '../hooks.js/useGetRTM'

const Messages = ({ selectedUser }) => {
    useGetAllMessages();
    useGetRTM();
    const { messages } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth)
    console.log(messages)

    return (
        <div style={{ overflowY: 'auto', flex: '1', padding: '15px' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {
                        selectedUser.profilePicture ? (
                            <img src={selectedUser.profilePicture} alt="" className='ProfilePicturesidebarr' style={{ width: '100px', height: '100px' }} />
                        ) : (
                            <FontAwesomeIcon style={{ height: '40px', width: '40px', borderRadius: '50%', color: 'white', background: 'gray', padding: '4px' }} icon={faUser} />
                        )
                    }
                    <span>{selectedUser?.username}</span>
                    <Link to={`/${selectedUser?._id}/Profile`}><button className='chngphtedtprfll'>View profile</button></Link>
                </div>


            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {
                    messages && messages.map((msg) => {
                        return (
                            <div style={{ display: 'flex', justifyContent: msg.senderId === user?._id ? 'end' : 'start' }}>
                                <div style={{ padding: '8px', borderRadius: '5px 5px 5px 5px', background: msg.senderId === user?._id ? '#0095F6' : 'lightgray', color: msg.senderId === user?._id ? 'white' : 'black' }}>
                                    {msg.message}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Messages
