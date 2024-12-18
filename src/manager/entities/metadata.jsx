import style from "./metadata.module.css";
import Item from "./model/item";
import CreateModal from "./create/createModal";
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {GATEWAY_ROUTE} from "../../urls";


const Metadata = () => {
    const [isModalActive, setIsModalActive] = useState(false);
    const [title, setTitle] = useState("");
    const [organizations, setOrganizations] = useState([]);
    const [projects, setProjects] = useState([]);

    const [orgname, setOrgname] = useState("");
    const [projid, setProjid] = useState("");

    const [orgEmail, setOrgEmail] = useState()
    const [projEmail, setProjEmail] = useState()

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
        let userId = JSON.parse(localStorage.getItem("userid"));
        axios.get(`${GATEWAY_ROUTE}/organizations/user/${userId}`).then((response) => {
            setOrganizations(response.data._embedded.responses);
        });
    }, []);

    const openModal = (data, setter, title) => {
        listRef.current = data;
        listSetterRef.current = setter;
        setTitle(title);
        setIsModalActive(true);
    };

    function getProjects(){
        let org = JSON.parse(localStorage.getItem("org"));
        let userId = JSON.parse(localStorage.getItem("userid"));
        axios.get(`${GATEWAY_ROUTE}/organizations/${org.name}/projects/user/${userId}`)
            .then((response) => {

                setProjects(response.data._embedded.responses);
            })
    }
    function redirectToTasks() {

        if(projid && orgname){
            navigate(`/tasks`);
        }
    }

    const inviteToOrg = () => {
        let token = localStorage.getItem("token")
        let org = JSON.parse(localStorage.getItem("org"));
        const params = new URLSearchParams();
        params.set("email", orgEmail);
        params.set("organizationId", org.id);

        axios.post(
            `${GATEWAY_ROUTE}/invitations/organization/send`,
            params,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(response => {
                console.log("Invitation sent successfully:", response.data);
            })
            .catch(error => {
                console.error("Error sending invitation:", error);
            });

    }

    const inviteToProject = () => {
        let token = localStorage.getItem("token")
        let org = JSON.parse(localStorage.getItem("org"));
        let proj = JSON.parse(localStorage.getItem("proj"));
        const params = new URLSearchParams();
        params.set("email", projEmail);
        params.set("organizationId", org.id);
        params.set("projectId", proj.id);

        axios.post(
            `${GATEWAY_ROUTE}/invitations/project/send`,
            params,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(response => {
                console.log("Invitation sent successfully:", response.data);
            })
            .catch(error => {
                console.error("Error sending invitation:", error);
            });

    }
    const deleteProject = (name) => {
        let org = JSON.parse(localStorage.getItem("org"));
        axios.delete(`${GATEWAY_ROUTE}/organizations/${org.name}/projects/${name}`).then((response) => {
            console.log(response);
        }).catch(error => {
            console.error("Error deleteing project:", error);
        })

    }

    const deleteOrganization = (name) => {
        axios.delete(`${GATEWAY_ROUTE}/organizations/${name}`).then((response) => {
            console.log(response);
        }).catch(error => {
            console.error("Error deleteing organization:", error);
        })

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

                            <div className={style.invite}>
                                <div className={style.input__field}>
                                    <input type="email" onChange={(e)=>setOrgEmail(e.target.value)} value={orgEmail}/>
                                </div>
                                <div className={style.create_button} onClick={()=>inviteToOrg()}>
                                    <p>Invite</p>
                                </div>
                            </div>

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
                                            if (item.name === orgname) {
                                                return <div><Item key={item.id} selected={true} item={item} callback={deleteOrganization}/></div>
                                            } else {
                                                return <div onClick={() => {
                                                    setOrgname(item.name);
                                                    localStorage.removeItem("proj");
                                                    setProjid(null)
                                                    localStorage.setItem("org", JSON.stringify(item));
                                                    getProjects();
                                                }}><Item key={item.id} selected={false} item={item} callback={deleteOrganization}/></div>
                                            }

                                        }
                                    )) : null}
                            </div>
                        </div>
                        <div className={[style.projs, style.items_container].join(" ")}>

                            <div className={style.invite}>
                                <div className={style.input__field}>
                                    <input type="email" onChange={(e) => setProjEmail(e.target.value)} value={projEmail}/>
                                </div>
                                <div className={style.create_button} onClick={() => inviteToProject()}>
                                    <p>Invite</p>
                                </div>
                            </div>

                            <div className={style.title}>
                                <p>PROJECTS</p>
                            </div>
                            <div
                                className={style.create__wrapper}
                                onClick={() => {
                                    if (localStorage.getItem("org") !== null) {
                                        openModal(projects, setProjects, "Create Project")
                                    }
                                }}
                            >
                                <div
                                    className={[localStorage.getItem("org") !== null ? style.create_button : style.inactive].join(" ")}>
                                    <p>Create Project</p>
                                </div>
                            </div>
                            <div>
                                {projects ? (
                                    projects.map((item) => {
                                        if (item.id === projid) {
                                            return <div><Item key={item.id} selected={true} item={item} callback={deleteProject}/></div>
                                        } else {
                                            return <div onClick={() => {
                                                setProjid(item.id);
                                                localStorage.setItem("proj", JSON.stringify(item));
                                            }
                                            }><Item key={item.id} selected={false} item={item} callback={deleteProject}/></div>
                                        }
                                    })
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Metadata;
