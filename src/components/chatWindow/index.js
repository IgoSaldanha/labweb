import React,  { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

import './style.css'

import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import CloseIcon from '@material-ui/icons/Close';

export default () => {

    const [emojiOpen, setEmojiOpen] = useState(false)

    // AREA DE FUNÇÕES

    const handleEmojiClick = () =>{

    }
    const handleOpenEmoji = () =>{
        setEmojiOpen(true);
    }
    const handleCloseEmoji = () =>{
        setEmojiOpen(false);
    }

  return (
    <div className="chatWindow">
       <div className="chatWindow-header">

           <div className="chatWindow-header-info">
                <img className="chatWindow-avatar" src='https://avatars.githubusercontent.com/u/59894220?s=60&v=4' alt=""/>
                <div className="chatWindow-name">Igo Saldanha</div>
           </div>

           <div className="chatWindow-header-buttons">
                <div className="chatWindow-button">
                    <MoreVertIcon style={{ fontSize: 30 }}/>
                </div>
           </div>
       </div>

       <div className="chatWindow-body"></div>

       <div 
            className="chatWindow-emojiarea" 
            style={{height: emojiOpen ? '320px' : '0px'}}
        >
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />    
       </div>

       <div className="chatWindow-footer">

            <div className="chatWindow-before">
                
                <div 
                    className="chatWindow-button"
                    onClick={handleCloseEmoji}
                    style={{width: emojiOpen?40:0}}
                >
                    <CloseIcon style={{ fontSize: 30 }}/>
                </div>

                <div 
                    className="chatWindow-button"
                    onClick={handleOpenEmoji}
                >
                    <InsertEmoticonIcon style={{ fontSize: 30, color: emojiOpen? '43B581':''}}/>
                </div>

                <div className="chatWindow-button">
                    <AddPhotoAlternateIcon style={{ fontSize: 30 }}/>
                </div>  
            </div>
            <div className="chatWindow-input-area">
                <input className="chatWindow-input" type="text" placeholder="Digite uma mensagen"/>
            </div>

            <div className="chatWindow-later">
                <div className="chatWindow-button">
                    <SendIcon style={{ fontSize: 30 }}/>
                </div>
            </div>
       </div>

    </div>
  );
}