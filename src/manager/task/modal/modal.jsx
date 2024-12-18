import styles from './modal.module.css';
import Dropdown from "../dropdown/dropdown";
import {useEffect, useState} from "react";
import axios from "axios";
import {GATEWAY_ROUTE} from "../../../urls";

const Modal = ({task, users, chooseCallback, close, priorities, statuses, estimates}) => {
    const [localTask, setLocalTask] = useState(task)

    function createTask() {
        let org = JSON.parse(localStorage.getItem("org"));
        let proj = JSON.parse(localStorage.getItem("proj"));
        console.log("Creating", localTask);
        axios.post(`${GATEWAY_ROUTE}/organizations/${org.name}/projects/${proj.name}/tasks`, {
            created_by: localStorage.getItem("userid"),
            tasks: [localTask],
        }).then(res => {
            console.log(res.data)
            close()
        })
    }

    function deleteTask() {
        let org = JSON.parse(localStorage.getItem("org"));
        let proj = JSON.parse(localStorage.getItem("proj"));
        setLocalTask({...localTask, orgId: org.id});
        setLocalTask({...localTask, projectId: proj.id});
        axios.delete(`${GATEWAY_ROUTE}/organizations/${org.name}/projects/${proj.name}/tasks/${task.id}`)
            .then(res => {
                close()
            }).catch(
                err => {
                    console.log(err);
                }
        )

    }

    function updateTask() {
        let org = JSON.parse(localStorage.getItem("org"));
        let proj = JSON.parse(localStorage.getItem("proj"));
        console.log("Updating", localTask)
        axios.put(`${GATEWAY_ROUTE}/organizations/${org.name}/projects/${proj.name}/tasks`,{
            created_by: localStorage.getItem("userid"),
            tasks: [localTask],
        })
            .then(res => {
                close()
            })
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
                                                    value={user.id}>{user.content.title}</option>)
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
                                                    value={user.id}>{user.content.title}</option>)
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
                                       setLocalTask({...localTask, progress: parseInt(e.target.value)})

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
                        <div className={[styles.button, styles.button__delete].join(" ")} onClick={()=> deleteTask()}>Delete</div>
                        <div className={[styles.button, styles.button__update].join(" ")} onClick={() => {
                            console.log(JSON.stringify(localTask));
                            setLocalTask({...localTask, timestamp: Date.now()});
                            updateTask()
                            task = localTask
                        }}>Update
                        </div>
                    </div> :
                    <div className={styles.panel}>
                        <div className={[styles.button, styles.button__update].join(" ")} onClick={() => {
                            setLocalTask({...localTask, timestamp: Date.now()});
                            createTask(localTask)
                        }}>Create
                        </div>
                    </div>
                }
            </div>
    </div>)
}

export default Modal