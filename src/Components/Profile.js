import React, { useState } from 'react'
import Sidebar from './Sidebar'
import useGetUserProfile from '../hooks.js/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faComment, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');


  const { userProfile ,user} = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id===userProfile?._id;
  const isFollowing = false;

  const HandleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div>
      <Sidebar />
      <div style={{ display: 'flex', maxWidth: '4xl', justifyContent: 'center', margin: '0 auto', paddingLeft: '100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 8 }}>
          <div className='profilegrid'>
            <section style={{ display: 'flex', alignItems: "center", justifyContent: "cneter" ,height:'150px',width:'150px'}}>
              {
                userProfile?.profilePicture ? <img src={userProfile?.profilePicture} alt="Profile photo" style={{ borderRadius: '50%', height: '150px', width:'150px' }} /> : <FontAwesomeIcon icon={faUser} />
              }
            </section>
            <section>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ display: "flex", alignItems: 'center', gap: 2 }}>
                  <span>{userProfile?.username}</span>
                  {
                    isLoggedInUserProfile ? (
                      <div>
                        <Link to='/account/edit'><button className='editbtnprofile'>Edite Profile</button></Link>
                        <button className='editbtnprofile'>View archive</button>
                        <button className='editbtnprofile'>Ad tools</button>
                      </div>
                    ) : (isFollowing ? (<>
                      <button className='unflwprofile' >Unfollow</button>
                      <button className='unflwprofile' >Message</button>
                    </>
                    ) :
                      <button className='flwunflwprofile' >Follow</button>
                    )
                  }

                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <p><span style={{ fontWeight: 'bold' }}>{userProfile?.posts?.length} </span> posts</p>
                  <p><span style={{ fontWeight: 'bold' }}>{userProfile?.followers?.length} </span> followers</p>
                  <p><span style={{ fontWeight: 'bold' }}>{userProfile?.following?.length} </span> following</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontWeight: 'bold' }}>{userProfile?.bio || 'bio here'}</span>
                  <span className='authorpost'><FontAwesomeIcon icon={faAt} /> {userProfile?.username}</span>
                  <span>Full-stack-developer</span>
                  <span>Codding in IT Field</span>
                  <span>BCA Holer IT Student</span>
                </div>
              </div>
            </section>
          </div>
          <div style={{ borderTop: 'gray 1px solid' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', fontSize: 'small' }}>
              <span style={{ padding: '10px', cursor: 'pointer', fontWeight: activeTab === 'posts' ? 'bold' : 'normal' }} onClick={() => HandleTabChange('posts')} >POSTS</span>
              <span style={{ padding: '10px', cursor: 'pointer', fontWeight: activeTab === 'saved' ? 'bold' : 'normal' }} onClick={() => HandleTabChange('saved')} >SAVED</span>
              <span style={{ padding: '10px', cursor: 'pointer' }}>REELS</span>
              <span style={{ padding: '10px', cursor: 'pointer' }}>TAGES</span>
            </div>
            <div style={{ display: 'grid', gridColumn: '3', gap: '10px', gridTemplateColumns: 'auto auto' }}>
              {displayedPost?.map((post) => {
                return (
                  <div style={{ position: 'relative', cursor: 'pointer',display:'flex',alignItems:'center',justifyContent:'center' }} key={post._id}>
                    <img src={post.image} alt="post" className='postinprofile' />
                    <div className='postnicheprofile'>
                      <div style={{ display: 'flex', alignItems: 'center' , gap:'30px' }}> 
                        <button className='profilepostlikebtn' ><FontAwesomeIcon icon={faHeart} />
                          <span>{post?.likes.length}</span>
                        </button>
                        <button className='profilepostlikebtn' ><FontAwesomeIcon icon={faComment} />
                          <span>{post?.comment.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })

              }
            </div>

          </div>
        </div>



      </div>
    </div>
  )
}

export default Profile
