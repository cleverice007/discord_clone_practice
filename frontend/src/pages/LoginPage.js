import React, { useState, useEffect } from "react";
import AuthBox from "../components/AuthBox";
import LoginPageFooter from "../components/LoginPageFooter";
import LoginPageHeader from "../components/LoginPageHeader";
import LoginPageInput from "../components/LoginPageInput";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../utils/validators";
import { useLoginMutation } from '../slices/userApiSlice';
import { setUserDetails } from '../slices/authSlice';
import { useDispatch } from 'react-redux';



const LoginPage = () => {
  const navigate = useNavigate();
  
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const dispatch = useDispatch();
  
    const [login, { isLoading }] = useLoginMutation();
  
    const handleLogin = async () => {
      try {
        // execute the login mutation
        const userDetails = await login({ mail, password }).unwrap();
        // update the user details in the store
        dispatch(setUserDetails(userDetails));
        // redirect the user to the protected route
        navigate("/dashboard");
      } catch (error) {
        console.error('Failed to login:', error);
        // handle the error
      }
    };
  
    useEffect(() => {
      setIsFormValid(validateLoginForm({ mail, password }));
    }, [mail, password, setIsFormValid]);
  
   
    return (
      <AuthBox>
        <LoginPageHeader />
        <LoginPageInput
          mail={mail}
          setMail={setMail}
          password={password}
          setPassword={setPassword}
        />
        <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
      </AuthBox>
    );
  };

  
  export default LoginPage;