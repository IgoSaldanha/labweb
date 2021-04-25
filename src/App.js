import React, { useState } from 'react';
import './App.css';
import Api from './Api'
// AREA DE IMPORTAÇÃO DOS ICONES
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Brightness6Icon from '@material-ui/icons/Brightness6';
//import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';

// AREA DE IMPORTAÇÃO DOS COMONENTES
import ChatListItem from './components/chatListItem/index'
import ChatIntro from './components/chatIntro/index'
import ChatWindow from './components/chatWindow/index'
import NewChat from './components/newChat/index'
import ProfileWindow from './components/profileWindow/index'
import StatusItem from './components/status/index'
import Login from './components/login/index'

export default () => {

    //DECLARAÇÃO DE CONSTANTES
    const [chatList, setChatList] = useState([
        { chatId: 1, title: 'Zecá Urubu', image: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4' },
        { chatId: 2, title: 'Pica Pau', image: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4' },
        { chatId: 3, title: 'Leoncio', image: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4' },
        { chatId: 4, title: 'Meu chapa', image: 'https://avatars.githubusercontent.com/u/59894220?s=60&v=4' },
    ]);

    // STATE DE USUARIO
    const [user, setUser] = useState(null);

    // MOSTRAR OU NÃO JANELA DE PERFIL
    const [showProfileWindow, setShowProfileWindow] = useState(false);
    const handleToogleProfileWindow = () => {
        setShowProfileWindow(!showProfileWindow)
        console.log(showProfileWindow)
    }

    // MOSTRAR OU NÃO BARRA DE NEW CHAT
    const [showNewChat, setShowNewChat] = useState(false);

    const handleToogleNewChat = () => {
        setShowNewChat(!showNewChat)
    }


    // STATE PARA GURADAR CHAT ATIVO
    const [activeChat, setActiveChat] = useState({});

    // FUNÇÃO PARA TROCA DE TEMA
    const html = document.querySelector('html');
    function toogleTheme() {
        html.classList.toggle('light-mode')
    }

    const handleLoginData = async (u) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL,
            email: u.email
        };
        await Api.addUser(newUser);
        setUser(newUser);
    }

    if (user === null) {
        return (
            <Login onReceive={handleLoginData} />
        )
    }

    return (


        <div className="app-window">



            {/* Barra de cima, marca do app e imagen do perfil logado */}
            <div className="top-bar">

                <p className="app-brand"></p>

                <div className="avatar" >
                    <img
                        className="user-avatar" onClick={handleToogleProfileWindow} src={user.avatar} alt=""
                    />
                </div>

            </div>

            {/* Parte geral da aplicação, barra de ferramentas, lista de contatos e janela de conteudo 
            */}

            <div className="app-content">

                {
                    showProfileWindow ?
                        <ProfileWindow
                            user={user}
                            showProfileWindow={showProfileWindow}
                            setShowProfileWindow={setShowProfileWindow}
                        />
                        :
                        null
                }

                {/* Barra de ferramentas */}
                <div className="toolbar">

                    <div className="tool-button">
                        <StatusItem style={{ fontSize: 30 }} />
                    </div>

                    <div onClick={toogleTheme} className="tool-button">
                        <Brightness6Icon style={{ fontSize: 30 }} />
                    </div>
                    
                    {/* 
                    <div className="tool-button">
                        <PlaylistAddCheckIcon style={{ fontSize: 30 }} />
                    </div>
                    */}

                    <div onClick={handleToogleNewChat} className="tool-button">
                        <ChatBubbleIcon style={{ fontSize: 30 }} />
                    </div>

                    <div className="tool-button">
                        <PowerSettingsNewIcon style={{ fontSize: 30 }} />
                    </div>

                </div>

                {/* Sidebar */}
                <div className="sidebar">

                    <NewChat
                        chatList={chatList}
                        user={user}
                        show={showNewChat}
                        setShow={setShowNewChat}
                    />

                    {/* Campo de busca */}
                    <div className="search">
                        <div className="search-input">
                            <SearchIcon fontSize="small" />
                            <input type="search" placeholder="Procurar conversa..." />
                        </div>
                    </div>

                    {/* Listagen de contatos */}
                    <div className="chatlist">
                        {chatList.map((item, key) => (
                            <ChatListItem
                                key={key}
                                data={item}
                                active={activeChat.chatId === chatList[key].chatId}
                                onClick={() => setActiveChat(chatList[key])}
                            />
                        ))}
                    </div>


                </div>

                {/* Area de conteudo */}

                <div className="content-area">

                    {activeChat.chatId !== undefined &&
                        <ChatWindow
                            user={user}
                        />
                    }
                    {activeChat.chatId === undefined &&
                        <ChatIntro />
                    }

                </div>

            </div>

        </div>
    )
}