import styles from './main-container.module.css';
import TaskModel from "../task/task-model";
import Filter from "../filter/filter";
import {useEffect, useState} from "react";
import Modal from "../modal/modal";
import style from "./main-container.module.css";
import CreateModal from "../../entities/create/createModal";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {GATEWAY_ROUTE} from "../../../urls";

const MainContainer = () => {

    let navigate = useNavigate();
    const [filter, setFilter] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    }
    const [priorities, setPriorities] = useState([])
    const [statuses, setStatuses] = useState([])
    const [estimates, setEstimates] = useState([])
    const [tasks, setTasks] = useState([])
    const [currentTask, setCurrentTask] = useState()
    const [users, setUsers] = useState([])
    const [callback, setCallback] = useState(() => () => console.log("Not a function"));
    const [isCreateModalActive, setIsCreateModalActive] = useState(false);
    const [title, setTitle] = useState("");
    const date = new Date()

    const taskTemplate = {
        assignee_id: JSON.parse(localStorage.getItem("userid")),
        end_date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        estimate: null,
        orgId: JSON.parse(localStorage.getItem("org")).id,
        priority: null,
        progress: 0,
        projectId: JSON.parse(localStorage.getItem("proj")).id,
        start_date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        status: null,
        timestamp: Date.now(),
        title: ""
    }

    function createPriority(name) {
        if (name !== null && name !== undefined) {
            let org = JSON.parse(localStorage.getItem("org"));
            let proj = JSON.parse(localStorage.getItem("proj"));
            axios.post(`${GATEWAY_ROUTE}/organizations/${org.name}/priorities`, {
                orgId: org.id,
                project_id: proj.id,
                title: name,
                color: "\"border-color: rgb(70, 70, 70);\n" +
                    "background-color: rgb(34, 34, 34);\n" +
                    "color: rgb(211, 219, 76);\""
            }).then(res => {
                setPriorities([...priorities, res.data]);
            })
        }
    }

    function transformFilter() {
        let resultFilter = [];
        console.log("GOT", filter);
        Object.keys(filter).forEach(key => {
            console.log(`BOTTA PUSH ${key} WITH ${filter[key]}`);
            resultFilter.push({
                field: key,
                action: "eq",
                values: [filter[key].content.title],
                dataType: "STRING",
            });
        })
        return resultFilter;
    }

    function createStatus(name) {
        if (name !== null && name !== undefined) {
            let org = JSON.parse(localStorage.getItem("org"));
            axios.post(`${GATEWAY_ROUTE}/organizations/${org.name}/statuses`, {
                orgId: org.id,
                title: name,
                color: "\"border-color: rgb(70, 70, 70);\n" +
                    "background-color: rgb(34, 34, 34);\n" +
                    "color: rgb(211, 219, 76);\""
            }).then(res => {
                setStatuses([...statuses, res.data]);
            })
        }
    }

    function createEstimate(name) {
        if (name !== null && name !== undefined) {
            let org = JSON.parse(localStorage.getItem("org"));
            axios.post(`${GATEWAY_ROUTE}/organizations/${org.name}/estimates`, {
                orgId: org.id,
                title: name,
                color: "\"border-color: rgb(70, 70, 70);\n" +
                    "background-color: rgb(34, 34, 34);\n" +
                    "color: rgb(211, 219, 76);\""
            }).then(res => {
                setEstimates([...estimates, res.data]);
            })
        }
    }

    function chooseCallback(title) {
        switch (title) {
            case "priority":
                setCallback(() => (title) => createPriority(title));
                break;
            case "status":
                setCallback(() => (title) => createStatus(title));
                break;
            case "estimate":
                setCallback(() => (title) => createEstimate(title));
                break;
        }

        setIsCreateModalActive(true)
    }

    useEffect(()=>{
        if(Object.keys(filter).length !== 0){
            fetchTasks();
        }
    },[filter]);

    const fetchTasks = () => {
        let org = JSON.parse(localStorage.getItem("org"));
        let proj = JSON.parse(localStorage.getItem("proj"));

        axios.post(`${GATEWAY_ROUTE}/organizations/${org.name}/projects/${proj.name}/metric`,{
            fields:[
                "id",
                "assignee_id",
                "created_by",
                "end_date",
                "estimate",
                "priority",
                "progress",
                "start_date",
                "status",
                "timestamp",
                "title"
            ],
            filters: transformFilter()
        })
            .then(res => {
                responseTransform(res.data, users);
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            await new Promise(r => setTimeout(r, 1000));
            let org = JSON.parse(localStorage.getItem("org"));
            let proj = JSON.parse(localStorage.getItem("proj"));
            if (!org || !proj) {
                navigate("/metadata");
                return;
            }
            axios.get(`${GATEWAY_ROUTE}/organizations/${org.name}/priorities`)
                .then((response) => {
                    setPriorities(response.data);
                    console.log("PRIO",response.data);
                }).catch((error) => {
                console.log(error)
            })

            axios.get(`${GATEWAY_ROUTE}/organizations/${org.name}/statuses`)
                .then((response) => {
                    setStatuses(response.data);
                }).catch((error) => {
                console.log(error)
            })

            axios.get(`${GATEWAY_ROUTE}/organizations/${org.name}/estimates`)
                .then((response) => {
                    setEstimates(response.data);
                }).catch((error) => {
                console.log(error)
            })
            const usersResponse = await axios.get(`${GATEWAY_ROUTE}/users/${proj.id}`)
            const users = usersResponse.data._embedded.users;
            setUsers(users.map(user=>{
                return {
                    id: user.id,
                    content: {
                        title: user.username,
                        color: ""
                }
                }
            }));

            axios.post(`${GATEWAY_ROUTE}/organizations/${org.name}/projects/${proj.name}/metric`,{
                fields:[
                    "id",
                    "assignee_id",
                    "created_by",
                    "end_date",
                    "estimate",
                    "priority",
                    "progress",
                    "start_date",
                    "status",
                    "timestamp",
                    "title"
                ],
                filters:[]
            })
                .then((response) => {
                    console.log("RESPONSE TRANSFORM", response);
                    responseTransform(response.data, users);
                })
        }
        fetchData()


    }, [])

    const responseTransform = (body, users) => {


        let transformed = body._embedded.tasks.map(task => {
            let newTask = {}
            task.fields.map(field => {
                newTask[field.fieldName] = field.fieldValue;

            })
            console.log("newTask", newTask);
            console.log("Users:", users);
            const creator = users.find((user) => user.id === newTask.created_by)
            console.log("creator:", creator)
            const assignee = users.find((user) => user.id === newTask.assignee_id)
            return {
                ...newTask,
                creator: creator.username,
                assignee: assignee.username,
            }
        })
        console.log(transformed);
        setTasks(transformed)
    }


    return (
        <div className={styles.tasks__container}>
            {isCreateModalActive
                ? <CreateModal title={title} callback={callback}
                               closeModal={() => setIsCreateModalActive(false)}/>
                : null
            }
            <div className={styles.content}>
                <div className={styles.header}>
                    Tasks from Project
                </div>
                <div className={styles.settings}>
                    <div className={style.create__wrapper} onClick={() => {
                        setCurrentTask(taskTemplate)
                        setIsModalOpen(true)
                    }}>
                        <div className={[style.create_button].join(" ")}>
                            <p>Create Task</p>
                        </div>
                    </div>
                    <Filter priorities={priorities} statuses={statuses} assignees={users} filter={filter}
                            setFilter={setFilter}/>
                </div>
                <div className={styles.tasks__place}>
                    {isModalOpen ?
                        <Modal task={currentTask} users={users} chooseCallback={chooseCallback} priorities={priorities}
                               statuses={statuses} estimates={estimates}
                               tasks={tasks}
                               setTasks={setTasks}
                               close={() => {setIsModalOpen(false);fetchTasks();}}/> : null}
                    {tasks ? tasks.map(task => {
                            return <TaskModel task={task}
                                              priority={priorities.find(priority => priority.content.title === task.priority).content}
                                              status={statuses.find(status => status.content.title === task.status).content}
                                              estimate={estimates.find(estimate => estimate.content.title === task.estimate).content}
                                              clicked={openModal}
                                              key={task.id}/>
                        }
                    ) : null}

                </div>
            </div>
        </div>
    );
}

export default MainContainer;