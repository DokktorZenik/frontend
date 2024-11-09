import styles from './task-model.module.css';

const taskModel = () => {
    return (
        <div className={styles.task__container}>
            <div className={[styles.task__column, styles.title].join(" ")}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad consequuntur debitis deleniti eaque excepturi itaque maxime repudiandae sed voluptas.</div>
            <div className={[styles.task__column, styles.selector, styles.high__priority].join(" ")}>2-High</div>
            <div className={[styles.task__column, styles.selector, styles.qa_testing_status].join(" ")}>QA testing</div>
            <div className={[styles.task__column, styles.selector].join(" ")}>Korey</div>
            <div className={[styles.task__column].join(" ")}>Dan</div>
            <div className={[styles.task__column, styles.selector, styles.small_time].join(" ")}>2h</div>
        </div>
    );
}

export default taskModel;