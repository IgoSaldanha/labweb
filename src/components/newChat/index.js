import React, {useState} from 'react';
import './style.css';
import SearchIcon from '@material-ui/icons/Search';

export default ({chatList, user, show, setShow}) => {

    const [list, setList] = useState([
        {id: 1, avatar: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4', name: 'Novo Contato'},
        {id: 2, avatar: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4', name: 'Novo Contato'},
        {id: 3, avatar: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4', name: 'Novo Contato'},
        {id: 4, avatar: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4', name: 'Novo Contato'},
        {id: 5, avatar: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4', name: 'Novo Contato'},
        {id: 6, avatar: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4', name: 'Novo Contato'},
        {id: 7, avatar: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4', name: 'Novo Contato'},
        {id: 8, avatar: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4', name: 'Novo Contato'}
    ])

    return (
        <div className="newChat" style={{left: show? '5%' : -600}}>
            
            <div className="newChat-head">
                
                <div className="newChat-search">
                    <div className="newChat-search-input">
                        <SearchIcon fontSize="small"/>
                        <input type="search" placeholder="Nova conversa"/>
                    </div>
                </div>
            </div>
            
            <div className="newChat-list">
                {list.map((item, key)=>(
                    <div className="newChat-item">
                        <img className="newChat-item-avatar" src={item.avatar} alt=""/>
                        <div className="newChat-item-name">{item.name}</div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}