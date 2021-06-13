import React, { useState, useEffect } from 'react';
import './style.css';
import Api from '../../Api';
import SearchIcon from '@material-ui/icons/Search';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

export default ({ chatList, user, show, setShow }) => {

    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let result = await Api.getContactList(user.id);
                setList(result);
            }
        }
        getList();
    }, [user]);

    const handleOutsideClick = (e) => {
        if (e.target.id === 'modal-newChat') handleClose();
    };

    const handleClose = () => {
        setShow(false);
    }

    const addNewChat = async (user2) => {

        let withChat;

        chatList.map((item, key) => {

            if (item.with == user2.id) {
                withChat = true;
            }

        })

        if (!withChat) {
            await Api.addNewChat(user, user2);
            withChat = undefined
        }

        handleClose()

    }

    return (

        <div id="modal-newChat" className="modal-overlay-newChat" onClick={handleOutsideClick}>

            <div className="modal-newChat">

                <div className="newChat-head">

                    <div className="newChat-search">
                        <div className="newChat-search-input">
                            <SearchIcon fontSize="small" />
                            <input type="search" placeholder="Nova conversa" onChange={event => { setSearchTerm(event.target.value) }} />
                        </div>

                    </div>
                </div>


                <div className="newChat-list">

                    {list.filter((val) => {
                        if (searchTerm === "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                        }
                    }).map((item, key) => (
                        <div onClick={() => addNewChat(item)} className="newChat-item">
                            <img className="newChat-item-avatar" src={item.avatar} alt="" />
                            <div className="newChat-item-name">{item.name}</div>
                        </div>
                    ))}

                </div>

            </div>

        </div >
    );
}