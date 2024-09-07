import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SuggestedUsers from './SuggestedUsers'

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);
  return (
    <div style={{ width: '300px', paddingRight: '32px', marginTop: '3%',marginLeft:'83%',position:'fixed' }}>
      <div className='rightSidebardiv'>
        <Link to={`${user?._id}/profile/`}>
          {
            user?.profilePicture ? (
              <img src={user?.profilePicture} alt="" className='ProfilePicturesidebar' style={{height:'50px',width:"50px"}} />
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )
          }
        </Link>

        <div style={{ paddingLeft: '10px' }}>
          <span style={{ fontWeight: 'bold', fontSize: 'normal', marginTop: '20px', paddingTop: '10px' }}> <Link style={{textDecoration:'none', color:'black'}} to={`/${user?._id}/profile`}>{user?.username}</Link> </span> <br />
          <span style={{ color: 'gray', fontSize: 'small' }}>{user?.bio || 'bio here'}</span>
        </div>
      </div>
      <SuggestedUsers />
    </div>
  )
}

export default RightSidebar
