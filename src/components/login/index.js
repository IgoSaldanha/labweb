import React from 'react';
import './style.css';
import Api from '../../Api'

export default ({ onReceive }) => {

    const handleGoogleLogin = async () => {
        let result = await Api.goPopup();

        if (result) {
            console.log(result.user)
            onReceive(result.user)
        } else {
            alert('Erro!');
        }
    }

    return (

        <div className="login">

            <nav className="navBar">

                <ul>
                    <li>
                        <div className="logotipo">
                            <img src="https://firebasestorage.googleapis.com/v0/b/wanchat-5f188.appspot.com/o/logo.webp?alt=media&token=ccae5cd9-651b-4a70-8ab1-0fed5acf12ee" alt="" />
                        </div>
                    </li>
                    <li>
                        <div onClick={handleGoogleLogin} className="auht-google">
                            <img src="https://firebasestorage.googleapis.com/v0/b/wanchat-5f188.appspot.com/o/pesquisa.png?alt=media&token=2ab0aa1c-cb30-4be4-9280-d5a5ea16adaf" alt="" />
                            <p>Entrar com Google</p>
                        </div>
                    </li>
                </ul>

            </nav>

            <div className="content">

                <div className="item">
                    <div className="text">
                        <h2>Converse com seus amigos a hora que quiser!</h2>
                        <p>O WanChats está online 24h por dia,
                        para que você possa mandar aquela mensagem quando e onde quiser!</p>
                    </div>

                    <div className="img">

                        <img src="https://firebasestorage.googleapis.com/v0/b/wanchat-5f188.appspot.com/o/Post-cuate.svg?alt=media&token=bcd10687-8172-4933-a831-3b7ead4fd01e" alt="" />

                    </div>

                </div>

                <div className="item dest">

                    <div className="img">
                        <img src="https://firebasestorage.googleapis.com/v0/b/wanchat-5f188.appspot.com/o/Cyber%20attack-cuate.svg?alt=media&token=a2bdc831-3799-44a6-87a1-43733c49cb08" alt="" />

                    </div>

                    <div className="text">
                        <h2>Sem vazamentos!</h2>
                        <p>Nosso sistema é focado na sua privacidade, portanto, nenhuma informação de usuário será vendida.</p>
                    </div>

                </div>

                <div className="item">

                    <div className="text">
                        <h2>Sem dificuldades!</h2>
                        <p>O WanChats foi desenhado para que seja ágil e fácil de usar, sem a necessidade de tutorial.</p>
                    </div>

                    <div className="img">
                        <img src="https://firebasestorage.googleapis.com/v0/b/wanchat-5f188.appspot.com/o/Work%20in%20progress-pana.svg?alt=media&token=4c1ec519-4e1d-4bf1-84c0-b3ab6d199a3e" alt="" />

                    </div>


                </div>
            </div>

            <div className="footer">
                <p>Copyrigt &copy; - Wanchats 2021</p>
            </div>
        </div>
    );
}