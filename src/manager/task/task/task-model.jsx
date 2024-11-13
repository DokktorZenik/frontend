import styles from './task-model.module.css';
import Dropdown from "../dropdown/dropdown";

const taskModel = ({priorities, statuses, estimates}) => {
    return (
        <div className={styles.task__container}>
            <div className={[styles.task__column, styles.title].join(" ")}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad consequuntur debitis deleniti eaque excepturi itaque maxime repudiandae sed voluptas.</div>
            <div className={[styles.task__column].join(" ")}><Dropdown array={priorities} startValue={priorities[0]} fieldName={""} callback={() => {}}/></div>
            <div className={[styles.task__column].join(" ")}><Dropdown array={statuses} startValue={statuses[0]} fieldName={""} callback={() => {}}/></div>
            <div className={[styles.task__column].join(" ")}>Korey</div>
            <div className={[styles.task__column].join(" ")}>Dan</div>
            <div className={[styles.task__column].join(" ")}><Dropdown array={estimates} startValue={estimates[0]} fieldName={""} callback={() => {}}/></div>
        </div>
    );
}

export default taskModel;