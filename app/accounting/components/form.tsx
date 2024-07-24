"use client";
import React, { useState } from "react";
import styles from "./styles/form.module.css";

export default function Form({ updateListData }: { updateListData: Function }) {
  const [selection, setSelection] = useState<string>("income");
  const [price, setPrice] = useState<number>(0);
  const [describe, setDescribe] = useState<string>("");

  const formHandler = (form: any): void => {
    form.preventDefault();
  };

  const selectionHandler = (e: any): void => {
    setSelection(e.target.value);
  };

  const priceInputHandler = (e: any): void => {
    setPrice(e.target.value);
  };

  const describeInputHandler = (e: any): void => {
    setDescribe(e.target.value);
  };

  const buttonHandler = (): void => {
    if (price !== null || describe !== "") {
      updateListData(selection, Number(price), describe);
      setPrice(0);
      setDescribe("");
    }
  };

  return (
    <form action="" className={styles.form} onSubmit={formHandler}>
      <select className={styles.input} onChange={selectionHandler}>
        <option value="income">收入</option>
        <option value="outcome">支出</option>
      </select>
      <input
        className={styles.input}
        type="number"
        placeholder="金額"
        value={price}
        min="0"
        style={{ width: "8rem" }}
        onChange={priceInputHandler}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="說明"
        value={describe}
        style={{ width: "12rem" }}
        onChange={describeInputHandler}
      />
      <button onClick={buttonHandler}>新增紀錄</button>
    </form>
  );
}
