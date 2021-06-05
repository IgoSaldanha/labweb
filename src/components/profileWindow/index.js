import React, { useState } from 'react';
import './style.css';
import Api from '../../Api'

import CloseIcon from '@material-ui/icons/Close';
import ConfirmAlert from '../confirmAlert/index'


export default ({ showProfileWindow, setShowProfileWindow, user, setUser }) => {


    const [showConfirmDeleteUser, setShowConfirmDeleteUser] = useState(false);

    const onClose = () => {
        setShowProfileWindow(!showProfileWindow)
    }

    const handleOutsideClick = (e) => {
        if (e.target.id === 'modalPorfile') onClose();
    };

    const handleCLoseButton = () => {
        onClose();
    }

    const confirmDelete = () => {
        setShowConfirmDeleteUser(true)
    }

    const removeUser = async () => {

        await Api.removeUser(user.id);
        setUser(null);
        localStorage.removeItem('userData')

    }

    return (

        <div id="modalPorfile" className="profileWindow" onClick={handleOutsideClick}>

            {
                showConfirmDeleteUser ?
                    <ConfirmAlert

                        alertTitle={"Deseja exluir sua conta?"}
                        setShow={setShowConfirmDeleteUser}
                        exeFunction={removeUser}

                    />
                    :
                    null
            }



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
                        <div className="button-profile-remove" onClick={confirmDelete}>Excluir Conta</div>
                    </div>

                </div>


            </div>

        </div>
    );
}