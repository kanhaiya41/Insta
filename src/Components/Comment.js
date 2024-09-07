import React from 'react'

const Comment = ({ com }) => {
    return (
        <div >
            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <img src={com?.author?.profilePicture} className='ProfilePicturesidebar' alt="pp" />
                <p style={{ fontWeight: 'bold', fontSize: 'small' }}>{com?.author.username} <span style={{ paddingLeft: 1, fontSize: 'normal' }}>{com?.text}</span> </p>
            </div>
        </div>
    )
}

export default Comment
