import styles from './task-model.module.css';
import Dropdown from "../dropdown/dropdown";

const TaskModel = ({task, priority, status, estimate, clicked}) => {

    const parseStyleString = (styleString) => {
        return styleString.split(';').reduce((acc, style) => {
            const [key, value] = style.split(':').map(item => item.trim());
            if (key && value) {

                const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
                acc[camelCaseKey] = value;
            }
            return acc;
        }, {});
    }

    return (
        <div className={styles.task__container} onClick={() => clicked(task)}>
            <div className={[styles.task__column, styles.title].join(" ")}><p>{task.title}</p></div>
            <div className={[styles.task__column, styles.button].join(" ")} style={parseStyleString(priority.color)}>{priority.title}</div>
            <div className={[styles.task__column, styles.button].join(" ")} style={parseStyleString(status.color)}>{status.title}</div>
            <div className={[styles.task__column].join(" ")}>{task.assignee}</div>
            <div className={[styles.task__column].join(" ")}>{task.creator}</div>
            <div className={[styles.task__column, styles.button].join(" ")} style={parseStyleString(estimate.color)}>{estimate.title}</div>
        </div>
    );
}

export default TaskModel;