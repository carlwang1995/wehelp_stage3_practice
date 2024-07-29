"use client";
import React, { useState } from "react";
import styles from "./styles/form.module.css";

export default function Form({ updateListData }: { updateListData: Function }) {
  const [selection, setSelection] = useState<string>("1");
  const [price, setPrice] = useState<string>("0");
  const [describe, setDescribe] = useState<string>("");

  const buttonHandler = (): void => {
    if (price !== null || describe !== "") {
      updateListData(Number(selection), Number(price), describe);
      setPrice("0");
      setDescribe("");
    }
  };

  return (
    <form
      action=""
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <select
        className={styles.input}
        onChange={(e) => setSelection(e.target.value)}
      >
        <option value="1">收入</option>
        <option value="-1">支出</option>
      </select>
      <input
        className={styles.input}
        type="number"
        placeholder="金額"
        value={price}
        min="0"
        style={{ width: "8rem" }}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="說明"
        value={describe}
        style={{ width: "12rem" }}
        onChange={(e) => setDescribe(e.target.value)}
      />
      <button onClick={buttonHandler}>新增紀錄</button>
    </form>
  );
}
