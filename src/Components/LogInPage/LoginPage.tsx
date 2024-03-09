import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'

interface SignInFormProps {
  // Add any necessary props here
}

const SignInForm: React.FC<SignInFormProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email === email && user.password === password) {
      console.log('Signing in...');
      navigate("/");
    } else {
      toast.error('Ошибка при вводе логина или пароля');
    }
  };

  const handleForgotPassword = () => {
    // Your forgot password logic here
    console.log('Forgot password?');
  };

  const handleSignUp = () => {
    // Your sign-up logic here
    console.log('Sign Up');
  };

  return (
    <div className='SignFormCont'>
      <ToastContainer />
      <div className='SignFormWrapp'>
        <form className="FormClass">
          <div className="MessageWrapper">
            <h3 className="SignInTitle">Sign In</h3>
          </div>
          <div className="MessageFrame">
          </div>
          <div className="EmailInputSection">
            <div className="EmailFieldWrapper">
              <div className="EmailLabel">Email</div>
              <input
                className="EmailInput"
                placeholder="Your email"
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="PasswordFieldWrapper">
              <div className="PasswordLabel">Password</div>
              <input
                className="PasswordInput"
                placeholder="Your password"
                type="text"
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="ForgotPasswordLink" onClick={handleForgotPassword}>
                Forgot password?
              </div>
            </div>
          </div>
          <button className="SignInButton" onClick={handleSignIn}>
            <div className="ButtonChild"></div>
            <div className="ButtonText">Sign in</div>
          </button>
          <div className="SignUpSection">
            <span className="SignUpText">
              Don’t have an account?{' '}
            </span>
            <span className="SignUpLink" onClick={handleSignUp}>
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
