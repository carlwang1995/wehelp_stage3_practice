"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Link from "next/link";
import styles from "./styles/sign.module.css";

const SignIn = () => {
  const [check, setCheck] = useState<boolean>(true);
  const [logState, setLogState] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCheck(false);
        setLogState(true);
        const user_email: string = String(user.email);
        setEmail(user_email);
      } else {
        setCheck(false);
        setLogState(false);
      }
    });
  }, []);

  const signInButtonHandler = () => {
    setMessage("登入中...");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setMessage("");
        setPassword("");
        setLogState(true);
      })
      .catch((e) => {
        const errorMessage: string = e.message;
        setMessage(
          "登入失敗！" + errorMessage.split("/")[1].split(")")[0] + "."
        );
      });
  };

  const signOutButtonHandler = () => {
    signOut(auth)
      .then(() => {
        setLogState(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={styles.sign_content_box}>
      {check ? (
        <>
          <div className={styles.signInMsg}>檢查登入狀態...</div>
        </>
      ) : logState ? (
        <>
          <div className={styles.signInMsg}>您已經使用 {email} 登入</div>
          <div>
            <Link href="/accounting" style={{ marginRight: "20px" }}>
              <button>立刻開始</button>
            </Link>
            <button onClick={signOutButtonHandler}>登出</button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.title}>登入帳戶</div>
          <div className={styles.input_content}>
            <label htmlFor="email">電郵：</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.input_content}>
            <label htmlFor="password">密碼：</label>
            <input
              className={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={signInButtonHandler}>
            登入
          </button>
          <div
            className={styles.message}
            style={
              message == "登入中..."
                ? { color: "black" }
                : message == "登入成功！"
                ? { color: "green" }
                : { color: "red" }
            }
          >
            {message}
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
