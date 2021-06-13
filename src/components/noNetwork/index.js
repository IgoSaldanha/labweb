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

        <div id="modalNoNetwork" className="modalNoNetwork">

            <div className="noNetwork">
                <div className="alert-title">

                    <p>Verifique sua Conexão</p>

                </div>

                <div className="alert-confirm">
                    <div onClick={onClose} className="button-confirm false">Recarregar</div>
                </div>

            </div>

        </div>
    );
}