import styles from './TaskMainForm.module.css'
import MainContainer from "./task/container/main-container";

const taskMainForm = () => {
    return (
        <div className={styles.workplace}>
            <MainContainer/>
        </div>
    );
}

export default taskMainForm