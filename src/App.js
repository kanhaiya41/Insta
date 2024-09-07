import './App.css';
import Signup from './Components/Signup';
import { Toaster } from 'react-hot-toast';
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Sidebar from './Components/Sidebar';
import Profile from './Components/Profile';
import EditProfile from './Components/EditProfile';
import ChatPage from './Components/ChatPage';
import { io } from 'socket.io-client'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/chatSlice';
import { setLikeNotification } from './redux/RTNSlice';
import ProtectedRoutes from './Components/ProtectedRoutes';
function App() {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const {socket}=useSelector(store=>store.socketio)

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));
      //listen all the evente
      socketio.on('getOnlineUser', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification',(notification)=>{
        dispatch(setLikeNotification(notification));
      })

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    }
    else if(socket) {
      
        socket?.close();
        dispatch(setSocket(null));
      
    }
  }, [user, dispatch]);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/:id/Profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
        <Route path='/account/edit' element={<ProtectedRoutes><EditProfile /></ProtectedRoutes>} />
        <Route path='/chat' element={<ProtectedRoutes><ChatPage /></ProtectedRoutes>} />
      </Routes>
    </>
  );
}

export default App;
