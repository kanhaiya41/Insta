import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/chatSlice";


const useGetRTM=()=>{
    const {messages}=useSelector(store=>store.chat)
    const dispatch=useDispatch();
    const {socket}=useSelector(store=>store.socketio)
    useEffect(()=>{
        socket?.on('newMessage',(newMessage)=>{
            dispatch(setMessages([...messages,newMessage]));
        });

        return()=>{
            socket?.off('newMessage');
        }
    },[messages,setMessages]);
}

export default useGetRTM;