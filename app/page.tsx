import styles from "./home.module.css";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.main_title}>記帳小工具</div>
        <SignIn />
        <SignUp />
      </main>
    </>
  );
}
