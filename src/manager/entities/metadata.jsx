import style from "./metadata.module.css";
import Item from "./model/item";
import CreateModal from "./create/createModal";
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";


const Metadata = () => {
    const [isModalActive, setIsModalActive] = useState(false);
    const [title, setTitle] = useState("");
    const [organizations, setOrganizations] = useState([]);
    const [projects, setProjects] = useState([]);

    const [orgname, setOrgname] = useState("");
    const [projid, setProjid] = useState("");

    const listRef = useRef([]);
    const listSetterRef = useRef(null);

    let navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.getItem("token"));
        if(localStorage.getItem("token") === null){
            navigate("/login")
        }
        localStorage.removeItem("org");
        localStorage.removeItem("proj");
        axios.get("http://localhost:8080/v1/organizations").then((response) => {
            setOrganizations(response.data._embedded.responses);
        });
    }, []);

    const openModal = (data, setter, title) => {
        listRef.current = data; // Store data in useRef
        listSetterRef.current = setter; // Store setter in useRef
        setTitle(title);
        setIsModalActive(true);
    };

    function getProjects(){
        let org = JSON.parse(localStorage.getItem("org"));
        axios.get("http://localhost:8080/v1/organizations/"+ org.name + "/projects")
            .then((response) => {

                setProjects(response.data._embedded.responses);
            })
    }
    function redirectToTasks() {

        if(projid && orgname){
            navigate(`/tasks`);
        }
    }

    return (
        <div className={style.placement}>
            <div className={style.wrapper}>
                <div className={style.main_container}>
                    {isModalActive ? (
                        <CreateModal
                            title={title}
                            list={listRef.current}
                            listSetter={listSetterRef.current}
                            callback={() => console.log("ARTEM")}
                            closeModal={() => setIsModalActive(false)}
                        />
                    ) : null}
                    <div className={style.apply} onClick={()=>redirectToTasks()}>
                        <p>APPLY</p>
                    </div>
                    <div className={style.choose}>
                        <div className={[style.orgs, style.items_container].join(" ")}>
                            <div className={style.title}>
                                <p>ORGANIZATIONS</p>
                            </div>
                            <div
                                className={style.create__wrapper}
                                onClick={() => {
                                    openModal(organizations, setOrganizations, "Create Org");
                                }}
                            >
                                <div className={style.create_button}>
                                    <p>Create Org</p>
                                </div>
                            </div>
                            <div>
                                {organizations ? (
                                    organizations.map((item) => {
                                        if(item.name === orgname){
                                            return <div><Item key={item.id} selected={true} item={item}/></div>
                                        } else {
                                            return <div onClick={()=>{
                                                setOrgname(item.name);
                                                localStorage.removeItem("proj");
                                                setProjid(null)
                                                localStorage.setItem("org", JSON.stringify(item));
                                                getProjects();
                                            }}><Item key={item.id} selected={false} item={item}/></div>
                                        }

                                    }
                                )) : null}
                            </div>
                        </div>
                        <div className={[style.projs, style.items_container].join(" ")}>
                            <div className={style.title}>
                                <p>PROJECTS</p>
                            </div>
                            <div
                                className={style.create__wrapper}
                                onClick={() => {
                                    if(localStorage.getItem("org") !== null) {
                                        openModal(projects, setProjects, "Create Project")
                                    }
                                }}
                            >
                                <div className={[localStorage.getItem("org") !== null ? style.create_button : style.inactive].join(" ")}>
                                    <p>Create Project</p>
                                </div>
                            </div>
                            <div>
                                {projects ? (
                                    projects.map((item) => {
                                        if(item.id === projid){
                                            return <div><Item key={item.id} selected={true} item={item}/></div>
                                        } else {
                                            return <div onClick={()=>{
                                                setProjid(item.id);
                                                localStorage.setItem("proj", JSON.stringify(item));}
                                            }><Item key={item.id} selected={false} item={item}/></div>
                                        }
                                    })
                                ):null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Metadata;
