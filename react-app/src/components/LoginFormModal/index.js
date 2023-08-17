import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  async function demoLogin(){
    await dispatch(login('demo@aa.io','password'));
    closeModal();
  }

  return (
    <div id='login-modal-container'>
      <div id='login-title-container'>
        <h1>Log In</h1>
      </div>
      <hr id='login-title-hr'/>
      <form onSubmit={handleSubmit}>
        <div id='errors-container'>
          {errors.map((error, idx) => (
            <span id='error' key={idx}>{error}</span>
          ))}
        </div>
        <div id='login-info-container'>
          <div id='email-info'>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div id='password-info'>
            <div id='password-input'>
              <input
                type="password"
                id='password'
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div id="login-submit-button">
              <button type="submit">Log In</button>
            </div>
          </div>
        </div>
      </form>
      <hr id='demo-hr'/>
      <div id='demo-container'>
        <button onClick={()=>demoLogin()}>Demo User</button>
      </div>
    </div>
  );
}

export default LoginFormModal;
