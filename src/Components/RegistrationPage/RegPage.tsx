import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegPage.css";
import closeSVG from '../LogInPage/img/close-1511-svgrepo-com.svg'

const RegPage: FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/");
  };

  return (
    <div className="signUpContainer">
      <main className="mainFrame">
        <img
          className="childImage"
          loading="lazy"
          alt=""
          src="/pixema.svg"
        />
      </main>
      <div className="passwordConfirmationFrame">
      <div className="CloseButton" onClick={() => navigate('/')}> <img
                className="closeSVGicon"
                alt="UserSettingIcon"
                src={closeSVG}
              /></div>
        <div className="signUpTitle">
          <h3 className="signUpHeader">Sign Up</h3>
        </div>
        <div className="emailInputContainer">
          <form className="inputGroupFrame" onSubmit={handleSubmit}>
            <div className="nameInputField">
              <div className="nameInputContainer">
                <div className="nameLabel">Name</div>
                <input
                  className="textInputs"
                  placeholder="Your name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="emailInputContainer">
                <div className="emailLabel">Email</div>
                <input
                  className="childInput"
                  placeholder="Your email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="passwordInputContainer">
                <div className="passwordLabel">Password</div>
                <input
                  className="itemInput"
                  placeholder="Your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="confirmPasswordInputContainer">
                <div className="confirmPasswordLabel">Confirm password</div>
                <input
                  className="innerInput"
                  placeholder="Confirm  password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <button className="buttonContainer" type="submit">
              <div className="buttonDiv" />
              <div className="signUpButton">Sign up</div>
            </button>
          </form>
          <div className="accountExistContainer">
            <span>{`Already have an account? `}</span>
            <span className="signInLink">Sign In</span>
          </div>
        </div>
      </div>
    </div>  
  );
};

export default RegPage;
