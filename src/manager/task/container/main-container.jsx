import styles from './main-container.module.css';
import TaskModel from "../task/task-model";
import Dropdown from "../dropdown/dropdown";

const mainContainer = () => {
    return (
        <div className={styles.tasks__container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    Tasks from Project
                </div>
                <div className={styles.settings}>
                    <div className={[styles.dropdown, styles.selected].join(" ")}>title</div>
                    <div className={styles.dropdown}>priority</div>
                    <div className={[styles.dropdown, styles.selected].join(" ")}>status</div>
                    <div className={styles.dropdown}>asignee</div>
                </div>
                <div className={styles.tasks__place}>
                    <TaskModel/>
                    <TaskModel/>
                    <TaskModel/>
                    <Dropdown/>
                </div>
            </div>
        </div>
    );
}

export default mainContainer;