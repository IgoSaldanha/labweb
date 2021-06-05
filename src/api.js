import firebase from 'firebase/app';
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();

export default {

    goPopup: async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        let result = await firebaseApp.auth().signInWithPopup(provider)
        return result;
    },

    singOut: () => {

        firebase.auth().signOut().then(() => {
            console.log('Sucesso')
        }).catch((error) => {
            console.log('Erro')
        });
    },

    addUser: async (u) => {
        await db.collection('users').doc(u.id).set({
            name: u.name,
            avatar: u.avatar,
            email: u.email
        }, { merge: true });
    },

    removeUser: (userId) => {

        db.collection("users").doc(userId).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

    },

    getContactList: async (userId) => {

        let list = [];
        let results = await db.collection('users').get();
        results.forEach(result => {
            let data = result.data();
            if (result.id !== userId) {
                list.push({
                    id: result.id,
                    name: data.name,
                    avatar: data.avatar
                });
            }
        });
        return list
    },


    addNewChat: async (user, user2) => {

        let newChat = await db.collection('chats').add({
            messages: [],
            users: [user.id, user2.id]
        })

        db.collection('users').doc(user.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user2.name,
                image: user2.avatar,
                with: user2.id
            })
        });

        db.collection('users').doc(user2.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user.name,
                image: user.avatar,
                with: user.id
            })
        });
    },

    deleteChat: (user, data) => {

        db.collection('chats').doc(data.chatId).delete();

        db.collection('users').doc(data.with).update({
            chats: firebase.firestore.FieldValue.arrayRemove({
                chatId: data.chatId,
                title: user.name,
                image: user.avatar,
                with: user.id
            })
        });

        db.collection('users').doc(user.id).update({
            chats: firebase.firestore.FieldValue.arrayRemove({
                chatId: data.chatId,
                title: data.title,
                image: data.image,
                with: data.with
            })
        });

    },

    /*
    
        

    */


    deleteMessages: (chat) => {

        db.collection('chats').doc(chat).update({
            messages: []
        });
    },

    /*
 
    removeChat: async (chatId) => {
 
        await db.collection("chats").doc(chatId).delete();
    },
 
    deleteChat: async (user, key) => {
 
        var Ref = db.collection('users').doc(user);
 
        // Remove the 'capital' field from the document
        var upDoc = Ref.update({
            chats: firebase.firestore.FieldValue.delete(key)
        });
 
        console.log(upDoc);
 
    },
 
    */

    onChatList: (userId, setChatList) => {
        return db.collection('users').doc(userId).onSnapshot((doc) => {
            if (doc.exists) {
                let data = doc.data();

                if (data.chats) {
                    let chats = [...data.chats];

                    chats.sort((a, b) => {
                        if (a.lastMessageDate === undefined) {
                            return -1;
                        }
                        if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
                            return 1;
                        } else {
                            return -1
                        }

                    });

                    setChatList(data.chats);
                }
            }
        });
    },

    onChatContent: (chatId, setList, setUsers) => {
        return db.collection('chats').doc(chatId).onSnapshot((doc) => {
            if (doc.exists) {
                let data = doc.data();
                setList(data.messages);
                setUsers(data.users);
            }
        });
    },

    sendMessage: async (chatData, userId, type, body, users) => {
        let now = new Date();

        db.collection('chats').doc(chatData.chatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                type,
                author: userId,
                body,
                date: now
            })
        });

        for (let i in users) {
            let u = await db.collection('users').doc(users[i]).get();
            let uData = u.data();
            if (uData.chat) {
                let chats = [...uData.chats];
                for (let e in chats) {
                    if (chats[e].chatId === chatData.chatId) {
                        chats[e].lastMessage = body;
                        chats[e].lastMessageDate = now;
                    }
                }

                await db.collection('users').doc(users[i]).update({
                    chats
                });
            }
        }

    }

}