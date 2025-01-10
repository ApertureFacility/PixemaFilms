import { FunctionComponent, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { ThemeContext } from "../themes/themeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './SettingsComp.css'

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
    <div className="settings-frame">
      <ToastContainer />
      <div className="settings-frame__profile">
        <h3 className="settings-frame__profile-title"style={{ color: theme.foreground }}>Profile</h3>
        <div className="settings-frame__profile-inputs">
          <div className="settings-frame__input-section">
            <div className="settings-frame__label">Name</div>
            <input
              className="settings-frame__input"
              placeholder="Name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="emailInputSection">
            <div className="emailLabel">Email</div>
            <input
              className="settings-frame__input"
              placeholder="Email"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="settings-frame__password">
        <h3 className="settings-frame__password-title"style={{ color: theme.foreground }}>Password</h3>
        <div className="settings-frame__password-inputs">
          <div className="settings-frame__input-section">
            <div className="passwordLabel">Password</div>
            <input
              className="settings-frame__input"
              placeholder="Your password"
              type="text"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="newPasswordSection">
            <div className="settings-frame__input-section">
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
              <div className="settings-frame__label">Confirm password</div>
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
      <div className="settings-frame__color-mode">
        <h3 className="settings-frame__color-mode-title"style={{ color: theme.foreground }}>Color mode</h3>
        <footer className="settings-frame__footer">
          <div className="settings-frame__footer-inner" />
          <div className="settings-frame__toggle">
            <b className="settings-frame__toggle-label">Dark</b>
            <div className="settings-frame__toggle-description">Use dark theme</div>
          </div>
          <div className={`switchIcon ${isToggled ? 'on' : 'off'}`} onClick={toggleSwitch} />
        </footer>
      </div>
      <div className="settings-frame__buttons">
      <button className="saveButton" onClick={saveChanges}>
          <div className="settings-frame__button-label">Save</div>
        </button>
        <button className="cancelButton" onClick={() => navigate('/')}>
          <div className="settings-frame__button-rectangle" />
          <div className="settings-frame__button-label">Cancel</div>
        </button>
      </div>
    </div>
  );
};

export default SettingsFrame;
