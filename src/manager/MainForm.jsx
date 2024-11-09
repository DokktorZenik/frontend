import styles from './MainForm.module.css'
import MainContainer from "./task/container/main-container";

const mainForm = () => {
    return (
        <div className={styles.workplace}>
            <MainContainer/>
        </div>
    );
}

export default mainForm