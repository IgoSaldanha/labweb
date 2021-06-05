import React from 'react';
import './style.css'
import DeleteIcon from '@material-ui/icons/Delete';

import Api from '../../Api'



export default ({ key, setActiveChat, user, onClick, active, data, showProfileImage, setShowProfileImage, setProfileImageActive }) => {

    const toogleProfileImage = () => {
        setShowProfileImage(true)
        setProfileImageActive(data.image)
    }

    const handleRemoveChat = () => {
        if (active) {
            Api.deleteChat(user, data);
            setActiveChat('')

        } else {

            Api.deleteChat(user, data);

        }
    }

    return (

        <div
            className="chatListItem"
            className={`chatListItem ${active ? 'active' : ''}`}
        >
            <div className="chat-info">
                <img className="chatListItem-avatar" onClick={toogleProfileImage} src={data.image} alt="" />
                <div className="chatListItemName" onClick={onClick} >{data.title}</div>
            </div>

            <div className="chat-delete" onClick={handleRemoveChat}>
                <DeleteIcon style={{ fontSize: 20 }} />
            </div>

        </div>

    );
}