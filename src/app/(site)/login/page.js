import LoginPage from "@/components/auth/LoginPage";
import styles from "@/components/Components.module.css";

export default function SigninPage() {
  return (
    <div className={styles["signin"]}>
      <LoginPage />
    </div>
  );
}
