import styles from './filter.module.css'
import Dropdown from "../dropdown/dropdown";
import {useEffect, useMemo, useState} from "react";
import CreateModal from "../../entities/create/createModal";

const Filter = ({priorities, statuses, assignees, filter, setFilter}) => {


    const setField = (fieldName, option) => {

        setFilter({...filter,
        [fieldName]: {
            content: option
        }});
        console.log("GONNNA FILTER", filter)
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



    return (
        <div className={styles.settings}>
            <div className={styles.settings__item}>
                <Dropdown array={priorities} startValue={filter.priority === undefined ? null : filter.priority} fieldName={"priority"}
                          callback={setField}
                />
                <div className={styles.settings__item_reset} onClick={() => removeField("priority")}><p>✕</p></div>
            </div>
            <div className={styles.settings__item}>
                <Dropdown array={statuses} startValue={filter.status === undefined ? null : filter.status} fieldName={"status"}
                          callback={setField}
                />
                <div className={styles.settings__item_reset} onClick={() => removeField("status")}><p>✕</p></div>
            </div>
            <div className={[styles.settings__item, styles.settings__item_null].join(" ")}>
                <Dropdown array={assignees} startValue={filter.assignee === undefined ? null : filter.assignee} fieldName={"assignee"}
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