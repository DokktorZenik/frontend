import styles from './filter.module.css'
import Dropdown from "../dropdown/dropdown";

const Filter = ({priorities, statuses, assignees, filter, setFilter}) => {

    const setField = (fieldName, value) => {
        setFilter({...filter, [fieldName]: value});
        console.log(filter)
    }

    return (
        <div className={styles.settings}>
            <div className={styles.settings__item}>
                <Dropdown array={priorities} startValue={priorities[0]} fieldName={"priority"} callback={setField}/>
            </div>
            <div className={styles.settings__item}>
                <Dropdown array={statuses} startValue={statuses[0]} fieldName={"status"} callback={setField}/>
            </div>
            <div className={[styles.settings__item, styles.settings__item_null].join(" ")}>
                <Dropdown array={assignees} startValue={assignees[0]} fieldName={"assignee"} callback={setField}/>
            </div>
        </div>
    )
}

export default Filter