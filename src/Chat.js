import {Avatar, IconButton} from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import './Chat.css'
import db from './firebase';
import {useStateValue} from './StateProvider'
import firebase from 'firebase'
import Picker,{ SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
function Chat() {
    const [input,setInput]=useState("")
    const [seed,setSeed]=useState('')
    const {roomId}=useParams()
    const [roomName,setRoomName]=useState("");
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();
    const [emoji,setEmoji]=useState(false)

    

    const onEmojiClick = (event, emojiObject) => {
     
        let newData=input+emojiObject.emoji
        setInput(newData)
    };
    const returnEmoji=()=>{
       if(emoji){
           setEmoji(false)
       }
       else{
           setEmoji(true)
       }
    }
    useEffect(()=>{
       if(roomId){
           db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
               setRoomName(snapshot.data().name)   
           ))
           db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').
           onSnapshot(snapshot=>(
               setMessages(snapshot.docs.map(doc=>doc.data()))
           ))
       }
    },[roomId])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage=(e) =>{
        e.preventDefault()
       
        db.collection('rooms').doc(roomId).collection('messages').
        add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('')
    }
    return (
        <div className='chat'>
            <div className="chat_header">
              <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
              <div className="chat_headerInfo">
                  <h3>{roomName}</h3>
                  <p>Last Seen {" "} { new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
              </div>
 
              <div className="chat_headerRight">
                  <IconButton>
                  <SearchOutlined />
                  </IconButton>
                  <IconButton>
                  <AttachFile type="file"/>
                  </IconButton>
                  <IconButton>
                  <MoreVert />
                  </IconButton>
              </div>
            </div>
            <div className="chat_body">
             {messages.map((message)=>(
                <p className={`chat_message ${message.name===user.displayName && 'chat_reciever'}`}>
                  <span className="chat_name">
                      {message.name}
                  </span>
                  {message.message}
                  <span className="chat_timestamp">
                      {new Date(message.timestamp?.toDate()).toUTCString()}
                  </span>
                 
              </p>
             ))}
             {emoji ?<Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} pickerStyle={{ width: '100%', maxHeight:"200px",flexDirection:'column',overflow:'scroll'}} />  : null}
            </div>
            <div className="chat_footer">
              
               <InsertEmoticonIcon onClick={returnEmoji}/>
                 <form>
                     <input value={input} onChange={e=>setInput(e.target.value)}
                      type='text' placeholder='Type a message' />
                     <button type="submit" onClick={sendMessage}>
                         Send a Meassage
                     </button>
                 </form>
               <MicIcon />

            </div>
        </div>
    )
}

export default Chat
