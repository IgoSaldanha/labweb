import React, { useState } from 'react';
import './style.css';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default (showProfile) => {



    return (
        <div className="profileWindow" style={{ left: showProfile ? '25%' : 3000 }}>

            <div className="profile-window-config">
                <div className="hearder-profile">
                    <div className="header-profile-info">
                        <img clasName="profile-avatar" src="https://avatars.githubusercontent.com/u/59894220?s=60&v=4" alt=""/>
                        <p>Igo Saldanha</p>
                    </div>
                    <div className="header-profile-more">
                        <MoreHorizIcon style={{ fontSize: 30 }}/>
                    </div>
                </div>

                <div className="content-profile">

                    <div className="content-profile-items">
                        <div className="content-info">
                            <p>Código de convite</p>
                            <div>10290373</div>
                        </div>
                        <div className="button-profile">Copiar</div>
                    </div>

                    <div className="content-profile-items">
                        <div className="content-info">
                            <p>Usuario</p>
                            <div>Igo Saldanha</div>
                        </div>
                        <div className="button-profile">Editar</div>
                    </div>

                    <div className="content-profile-items">
                        <div className="content-info">
                            <p>Email</p>
                            <div>igo@gmail.com</div>
                        </div>
                        <div className="button-profile">Editar</div>
                    </div>

                </div>
            </div>
            <div className="remove-account">

            </div>
        </div>
    );
}