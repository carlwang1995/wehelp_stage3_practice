"use client";
import Link from "next/link";
import Form from "./components/form";
import List from "./components/list";
import styles from "./accounting.module.css";
import { useState } from "react";

export default function Accounting() {
  const [data, setData] = useState<object[]>([]);

  const updateListData = (
    selection: string,
    price: number,
    describe: string
  ): void => {
    if (selection === "outcome") {
      price = 0 - price;
    }
    setData([...data, { price, describe }]);
  };

  const deleteListData = (index: number): void => {
    let newData: object[] = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  let totalPrice: number = 0;
  if (data.length > 0) {
    data.forEach((d: any) => {
      let price: number = d.price;
      totalPrice += price;
    });
  }

  return (
    <main className={styles.main}>
      <div className={styles.main_content}>
        <Form updateListData={updateListData} />
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.main_content}>
        <List data={data} deleteListData={deleteListData} />
      </div>
      <div className={styles.total}>
        小計：
        <span>{totalPrice}</span> 元
      </div>
      <Link href="/" style={{ marginTop: "2rem" }}>
        <button>返回首頁</button>
      </Link>
    </main>
  );
}
