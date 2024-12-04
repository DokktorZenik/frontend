import styles from './main-container.module.css';
import TaskModel from "../task/task-model";
import Filter from "../filter/filter";
import {useEffect, useState} from "react";
import Modal from "../modal/modal";
import style from "./main-container.module.css";
import CreateModal from "../../entities/create/createModal";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
    const [users, setUsers] = useState()
    const [callback, setCallback] = useState(() => () => console.log("Not a function"));
    const [isCreateModalActive, setIsCreateModalActive] = useState(false);
    const [title, setTitle] = useState("");
    const date = new Date()

    const taskTemplate = {

        assignee_id: JSON.parse(localStorage.getItem("userid")),
        created_by: JSON.parse(localStorage.getItem("userid")),
        end_date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        estimate: null,
        org_id: JSON.parse(localStorage.getItem("org")).id,
        priority: null,
        progress: 0,
        project_id: JSON.parse(localStorage.getItem("proj")).id,
        start_date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        status: null,
        timestamp: Date.now(),
        title: ""
    }

    function createPriority(name) {
        if (name !== null && name !== undefined) {
            let org = JSON.parse(localStorage.getItem("org"));
            axios.post(`http://localhost:8080/v1/organizations/${org.name}/priorities`, {
                orgId: org.id,
                title: name,
                color: "\"border-color: rgb(70, 70, 70);\n" +
                    "background-color: rgb(34, 34, 34);\n" +
                    "color: rgb(211, 219, 76);\""
            }).then(res => {
                setPriorities([...priorities, res.data]);
            })
        }
    }

    function createStatus(name) {
        if (name !== null && name !== undefined) {
            let org = JSON.parse(localStorage.getItem("org"));
            axios.post(`http://localhost:8080/v1/organizations/${org.name}/statuses`, {
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
            axios.post(`http://localhost:8080/v1/organizations/${org.name}/estimates`, {
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
                console.log("priority");
                setCallback(() => (title) => createPriority(title));
                break;
            case "status":
                setCallback(() => (title) => createStatus(title));
                console.log("status");
                break;
            case "estimate":
                setCallback(() => (title) => createEstimate(title));
                console.log("estimate");
                break;
        }

        setIsCreateModalActive(true)
    }

    useEffect(() => {
        const fetchData = async () => {

            let org = JSON.parse(localStorage.getItem("org"));
            let proj = JSON.parse(localStorage.getItem("proj"));
            if (!org || !proj) {
                navigate("/metadata");
                return;
            }
            axios.get(`http://localhost:8080/v1/organizations/${org.name}/priorities`)
                .then((response) => {
                    setPriorities(response.data);
                }).catch((error) => {
                console.log(error)
            })

            axios.get(`http://localhost:8080/v1/organizations/${org.name}/statuses`)
                .then((response) => {
                    setStatuses(response.data);
                }).catch((error) => {
                console.log(error)
            })

            axios.get(`http://localhost:8080/v1/organizations/${org.name}/estimates`)
                .then((response) => {
                    setEstimates(response.data);
                }).catch((error) => {
                console.log(error)
            })
            const usersResponse = await axios.get(`http://localhost:8083/v1/users/${proj.id}`)
            const users = usersResponse.data._embedded.users;
            setUsers(users);

            axios.get(`http://localhost:8082/v1/projects/${proj.id}/tasks`)
                .then((response) => {
                    setTasks(response.data._embedded.tasks.map(task => {
                        const creator = users.find((user) => user.id === task.created_by)
                        const assignee = users.find((user) => user.id === task.assignee_id)
                        return {
                            ...task,
                            creator: creator.username,
                            assignee: assignee.username,
                        }
                    }));
                })
        }
        fetchData()


    }, [])



    // const priorities = [
    //     {
    //         content: "0-Low",
    //         style: "border-color: rgb(53, 68, 117);\n" +
    //             "    background-color: rgb(45, 60, 111);\n" +
    //             "    color: rgb(136, 185, 254);"
    //     },
    //     {
    //         content: "1-Medium",
    //         style: "border-color: rgb(96, 84, 36);\n" +
    //             "    background-color: rgb(82, 69, 17);\n" +
    //             "    color: rgb(254, 222, 76);"
    //     },
    //     {
    //         content: "2-High",
    //         style: "border-color: rgb(46, 25, 12);\n" +
    //             "    background-color: rgb(103, 55, 26);\n" +
    //             "    color: rgb(240, 114, 44);"
    //     },
    //     {
    //         content: "3-Critical",
    //         style: "border-color: rgb(109, 63, 67);\n" +
    //             "    background-color: rgb(97, 47, 51);\n" +
    //             "    color: rgb(233, 89, 104);"
    //     }
    // ]

    // const statuses = [
    //     {
    //         content: "Backlog",
    //         style: "border-color: rgb(70, 70, 70);\n" +
    //             "    background-color: rgb(34, 34, 34);\n" +
    //             "    color: rgb(211, 219, 76);"
    //     },
    //     {
    //         content: "To do",
    //         style: "border-color: rgb(114, 114, 114);\n" +
    //             "    background-color: rgb(102, 102, 102);\n" +
    //             "    color: rgb(190, 193, 193);"
    //     },
    //     {
    //         content: "In Development",
    //         style: "border-color: rgb(96, 84, 36);\n" +
    //             "    background-color: rgb(82, 69, 17);\n" +
    //             "    color: rgb(254, 222, 76);"
    //     },
    //     {
    //         content: "Done",
    //         style: "border-color: rgb(20, 100, 55);\n" +
    //             "    background-color: rgb(0, 87, 38);\n" +
    //             "    color: rgb(61, 240, 143);"
    //     }
    // ]
    //
    const assignees = [
        {
            content: "Artem",
            style: ""
        },
        {
            content: "Tozhe Artem",
            style: ""
        }
    ]


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
                    <Filter priorities={priorities} statuses={statuses} assignees={assignees} filter={filter}
                            setFilter={setFilter}/>
                </div>
                <div className={styles.tasks__place}>
                    {isModalOpen ?
                        <Modal task={currentTask} users={users} chooseCallback={chooseCallback} priorities={priorities}
                               statuses={statuses} estimates={estimates}
                               close={() => setIsModalOpen(false)}/> : null}
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