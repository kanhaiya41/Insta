import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    return (
        <div style={{ margin: '30px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'small' }}>
                <span style={{ fontWeight: 'bold', color: 'gray' }}>Suggested for you</span>
                <span style={{ fontWeight: '600', cursor: 'pointer' }}>See All</span>
            </div>
            
            {
                suggestedUsers?.map((user) => {
                    
                    return (
                        <div key={user._id} style={{display:'flex',alignItems:'center',justifyContent:'space-between', margin:'5px 0'}} >
                            <div className='rightSidebardiv'>
                                <Link to={`/${user?._id}/profile`}>
                                    {
                                        user.profilePicture ? (
                                            <img src={user.profilePicture} alt="" className='ProfilePicturesidebar' />
                                        ) : (
                                            <FontAwesomeIcon icon={faUser} />
                                        )
                                    }
                                </Link>

                                <div style={{ paddingLeft: '10px' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: 'small', marginTop: '20px', paddingTop: '10px' }}> <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${user?._id}/profile`}>{user.username}</Link> </span> <br />
                                    <span style={{ color: 'gray', fontSize: 'small' }}>{user?.bio || 'bio here'}</span>
                                </div>
                            </div>
                            <span className='suggestedusefollor' >Follow</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SuggestedUsers
