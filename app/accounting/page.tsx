"use client";
import Link from "next/link";
import Form from "../../components/Form";
import List from "../../components/List";
import styles from "./accounting.module.css";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Accounting() {
  const [check, setCheck] = useState<boolean>(true);
  const [data, setData] = useState<object[]>([]);
  const [userId, setUserId] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<any>("");

  const get_records = async (userId: string) => {
    const q = query(collection(db, "records"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let new_records_arr: any[] = [];
    querySnapshot.forEach((record) => {
      const record_data: any = record.data();
      record_data.docId = record.id;
      new_records_arr.push(record_data);
    });
    setData(new_records_arr);
    setCheck(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email);
        get_records(user.uid);
      } else {
        setCheck(false);
      }
    });
  }, []);

  const updateListData = async (
    selection: number,
    price: number,
    describe: string
  ) => {
    const collectionRef = collection(db, "records");
    price *= selection;
    const payload = {
      userId,
      selection,
      price,
      describe,
    };
    try {
      await addDoc(collectionRef, payload);
      get_records(userId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteListData = async (docId: string) => {
    try {
      await deleteDoc(doc(db, "records", docId));
      get_records(userId);
    } catch (e) {
      console.error(e);
    }
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
      {check ? (
        <div className={styles.page_status}>
          <p>載入中...</p>
        </div>
      ) : !userId ? (
        <>
          <div className={styles.page_status}>尚未登入，請返回首頁登入帳戶</div>
          <Link href="/" style={{ marginTop: "2rem" }}>
            <button>返回首頁</button>
          </Link>
        </>
      ) : (
        <>
          {" "}
          <div className={styles.page_status}>您已經使用 {userEmail} 登入</div>
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
        </>
      )}
    </main>
  );
}
