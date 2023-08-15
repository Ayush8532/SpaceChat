import React, { useEffect, useState } from 'react'
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where}from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import ScrollToBottom from "react-scroll-to-bottom";
import '../style/chat.css'

 const Chat = (props) => {
    const{room}=props
    const [newMessage,setNewMessage]=useState();
    const[messages,setMessages]=useState([]);
    const messageRef=collection(db,"messages");   //specifying the collection in db

    useEffect(()=>{
        const queryMessages=query(messageRef,where("room","==", room),orderBy("createdAt"));
        const unsuscribe=onSnapshot(queryMessages,(snapshot)=>{
            let message=[];
            snapshot.forEach((doc)=>{
                message.push({...doc.data(),id:doc.id});
            });
            setMessages(message);
        });
        return()=>unsuscribe();
 },[]);

const handleSubmit=async(e)=>{
    e.preventDefault();
    if(newMessage==="")return;

    await addDoc(messageRef,{                                            
        text:newMessage,
        createdAt:serverTimestamp(),
        user:auth.currentUser.displayName,
        room,
    });   
    setNewMessage("");
}
  return (
    <>
    <div className='chat-app'>

        <div className='header'><h1>Welcome to: {room.toUpperCase()}</h1></div>
        <div className='messages'>{messages.map((message)=>
        <div className='messages' key={message.id}>
            <span className='user'>{message.user}</span>
            {message.text}
        </div> )}</div>
        <form  onSubmit={handleSubmit} className='new-message-form'>
            <input className='new-message-input' placeholder='Type your text here' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}/>
            <button  type='submit' className='send-button'>Send</button>
        </form>
    </div>
    </>
  )
}

export default Chat;