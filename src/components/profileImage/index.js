import React from 'react';
import './style.css';

export default ({ showProfileImage, setShowProfileImage, user, setUser, profileImageActive }) => {

    const onClose = () => {
        setShowProfileImage(false)
    }

    const handleOutsideClick = (e) => {
        if (e.target.id === 'modalPorfileImage') onClose();
    };

    return (

        <div id="modalPorfileImage" className="profileImage" onClick={handleOutsideClick}>

            <img className="full-image" src={profileImageActive} alt="" />

        </div>
    );
}