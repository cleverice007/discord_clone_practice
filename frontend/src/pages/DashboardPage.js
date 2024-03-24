import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails, logout } from '../slices/authSlice';
import SideBar from '../components/Sidebar/SideBar';
import FriendsSideBar from '../components/FriendsSideBar/FriendsSideBar';
import AppBar from '../components/AppBar/AppBar';
import Room from '../components/Room/Room';
import Messenger from '../components/Messenger/Messenger';
import { connectWithSocketServer,getSocketServerInstance} from '../realtimeCommunication/socketConnection';
import { useSelector } from 'react-redux';
import { prepareNewPeerConnection, handleSignalingData} from '../realtimeCommunication/webRTCHandler';
import { useStream } from "../StreamContext";


const Dashboard = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.auth.userDetails);
    const isUserInRoom = useSelector((state) => state.room.isUserInRoom);
    const { localStream, setRemoteStreams,setLocalStream } = useStream();

    if (userDetails) {
        console.log('Token:', userDetails.token);
    } else {
        console.log('userDetails is undefined or null');
    }


    useEffect(() => {
        if (userDetails) {
            connectWithSocketServer(userDetails);
            const socket = getSocketServerInstance();
            
            socket.on("connect", () => {
                console.log("connect from dashboard",socket.id);
            });
            const onConnPrepare = (data) => {
                const { connUserSocketId } = data;
                prepareNewPeerConnection(connUserSocketId, false, localStream, setRemoteStreams);
                console.log('connPrepare',connUserSocketId);
                socket.emit("conn-init", { connUserSocketId });
            };
        
            const onConnInit = (data) => {
                const { connUserSocketId } = data;
                console.log('connInit',connUserSocketId);
                prepareNewPeerConnection(connUserSocketId, true, localStream, setRemoteStreams);
            };
        
            const onConnSignal = (data) => {
              console.log('connSignal',data);
                handleSignalingData(data);
            };
        
            // add event listeners
            socket.on("conn-prepare", onConnPrepare);
            socket.on("conn-init", onConnInit);
            socket.on("conn-signal", onConnSignal);
        
        } else {
            dispatch(logout());
        }
    }, [userDetails, dispatch]);
    return (
        <div className="w-full h-screen flex">
            <SideBar />
            <FriendsSideBar />
            <Messenger />
            <AppBar />
            {isUserInRoom && <Room />}
        </div>
    );
};

export default Dashboard;
