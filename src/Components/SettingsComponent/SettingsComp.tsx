import { FunctionComponent, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SettingsComp.css'
import { ThemeContext } from "../themes/themeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SettingsFrame: FunctionComponent = () => {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');



  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext); 
  const [isToggled, setToggled] = useState(false);

  const toggleSwitch = () => {
    setToggled(!isToggled);
    toggleTheme();
  };
  const navigate = useNavigate();
  const saveChanges = () => {
    const user = localStorage.getItem('user');
    const userData = user ? JSON.parse(user) : {};
    if (userData.password !== currentPassword) {
      toast.error('Текущий пароль не совпадает либо поля пусты');
    } else if (newPassword !== confirmPassword) {
      toast.error('Новые пароли не совпадают');
    } else {
      let nameChanged = false;
      let emailChanged = false;
      if (name && name !== userData.name) {
        userData.name = name;
        nameChanged = true;
      }
      if (email && email !== userData.email) {
        userData.email = email;
        emailChanged = true;
      }
      if (nameChanged && emailChanged) {
        toast.success('Имя и email изменены, проверьте почту');
      } else if (nameChanged) {
        toast.success('Имя изменено');
      } else if (emailChanged) {
        toast.success('Email изменен, проверьте почту');
      }
      // Обновляем пароль только если пользователь ввел новый пароль
      if (newPassword) {
        userData.password = newPassword;
        toast.success('Пароль изменен');
      }
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="settingsFrame">
      <ToastContainer />
      <div className="profileSection">
        <h3 className="profileTitle"style={{ color: theme.foreground }}>Profile</h3>
        <div className="rectangleParent">
          <div className="nameInputSection">
            <div className="nameLabel">Name</div>
            <input
              className="nameInput"
              placeholder="Name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="emailInputSection">
            <div className="emailLabel">Email</div>
            <input
              className="emailInput"
              placeholder="Email"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="passwordSection">
        <h3 className="passwordTitle"style={{ color: theme.foreground }}>Password</h3>
        <div className="rectangleGroup">
          <div className="passwordInputSection">
            <div className="passwordLabel">Password</div>
            <input
              className="passwordInput"
              placeholder="Your password"
              type="text"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="newPasswordSection">
            <div className="newPasswordInputSection">
              <div className="newPasswordLabel">New password</div>
              <input
                className="newPasswordInput"
                placeholder="New password"
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="confirmPasswordInputSection">
              <div className="confirmPasswordLabel">Confirm password</div>
              <input
                className="confirmPasswordInput"
                placeholder="Confirm password"
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="colorModeSection">
        <h3 className="colorModeTitle"style={{ color: theme.foreground }}>Color mode</h3>
        <footer className="rectangleContainer">
          <div className="frameInner" />
          <div className="darkLightToggle">
            <b className="darkLabel">Dark</b>
            <div className="useDarkThemeLabel">Use dark theme</div>
          </div>
          <div className={`switchIcon ${isToggled ? 'on' : 'off'}`} onClick={toggleSwitch} />
        </footer>
      </div>
      <div className="buttonSection">
      <button className="saveButton" onClick={saveChanges}>
          <div className="saveLabel">Save</div>
        </button>
        <button className="cancelButton" onClick={() => navigate('/')}>
          <div className="rectangleDiv" />
          <div className="cancelLabel">Cancel</div>
        </button>
      </div>
    </div>
  );
};

export default SettingsFrame;
