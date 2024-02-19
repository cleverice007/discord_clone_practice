import React, { useState, useEffect } from "react";
import AuthBox from "../components/AuthBox";
import RegisterPageFooter from "../components/RegisterPageFooter";
import RegisterPageInput from "../components/RegisterPageInput";
import { useNavigate } from "react-router-dom";
import { validateRegisterForm } from "../utils/validators";
import { useRegisterMutation } from '../slices/userApiSlice';
import { setUserDetails } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    const [mail, setMail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [isFormValid, setIsFormValid] = useState(false);
  
    const [register, { isLoading }] = useRegisterMutation();
  
    const handleRegister = async () => {
      try {
        // execute the register mutation
        const userDetails = await register({ mail,username, password }).unwrap();
        // update the user details in the store
        dispatch(setUserDetails(userDetails));
        // redirect the user to the protected route
        navigate("/dashboard");
      } catch (error) {
        console.error('Failed to register:', error);
        // handle the error
      }
    };
  
    useEffect(() => {
      setIsFormValid(
        validateRegisterForm({
          mail,
          username,
          password,
        })
      );
    }, [mail, username, password, setIsFormValid]);
    return (
        <AuthBox>
          <h5 className="text-white text-lg font-medium">
            Create an account
          </h5>
          <RegisterPageInput
            mail={mail}
            setMail={setMail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
          <RegisterPageFooter
            handleRegister={handleRegister}
            isFormValid={isFormValid}
          />
        </AuthBox>
      );
    };

    export default RegisterPage;