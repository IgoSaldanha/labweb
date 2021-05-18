import React, { useState } from 'react';
import './style.css';
import Api from '../../Api'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';

export default ({ showProfileWindow, setShowProfileWindow, user, setUser }) => {

    const onClose = () => {
        setShowProfileWindow(!showProfileWindow)
    }

    const handleOutsideClick = (e) => {
        if (e.target.id === 'modalPorfile') onClose();
    };

    const handleCLoseButton = () => {
        onClose();
    }

    const removeUser = async () => {

        let resp = window.confirm("Deseja excluir sua conta?")
        onClose();
        if (resp) {
            await Api.removeUser(user.id);
            setUser(null);
            alert("SUA CONTA FOI DELETADA")

        }
    }

    return (

        <div id="modalPorfile" className="profileWindow" onClick={handleOutsideClick}>

            <div className="profile-window-config">

                <div className="hearder-profile">
                    <div className="header-profile-info">
                        <img clasName="profile-avatar" src={user.avatar} alt="" />
                        <p>{user.name}</p>
                    </div>
                    <div className="header-profile-close" onClick={handleCLoseButton}>
                        <CloseIcon style={{ fontSize: 30 }} />
                    </div>
                </div>

                <div className="content-profile">

                    <div className="content-profile-items">
                        <div className="content-info">
                            <p>Código de convite</p>
                            <div id="convitCode">{user.id}</div>
                        </div>
                        <div className="button-profile">Copiar</div>
                    </div>

                    <div className="content-profile-items">
                        <div className="content-info">
                            <p>Usuario</p>
                            <div>{user.name}</div>
                        </div>
                        <div className="button-profile">Editar</div>
                    </div>

                    <div className="content-profile-items">
                        <div className="content-info">
                            <p>Email</p>
                            <div>{user.email}</div>
                        </div>
                        <div className="button-profile">Editar</div>
                    </div>
                    <hr className="divider" noshade="noshade" />
                    <div className="remove-account">
                        <div className="content-info">
                            <p>EXCLUIR CONTA</p>
                        </div>
                        <div className="button-profile-remove" onClick={removeUser}>Excluir Conta</div>
                    </div>

                </div>


            </div>

        </div>
    );
}