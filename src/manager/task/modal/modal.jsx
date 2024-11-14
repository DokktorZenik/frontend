import styles from './modal.module.css';
import Dropdown from "../dropdown/dropdown";

const Modal = ({close, priorities, statuses, estimates}) => {
    return (
        <div className={styles.wrapper} onClick={(e) => close()}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.info}>
                    <div className={[styles.info__title].join(" ")}><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad consequuntur debitis deleniti eaque excepturi itaque maxime repudiandae sed voluptas.</p></div>
                    <div className={styles.info__labels}>
                        <div className={[].join(" ")}>Assignee: Korey</div>
                        <div className={[].join(" ")}>Created by: Dan</div>
                    </div>
                    <div className={styles.info__dropdowns}>
                        <div className={[].join(" ")}><Dropdown array={priorities} startValue={priorities[0]} fieldName={""} callback={() => {}}/></div>
                        <div className={[].join(" ")}><Dropdown array={statuses} startValue={statuses[0]} fieldName={""} callback={() => {}}/></div>
                        <div className={[].join(" ")}><Dropdown array={estimates} startValue={estimates[0]} fieldName={""} callback={() => {}}/></div>
                    </div>
                </div>
                <div className={styles.panel}>
                    <div className={[styles.button, styles.button__delete].join(" ")}>delete</div>
                    <div className={[styles.button, styles.button__update].join(" ")}>update</div>
                </div>
            </div>
        </div>
    )
}

export default Modal