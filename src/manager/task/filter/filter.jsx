import styles from './filter.module.css'
import Dropdown from "../dropdown/dropdown";
import {useEffect, useMemo, useState} from "react";
import CreateModal from "../../entities/create/createModal";

const Filter = ({priorities, statuses, assignees, filter, setFilter}) => {


    const setField = (fieldName, value) => {
        console.log({...filter, [fieldName]: value})
        setFilter({...filter, [fieldName]: value});
    }

    const removeField = (fieldName) => {
        const {[fieldName]: _, ...updatedFilter} = filter;
        setFilter(updatedFilter);
    }

    const findField = (array, fieldName) => {
        return array.length === 0 || fieldName === undefined
            ? null
            : array.filter(elem => elem.content === fieldName)[0];
    }

    const memoizedDisplayValues = useMemo(() => ({
        priority: findField(priorities, filter["priority"]),
        status: findField(statuses, filter["status"]),
        assignee: findField(assignees, filter["assignee"]),
    }), [filter, priorities, statuses, assignees]);

    useEffect(() => {
        setDisplayValues(memoizedDisplayValues);
    }, [memoizedDisplayValues]);

    const [displayValues, setDisplayValues] = useState({
        priority: findField(priorities, filter["priority"]),
        status: findField(statuses, filter["status"]),
        assignee: findField(assignees, filter["assignee"]),
    });



    return (
        <div className={styles.settings}>
            <div className={styles.settings__item}>
                <Dropdown array={priorities} startValue={displayValues["priority"]} fieldName={"priority"}
                          callback={setField}
                />
                <div className={styles.settings__item_reset} onClick={() => removeField("priority")}><p>✕</p></div>
            </div>
            <div className={styles.settings__item}>
                <Dropdown array={statuses} startValue={displayValues["status"]} fieldName={"status"}
                          callback={setField}
                />
                <div className={styles.settings__item_reset} onClick={() => removeField("status")}><p>✕</p></div>
            </div>
            <div className={[styles.settings__item, styles.settings__item_null].join(" ")}>
                <Dropdown array={assignees} startValue={displayValues["assignee"]} fieldName={"assignee"}
                          callback={setField}
                />
                <div className={styles.settings__item_reset} onClick={() => removeField("assignee")}><p>✕</p></div>
            </div>
            <div className={[styles.settings__item, styles.settings__reset].join(" ")} onClick={() => setFilter({})}>
                <p>Reset filters</p>
            </div>
        </div>
    )
}

export default Filter