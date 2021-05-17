import React, { useState } from 'react';
import './style.css';

export default () => {

    const [showModalStatus, setShowModalStatus] = useState(false)
    const [activeStatus, setActiveStatus] = useState(1)

    const handleShowtoggleStatus = () => {
        setShowModalStatus(!showModalStatus)
    }

    const handleToggleActiveStatus = (e) => {
        if (e.target.id === "avaliable") {
            setActiveStatus(1);
        }
        if (e.target.id === "unavaliable") {
            setActiveStatus(2);
        }
        if (e.target.id === "offline") {
            setActiveStatus(3);
        }
    }

    return (
        <div>
            <div className="status-item" onClick={handleShowtoggleStatus}>
                <div className="toggle-status" style={{

                }}>

                </div>
            </div>


            <div className="modal-toggle-status" style={{ visibility: showModalStatus ? 'unset' : 'hidden' }}>

                <div id="avaliable" className="modal-item">
                    <p>Disponível</p>
                    <div className="avaliable"></div>
                </div>

                <div id="unavaliable" className="modal-item">
                    <p>Emergência</p>
                    <div className="unavaliable"></div>
                </div>

                <div id="offline" className="modal-item">
                    <p>Vida ou Morte</p>
                    <div className="offline"></div>
                </div>

            </div>

        </div>
    );
}