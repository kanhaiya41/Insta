import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../redux/postSlice";
import { setMessages } from "../redux/chatSlice";


const useGetAllMessages=()=>{
    const {messages}=useSelector(store=>store.chat)
    const dispatch=useDispatch();
    const {selectedUser}=useSelector(store=>store.auth)
    useEffect(()=>{
        const fethallMessages=async()=>{
            try {
                const res=await axios.get(`http://localhost:8000/api/v1/message/all/${selectedUser?._id}`,{withCredentials:true});
                if(res.data.success)
                {
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fethallMessages();
    },[selectedUser]);
}

export default useGetAllMessages;