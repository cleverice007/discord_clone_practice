import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { setUserDetails, logout } from '../slices/authSlice'; 
import SideBar from '../components/Sidebar/SideBar';
import FriendsSideBar from '../components/FriendsSideBar/FriendsSideBar';
import AppBar from '../components/AppBar/AppBar';
import Messenger from '../components/Messenger/Messenger';
import { connectWithSocketServer } from '../realtimeCommunication/socketConnection';
import { useSelector } from 'react-redux';


const Dashboard = () => {
    const dispatch = useDispatch(); 
    const userDetails = useSelector((state) => state.auth.userDetails);
    if (userDetails) {
      console.log('Token:', userDetails.token);
    } else {
      console.log('userDetails is undefined or null');
    }
    

    useEffect(() => {
        if (userDetails) {
            connectWithSocketServer(userDetails);
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
        </div>
    );
};

export default Dashboard;
