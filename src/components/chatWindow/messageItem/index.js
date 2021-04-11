import React from 'react';
import './style.css';

export default ({data, user}) => {
    return (
        <div 
            className="message-line"
            style={{
                justifyContent: user.id === data.author ? 'flex-end': 'flex-start'
            }}
        >
            <div 
                className="message-item"
                style={{
                    backgroundColor: user.id === data.author ? 'var(--bg-message-user)': 'var(--bg-message-contact)'
                }}
            >
                <div className="message-text">{data.body}</div>
                <div className="message-date">22:00</div>

            </div>

        </div>
    );
}