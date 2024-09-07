import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setSuggestedUsers } from "../redux/authSlice";


const useGetSuggestUsers=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchSuggestedUsers=async()=>{
            try {
                const res=await axios.get('http://localhost:8000/api/v1/user/suggested',{withCredentials:true});
                console.log(res.data)
                if(res.data.success)
                {
                    dispatch(setSuggestedUsers(res.data.user));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSuggestedUsers();
    },[]);
}

export default useGetSuggestUsers;