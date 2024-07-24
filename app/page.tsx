import styles from "./home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.main_title}>記帳小工具</div>
      <div className={styles.main_welcome}>首頁</div>
      <Link href="/accounting" style={{ marginTop: "2rem" }}>
        <button>開始使用</button>
      </Link>
    </main>
  );
}
