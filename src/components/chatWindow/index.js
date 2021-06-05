import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './style.css';
import Api from '../../Api';

//import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
//import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import CloseIcon from '@material-ui/icons/Close';
import MessageItem from './messageItem/index'
import DeleteIcon from '@material-ui/icons/Delete';

export default ({ user, data }) => {

    // FUNÇÃO DE DIGITAÇÃO POR VOZ ATRAVÉS DO BOTÃO DE MICROFONE //

    const [listening, setListening] = useState(false);

    let recognition = null;
    // Testa se o navegador suporta
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    // evento da captura de voz
    const handleMicClick = () => {
        if (recognition !== null) {

            recognition.onstart = () => {
                setListening(true);
            }

            recognition.onend = () => {
                setListening(false);
            }

            // colocar o texto no area de input
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript);
            }

            recognition.start();
        }
    }

    // CONFIGURÇÃO DO EMOJI PICKER
    const [emojiOpen, setEmojiOpen] = useState(false)

    // Captura o objeto e cocatena o emoji no campo de texto através do evento
    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji)
    }

    // Adicionar o emoji Picker em tela, atráves do State emojiOpen
    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    // retirar o emoji Picker da tela atráves do State emojiOpen
    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const [users, setUsers] = useState([]);

    // STATE PARA GUARDAR TEXTO DO IMPUT
    const [text, setText] = useState()

    // STATE DE LISTA DE MENSAGENS
    const [list, setList] = useState([])

    // Controlar o Body, para colocar o Scroll no final
    const body = useRef();


    useEffect(() => {


        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;

    }, [data.chatId]);

    useEffect(() => {

        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }

    }, [list]);

    // FUNÇÃO DE ENVIO DE MENSAGENS
    const handleInputKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleSendClick();
        }
    }

    const handleSendClick = () => {
        if (text !== '') {
            Api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }

    const handleDeleteMessages = () => {

        Api.deleteMessages(data.chatId);
        setList([]);

    }

    return (

        // JANELA PRINCIPAL DE CHAT //
        <div className="chatWindow">

            {/* CABEÇALHO */}
            <div className="chatWindow-header">

                <div className="chatWindow-header-info">
                    <img className="chatWindow-avatar" src={data.image} alt="" />
                    <div className="chatWindow-name">{data.title}</div>
                </div>


                <div className="chatWindow-header-buttons" onClick={handleDeleteMessages}>

                    <DeleteIcon style={{ fontSize: 25 }} />
                    <div className="button-delete-mensages">LIMPAR MENSAGENS</div>

                </div>


            </div>

            {/* ÁREA DE MENSAGENS */}

            <div ref={body} className="chatWindow-body">
                {
                    list.map((item, key) => (
                        <MessageItem
                            key={key}
                            data={item}
                            user={user}
                        />
                    ))
                }
            </div>

            {/* AREA DO EMOJI PIECKER */}
            <div
                className="chatWindow-emojiarea"
                style={{ height: emojiOpen ? '320px' : '0px' }}
            >
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>

            {/* ÁREA DE CONFIGURÇÃO E ENVIO DE MENSAGENS */}
            <div className="chatWindow-footer">

                {/* BOTÕES DE EMOJI E ENVIO DE ARQUIVOS */}
                <div className="chatWindow-before">

                    <div
                        className="chatWindow-button"
                        onClick={handleCloseEmoji}
                        style={{ width: emojiOpen ? 40 : 0 }}
                    >
                        <CloseIcon style={{ fontSize: 30 }} />
                    </div>

                    <div
                        className="chatWindow-button"
                        onClick={handleOpenEmoji}
                    >
                        <InsertEmoticonIcon style={{ fontSize: 30, color: emojiOpen ? '43B581' : '' }} />
                    </div>

                    {/* 
                    <div className="chatWindow-button">
                        <AddPhotoAlternateIcon style={{ fontSize: 30 }} />
                    </div>
                    */}

                </div>

                {/* ÁREA DE DIGITAÇÃO DA MENSAGEN */}
                <div className="chatWindow-input-area">
                    <input
                        className="chatWindow-input"
                        type="text"
                        placeholder="Digite uma mensagen"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                </div>

                {/* BOTÕES DE MICROFONE E ENVIO DE MENSAGEM */}
                <div className="chatWindow-later">

                    {text === '' &&
                        <div onClick={handleMicClick} className="chatWindow-button">
                            <MicIcon style={{ fontSize: 30, color: listening ? '43B581' : '' }} />
                        </div>
                    }
                    {text !== '' &&
                        <div onClick={handleSendClick} className="chatWindow-button">
                            <SendIcon style={{ fontSize: 30 }} />
                        </div>
                    }

                </div>
            </div>

        </div>
    );
}