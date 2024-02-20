import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { setUserDetails, logout } from '../slices/authSlice'; 
import SideBar from '../components/Sidebar/SideBar';
import FriendsSideBar from '../components/FriendsSideBar/FriendsSideBar';
import AppBar from '../components/AppBar/AppBar';
import Messenger from '../components/Messenger/Messenger';

const Dashboard = () => {
    const dispatch = useDispatch(); 

    useEffect(() => {
        const userDetails = localStorage.getItem("userinfo");

        if (!userDetails) {
            dispatch(logout()); 
        } else {
            dispatch(setUserDetails(JSON.parse(userDetails))); 
        }
    }, [dispatch]);

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