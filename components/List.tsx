"use client";
import React from "react";
import styles from "./styles/list.module.css";

interface ListProps {
  data: object[];
  deleteListData: Function;
}

export default function List({ data, deleteListData }: ListProps) {
  return (
    <>
      {data.map((data: any) => (
        <div className={styles.list_content} key={data.docId}>
          <div className={styles.list_info_content}>
            <div
              className={
                data.price >= 0
                  ? styles.list_info_price_green
                  : styles.list_info_price_red
              }
            >
              {data.price}
            </div>
            <div>{data.describe}</div>
          </div>
          <button onClick={() => deleteListData(data.docId)}>刪除</button>
        </div>
      ))}
    </>
  );
}
