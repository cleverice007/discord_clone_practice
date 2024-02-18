import React from "react";
import { useHistory } from "react-router-dom";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail address and password should contains between 6 and 12 characters";
};

const getFormValidMessage = () => {
  return "Press to log in!";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const history = useHistory();

  const handlePushToRegisterPage = () => {
    history.push("/register");
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <button
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
        className={`text-white bg-blue-500 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${!isFormValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} mt-6`}
        onClick={handleLogin}
        disabled={!isFormValid}
      >
        Log in
      </button>
      <div className="mt-5">
        <span className="text-sm text-gray-400">Need an account? </span>
        <button
          onClick={handlePushToRegisterPage}
          className="text-sm text-blue-500 hover:text-blue-700 font-semibold"
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default LoginPageFooter;
