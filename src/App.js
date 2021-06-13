import React, { useEffect, useState } from 'react';
import './App.css';
import Api from './Api'
// AREA DE IMPORTAÇÃO DOS ICONES
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
//import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Brightness6Icon from '@material-ui/icons/Brightness6';
//import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';
import BugReportIcon from '@material-ui/icons/BugReport';


// AREA DE IMPORTAÇÃO DOS COMONENTES
import ChatListItem from './components/chatListItem/index'
import ChatIntro from './components/chatIntro/index'
import ChatWindow from './components/chatWindow/index'
import NewChat from './components/newChat/index'
import ProfileWindow from './components/profileWindow/index'
import ProfileImage from './components/profileImage/index'
import Login from './components/login/index'
import NoCompatible from './components/noCompatible/index'
import ConfirmAlert from './components/confirmAlert/index'
import NoNetwork from './components/noNetwork/index'

export default () => {


    let storageUser = JSON.parse(localStorage.getItem('userData'));
    let screenWidth = window.innerWidth;

    //DECLARAÇÃO DE CONSTANTES
    const [chatList, setChatList] = useState([]);
    const [user, setUser] = useState(storageUser);
    const [showProfileWindow, setShowProfileWindow] = useState(false);
    const [showProfileImage, setShowProfileImage] = useState(false);
    const [showNewChat, setShowNewChat] = useState(false);
    const [activeChat, setActiveChat] = useState({});
    const [searchTermChats, setSearchTermChats] = useState('');
    const [profileImageActive, setProfileImageActive] = useState('');

    const [showConfirmLogout, setShowConfirmLogout] = useState(false);

    window.addEventListener("online", function (e) {

    }, false);


    const verifyConnection = () => {

        window.location.reload()

    }

    window.addEventListener("offline", verifyConnection)




    if (screenWidth < 768) {
        return (
            <NoCompatible />
        )
    }

    // FUNCTIONS

    // Mostrar Modal de Perfil
    const handleToogleProfileWindow = () => {
        setShowProfileWindow(!showProfileWindow)
        console.log(showProfileWindow)
    }

    // Mostrar Barra de NewChat
    const handleToogleNewChat = () => {
        setShowNewChat(!showNewChat)
    }

    // Trocar de Tema
    const html = document.querySelector('html');
    function toogleTheme() {
        html.classList.toggle('light-mode')
    }


    // Adicionar novo usuario no Banco
    const handleLoginData = async (u) => {

        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL,
            email: u.email
        };

        await Api.addUser(newUser);
        localStorage.setItem('userData', JSON.stringify(newUser));
        let storageUser = JSON.parse(localStorage.getItem('userData'));
        setUser(storageUser);

    }

    // Monitorar lista de chats

    useEffect(() => {
        if (user !== null) {
            let unsub = Api.onChatList(user.id, setChatList);
            return unsub;
        }
    }, [user]);

    // Verificar se tem usuario Autenticado

    if (user === null) {
        return (
            <Login onReceive={handleLoginData} />
        )
    }

    const confirmLogout = () => {
        setShowConfirmLogout(true)
    }

    const handleLogout = () => {

        Api.singOut();
        setUser(null);
        localStorage.removeItem('userData')

    }


    return (

        < div className="app-window" >

            {
                showConfirmLogout ?
                    <ConfirmAlert

                        alertTitle={"Deseja sair do Sistema?"}
                        setShow={setShowConfirmLogout}
                        exeFunction={handleLogout}

                    />
                    :
                    null
            }

            {/* Parte geral da aplicação, barra de ferramentas, lista de contatos e janela de conteudo 
            */}
            {
                showProfileWindow ?
                    <ProfileWindow
                        user={user}
                        setUser={setUser}
                        showProfileWindow={showProfileWindow}
                        setShowProfileWindow={setShowProfileWindow}
                    />
                    :
                    null
            }

            {
                showProfileImage ?
                    <ProfileImage
                        user={user}
                        setUser={setUser}
                        showProfileImage={showProfileImage}
                        setShowProfileImage={setShowProfileImage}
                        profileImageActive={profileImageActive}
                    />
                    :
                    null
            }


            {/* Barra de ferramentas */}
            <div className="toolbar">


                <div className="tool-button">
                    <a href="https://forms.gle/bz11PiG8BFqsubBC6" target="_blank">
                        <BugReportIcon style={{ fontSize: 35 }} />
                    </a>
                </div>


                <div className="tool-button">
                    <img
                        className="user-avatar" onClick={handleToogleProfileWindow} src={user.avatar} alt=""
                    />
                </div>


                <div onClick={toogleTheme} className="tool-button">
                    <Brightness6Icon style={{ fontSize: 30 }} />
                    
                </div>


                <div onClick={handleToogleNewChat} className="tool-button">
                    <ChatBubbleIcon style={{ fontSize: 30 }} />
                </div>

                <div className="tool-button" onClick={confirmLogout} >
                    <PowerSettingsNewIcon style={{ fontSize: 30 }} />
                </div>



            </div>

            {/* Sidebar */}
            <div className="sidebar">

                {/* Campo de busca */}
                <div className="search">
                    <div className="search-input">
                        <SearchIcon fontSize="small" />
                        <input type="search" placeholder="Procurar conversa..." onChange={event => { setSearchTermChats(event.target.value) }} />
                    </div>
                </div>

                {/* Listagen de contatos */}
                <div className="chatlist">
                    {chatList.filter((val) => {
                        if (searchTermChats === "") {
                            return val
                        } else if (val.title.toLowerCase().includes(searchTermChats.toLowerCase())) {
                            return val
                        }
                    }).map((item, key) => (
                        <ChatListItem
                            key={key}
                            data={item}
                            user={user}
                            setActiveChat={setActiveChat}
                            active={activeChat.chatId === chatList[key].chatId}
                            onClick={() => setActiveChat(chatList[key])}
                            showProfileImage={showProfileImage}
                            setShowProfileImage={setShowProfileImage}
                            setProfileImageActive={setProfileImageActive}
                        />
                    ))}
                </div>


            </div>

            {/* Area de conteudo */}

            <div className="content-area">

                {activeChat.chatId !== undefined &&
                    <ChatWindow
                        user={user}
                        data={activeChat}
                    />
                }
                {activeChat.chatId === undefined &&
                    <ChatIntro />
                }

            </div>



            {
                showNewChat ?
                    <NewChat
                        chatList={chatList}
                        user={user}
                        show={showNewChat}
                        setShow={setShowNewChat}
                    />
                    :
                    null
            }


        </div >
    )
}