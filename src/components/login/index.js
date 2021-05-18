import React from 'react';
import './style.css';
import Api from '../../Api'

export default ({ onReceive }) => {
    const handleGoogleLogin = async () => {
        let result = await Api.goPopup();

        if (result) {
            alert("logado")
            onReceive(result.user)
        } else {
            alert('Erro!');
        }
    }
    return (

        <div className="login">

            <div className="logo">
                <img src="https://firebasestorage.googleapis.com/v0/b/wanchat-5f188.appspot.com/o/logo.webp?alt=media&token=ccae5cd9-651b-4a70-8ab1-0fed5acf12ee" alt="" />
            </div>

            <div className="auth-area">

                <form className="form-auth">

                    <div className="item">
                        <label for="mail">E-mail:</label>
                        <input type="email" id="mail" placeholder="exemple@dominio.com" />
                    </div>

                    <div className="item">
                        <label for="pass">Senha:</label>
                        <input type="password" id="name" placeholder="********************" />
                    </div>

                    <div class="button">
                        <button type="submit">Entrar</button>
                    </div>

                </form>

                <p className="or">ou</p>

                <div onClick={handleGoogleLogin} className="auht-google">
                    <img src="https://firebasestorage.googleapis.com/v0/b/wanchat-5f188.appspot.com/o/pesquisa.png?alt=media&token=2ab0aa1c-cb30-4be4-9280-d5a5ea16adaf" alt="" />
                    <p>Entrar com Google</p>
                </div>

            </div>



        </div>
    );
}