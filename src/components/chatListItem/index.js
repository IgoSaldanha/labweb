import React from 'react';
import './style.css'
import DeleteIcon from '@material-ui/icons/Delete';

import Api from '../../Api'



export default ({ onClick, active, data }) => {

    return (
        <div
            className="chatListItem"
            className={`chatListItem ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            <img className="chatListItem-avatar" src={data.image} alt="" />
            <div className="chatListItemName">{data.title}</div>
        </div>
    );
}