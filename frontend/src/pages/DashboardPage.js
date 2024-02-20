import React, { useEffect } from 'react';
import { setUserDetails } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';
import SideBar from '../components/Sidebar/SideBar';
import FriendsSideBar from '../components/FriendsSideBar/FriendsSideBar';


const Dashboard = () => {
    const [logout] = useLogoutMutation();
  useEffect(() => {
    const userDetails = localStorage.getItem("userinfo");

    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
    }
  }, []);

  return (
    <div className="w-full h-screen flex">
      <SideBar />
      <FriendsSideBar />
    </div>
  );
};

export default Dashboard;
