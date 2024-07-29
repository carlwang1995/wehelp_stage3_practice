"use client";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import styles from "./styles/sign.module.css";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const signUpButtonHandler = () => {
    setMessage("註冊中...");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setMessage("註冊成功！");
        setEmail("");
        setPassword("");
      })
      .catch((e) => {
        const errorMessage: string = e.message;
        setMessage(
          "註冊失敗！" + errorMessage.split("/")[1].split(")")[0] + "."
        );
      });
  };

  return (
    <>
      <div className={styles.title}>註冊帳戶</div>
      <div className={styles.input_content}>
        <label htmlFor="email_signUp">電郵：</label>
        <input
          className={styles.input}
          type="email"
          id="email_signUp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.input_content}>
        <label htmlFor="password_signUp">密碼：</label>
        <input
          className={styles.input}
          type="password"
          id="password_signUp"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="button" onClick={signUpButtonHandler}>
        註冊
      </button>
      <div
        className={styles.message}
        style={
          message == "註冊中..."
            ? { color: "black" }
            : message == "註冊成功！"
            ? { color: "green" }
            : { color: "red" }
        }
      >
        {message}
      </div>
    </>
  );
};

export default SignUp;
