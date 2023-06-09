// frontend/src/components/LoginFormPage/index.js

import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if ((credential && credential.length >= 4) && (password && password.length >= 6)) {
      setDisabled(false)
    }
  }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1 className="logo">
        <i className="fa-solid fa-ghost"></i>
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <div className="loginDiv">
          <button type="submit" className="loginButton" disabled={disabled}>Log In</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
