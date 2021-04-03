import React, {useState, useEffect} from 'react';
import './App.css';

// AREA DE IMPORTAÇÃO DOS ICONES
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';

// AREA DE IMPORTAÇÃO DOS COMONENTES
import ChatListItem from './components/chatListItem/index'

//AREA DE FUNÇÕES

const html = document.querySelector('html');

function toogleTheme() {
    html.classList.toggle('light-mode')
}

export default () => {

    const [chatList, setChatList] = useState([{},{},{},{},{},{},{},{},{},{},{}]);

    return (
        <div className="app-window">

            {/* Barra de cima, marca do app e imagen do perfil logado */}
            <div className="top-bar">

                <p className="app-brand">LOGO</p>
                <img className="user-avatar" src="https://avatars.githubusercontent.com/u/59894220?s=60&v=4" alt=""/>
            
            </div>

            {/* Parte geral da aplicação, barra de ferramentas, lista de contatos e janela de conteudo 
            */}

            <div className="app-content">

                {/* Barra de ferramentas */}
                <div className="toolbar">

                    <div onClick={toogleTheme} className="tool-button">
                        <Brightness6Icon style={{ fontSize: 30 }}/>
                    </div>
                    <div className="tool-button">
                        <ChatBubbleIcon style={{ fontSize: 30 }}/>
                    </div>
                    <div className="tool-button">
                        <PowerSettingsNewIcon style={{ fontSize: 30 }}/>
                    </div>

                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    
                    {/* Campo de busca */}
                    <div className="search">
                        <div className="search-input">
                            <SearchIcon fontSize="small"/>
                            <input type="search" placeholder="Procurar conversa..."/>
                        </div>
                    </div>

                    {/* Listagen de contatos */}
                    <div className="chatlist">
                        {chatList.map((item, key)=>(
                            <ChatListItem
                                key={key}

                            />
                        ))}
                    </div>

                </div>

                {/* Area de conteudo */}
                <div className="content-area"></div>

            </div>

        </div>
    )
}