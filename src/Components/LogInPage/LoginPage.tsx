import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import closeSVG from './img/close-1511-svgrepo-com.svg'

const SignInForm = () => {
  const { register} = useForm();
  const navigate = useNavigate();



  const handleForgotPassword = () => {
  };

  const handleSignUp = () => {
  };

  return (
    <div className="SignFormCont">
      <ToastContainer />
      <div className="SignFormWrapp">
        <form className="FormClass" >
        <div className="CloseButton" onClick={() => navigate('/')}> <img
                className="closeSVGicon"
                alt="UserSettingIcon"
                src={closeSVG}
              /></div>
          <div className="MessageWrapper">
            <h3 className="SignInTitle">Sign In</h3>
          </div>
          <div className="EmailInputSection">
            <div className="EmailFieldWrapper">
              <div className="EmailLabel">Email</div>
              <input
                className="EmailInput"
                placeholder="Your email"
                type="text"
                {...register('email', { required: true })}
              />
            </div>
            <div className="PasswordFieldWrapper">
              <div className="PasswordLabel">Password</div>
              <input
                className="PasswordInput"
                placeholder="Your password"
                type="password"
                {...register('password', { required: true })}
              />
              <div className="ForgotPasswordLink" onClick={handleForgotPassword}>
                Forgot password?
              </div>
            </div>
          </div>
          <button className="SignInButton" type="submit">
            <div className="ButtonChild"></div>
            <div className="ButtonText">Sign in</div>
          </button>
          <div className="SignUpSection">
            <span className="SignUpText">Don’t have an account?{' '}</span>
            <span className="SignUpLink" onClick={handleSignUp}>Sign Up</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
