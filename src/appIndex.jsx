import App from "./app";
import styles from "./appIndex.module.css";

function AppIndex({ authService }) {
  return (
    <div className={styles.appIndex}>
      <App authService={authService} />
    </div>
  );
}
export default AppIndex;
