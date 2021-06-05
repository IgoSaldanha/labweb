import React from 'react';
import './style.css';

export default ({ alertTitle, setShow, exeFunction }) => {

    const onClose = () => {
        setShow(false)
    }

    /*
    const handleOutsideClick = (e) => {
        if (e.target.id === 'modalPorfileImage') onClose();
    };
    */

    const handleTrue = () => {
        onClose();
        exeFunction();

    }

    return (

        <div id="modalConfirmAlert" className="confirmModalAlert">

            <div className="confirmAlert">
                <div className="alert-title">

                    <p>{alertTitle}</p>

                </div>


                <div className="alert-confirm">
                    <div onClick={handleTrue} className="button-confirm true">Sim</div>
                    <div onClick={onClose} className="button-confirm false">Não</div>
                </div>

            </div>

        </div>
    );
}