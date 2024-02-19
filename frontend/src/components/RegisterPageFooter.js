import React from "react";
import { useNavigate } from "react-router-dom";

const getFormNotValidMessage = () => {
    return "Username should contains between 3 and 12 characters and password should contains between 6 and 12 character. Also correct e-mail address should provided";
  };
  
  const getFormValidMessage = () => {
    return "Press to register!";
  };

  
const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
    const navigate = useNavigate();
  
    const handlePushToLoginPage = () => {
        navigate("/login");
    };
    return (
        <>
          <div className="mt-7 relative">
            <button
              className={`text-white bg-blue-500 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isFormValid}
              onClick={handleRegister}
            >
              Register
            </button>
            <p className={`absolute -bottom-6 left-0 right-0 text-xs ${isFormValid ? "text-green-500" : "text-red-500"}`}>
              {isFormValid ? getFormValidMessage() : getFormNotValidMessage()}
            </p>
          </div>
          <div className="mt-5 text-sm">
            <span className="text-gray-400">Already have an account ? </span>
            <button
              onClick={handlePushToLoginPage}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Sign In
            </button>
          </div>
        </>
      );
    };
    
    export default RegisterPageFooter;
    