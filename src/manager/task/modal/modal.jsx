import styles from './modal.module.css';
import Dropdown from "../dropdown/dropdown";
import {useEffect, useState} from "react";
import login from "../../auth/login/login";
import axios from "axios";

const Modal = ({task, users, chooseCallback, close, priorities, statuses, estimates}) => {
    const [localTask, setLocalTask] = useState(task)

    function createTask() {
        axios.post(`http://localhost:8082/v1/tasks/${task.id}`, {})
    }

    return (<div className={styles.wrapper} onClick={(e) => close()}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.info}>
                    <div className={[styles.info__title].join(" ")}><input className={styles.input}
                                                                           defaultValue={localTask.title}
                                                                           onChange={(e) => setLocalTask({
                                                                               ...localTask, title: e.target.value
                                                                           })}/></div>
                    <div className={styles.info__labels}>
                        <div className={[].join(" ")}>Assignee:
                            <select className={styles.select} defaultValue={task.assignee_id} onChange={(e) => {
                                const selectedUserId = e.target.value
                                setLocalTask({...localTask, assignee_id: selectedUserId})
                            }}>
                                {users.map(user => {
                                    return (<option key={user.id}
                                                    value={user.id}>{user.username}</option>)
                                })}
                            </select>
                        </div>
                        <div className={[].join(" ")}>Created by:
                            <select className={styles.select} defaultValue={task.created_by} onChange={(e) => {
                                const selectedUserId = e.target.value
                                setLocalTask({...localTask, created_by: selectedUserId})
                            }}>
                                {users.map(user => {
                                    return (<option key={user.id}
                                                    value={user.id}>{user.username}</option>)
                                })}
                            </select></div>
                        <div className={[].join(" ")}>Start day:
                            <input className={styles.select} type={"date"} defaultValue={task.start_date}
                                   onChange={(e) => {
                                       setLocalTask({...localTask, start_date: e.target.value})
                                   }}/></div>


                        <div className={[].join(" ")}>End day:
                            <input className={styles.select} type={"date"} defaultValue={task.end_date}
                                   onChange={(e) => {
                                       setLocalTask({...localTask, end_date: e.target.value})
                                   }}/></div>

                        <div className={[].join(" ")}>Progress:
                            <input className={styles.select} type={"range"} min={0} max={100} step={1}
                                   defaultValue={task.progress}
                                   onChange={(e) => {
                                       setLocalTask({...localTask, progress: e.target.value})

                                   }}/>
                            <div className={[].join(" ")}>{localTask.progress}</div>
                        </div>
                    </div>


                    <div className={styles.info__dropdowns}>
                        <div className={[].join(" ")}><Dropdown addFunc={() => chooseCallback("priority")}
                                                                array={priorities}
                                                                startValue={task.priority ? priorities.find(priority => priority.content.title === task.priority): null}
                                                                fieldName={""}
                                                                callback={(value) => {
                                                                    setLocalTask({...localTask, priority: value});
                                                                }}/></div>
                        <div className={[].join(" ")}><Dropdown addFunc={() => chooseCallback("status")}
                                                                array={statuses}
                                                                startValue={task.status !== null ? statuses.find(status => status.content.title === task.status): null} fieldName={""}
                                                                callback={(value) => {
                                                                    setLocalTask({...localTask, status: value});
                                                                }}/></div>
                        <div className={[].join(" ")}><Dropdown addFunc={() => chooseCallback("estimate")}
                                                                array={estimates}
                                                                startValue={task.estimate ? estimates.find(estimate => estimate.content.title === task.estimate): null} fieldName={""}
                                                                callback={(value) => {
                                                                    setLocalTask({...localTask, estimate: value});
                                                                }}/></div>
                    </div>
                </div>
                {task.id ?
                    <div className={styles.panel}>
                        <div className={[styles.button, styles.button__delete].join(" ")}>Delete</div>
                        <div className={[styles.button, styles.button__update].join(" ")} onClick={() => {
                            delete localTask.assignee;
                            delete localTask.creator;
                            console.log(JSON.stringify(localTask));
                            setLocalTask({...localTask, timestamp: Date.now()});
                            // task = localTask
                        }}>Update
                        </div>
                    </div> :
                    <div className={styles.panel}>
                        <div className={[styles.button, styles.button__update].join(" ")} onClick={() => {
                            delete localTask.assignee;
                            delete localTask.creator;
                            console.log(JSON.stringify(localTask));
                            setLocalTask({...localTask, timestamp: Date.now()});
                            // task = localTask
                        }}>Create
                        </div>
                    </div>
                }
            </div>
    </div>)
}

export default Modal