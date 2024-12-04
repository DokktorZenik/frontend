import style from "./createModal.module.css"
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useState} from "react";

const CreateModal = ({callback, title, closeModal, list, listSetter}) => {


    const [input, setInput] = useState("");

    function create() {
        if(title === "Create Org"){
            axios.post("http://localhost:8080/v1/organizations", {
                ownerId: jwtDecode(localStorage.getItem("token")).userid,
                title: input,
            }).then(res => {
                listSetter([...list, res.data]);
                closeModal();
            }).catch(error => {
                alert(error.message);
            })

        } else if (title === "Create Project") {
            let org = JSON.parse(localStorage.getItem("org"));
            axios.post(`http://localhost:8080/v1/organizations/${org.name}/projects`, {
                ownerId: jwtDecode(localStorage.getItem("token")).userid,
                title: input,
            }).then(res => {
                listSetter([...list, res.data]);
                closeModal();
            }).catch(error => {
                alert(error.message);
            })
        } else {
            console.log(`Calling callback with ${input}`)
            callback(input)
            // callback(input)
        }
    }

    return (
        <div className={style.wrapper} onClick={closeModal}>
            <div className={style.container} onClick={e => e.stopPropagation()}>
                <div className={style.title_field}>{title}</div>
                <div className={style.name_field}>
                    <input type="text" onChange={e => setInput(e.target.value)}/>
                </div>
                <div className={style.button__wrapper}>
                    <div className={style.button} onClick={()=>create()}>APPLY</div>
                </div>
            </div>
        </div>
    );
}

export default CreateModal;