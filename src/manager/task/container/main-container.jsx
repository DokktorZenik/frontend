import styles from './main-container.module.css';
import TaskModel from "../task/task-model";
import Filter from "../filter/filter";
import {useState} from "react";
import Modal from "../modal/modal";

const MainContainer = () => {

    const [filter, setFilter] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (recordId) => {
        setIsModalOpen(true);
    }


    const priorities = [
        {
            content: "0-Low",
            style: "border-color: rgb(53, 68, 117);\n" +
                "    background-color: rgb(45, 60, 111);\n" +
                "    color: rgb(136, 185, 254);"
        },
        {
            content: "1-Medium",
            style: "border-color: rgb(96, 84, 36);\n" +
                "    background-color: rgb(82, 69, 17);\n" +
                "    color: rgb(254, 222, 76);"
        },
        {
            content: "2-High",
            style: "border-color: rgb(46, 25, 12);\n" +
                "    background-color: rgb(103, 55, 26);\n" +
                "    color: rgb(240, 114, 44);"
        },
        {
            content: "3-Critical",
            style: "border-color: rgb(109, 63, 67);\n" +
                "    background-color: rgb(97, 47, 51);\n" +
                "    color: rgb(233, 89, 104);"
        }
    ]

    const statuses = [
        {
            content: "Backlog",
            style: "border-color: rgb(70, 70, 70);\n" +
                "    background-color: rgb(34, 34, 34);\n" +
                "    color: rgb(211, 219, 76);"
        },
        {
            content: "To do",
            style: "border-color: rgb(114, 114, 114);\n" +
                "    background-color: rgb(102, 102, 102);\n" +
                "    color: rgb(190, 193, 193);"
        },
        {
            content: "In Development",
            style: "border-color: rgb(96, 84, 36);\n" +
                "    background-color: rgb(82, 69, 17);\n" +
                "    color: rgb(254, 222, 76);"
        },
        {
            content: "Done",
            style: "border-color: rgb(20, 100, 55);\n" +
                "    background-color: rgb(0, 87, 38);\n" +
                "    color: rgb(61, 240, 143);"
        }
    ]

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

    const estimates = [
        {
            content: "2h",
            style: "border: 2px solid rgb(14, 44, 22);\n" +
                "    background-color: rgb(25, 80, 40);\n" +
                "    color: rgb(66, 192, 146);"
        }
    ]


    return (
        <div className={styles.tasks__container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    Tasks from Project
                </div>
                <Filter priorities={priorities} statuses={statuses} assignees={assignees} filter={filter} setFilter={setFilter} />
                <div className={styles.tasks__place}>
                    {isModalOpen ? <Modal priorities={priorities} statuses={statuses} estimates={estimates} close={() => setIsModalOpen(false)}/> : null}
                    <TaskModel priorities={priorities} statuses={statuses} estimates={estimates} clicked={openModal} />
                    <TaskModel priorities={priorities} statuses={statuses} estimates={estimates} clicked={openModal} />
                    <TaskModel priorities={priorities} statuses={statuses} estimates={estimates} clicked={openModal} />
                </div>
            </div>
        </div>
    );
}

export default MainContainer;