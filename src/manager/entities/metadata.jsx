import style from "./metadata.module.css"
import Item from "./model/item";
import CreateModal from "./create/createModal";
import {useState} from "react";

const Metadata = () => {

    const [isModalActive, setIsModalActive] = useState(false);
    const [title, setTitle] = useState("");

    return (
        <div className={style.placement}>
            <div className={style.wrapper}>
                <div className={style.main_container}>
                    {isModalActive
                        ? <CreateModal title={title} callback={() => console.log("ARTEM")} closeModal={() => setIsModalActive(false)} />
                        : null
                    }
                    <div className={style.apply}><p>ACCEPT</p></div>
                    <div className={style.choose}>
                        <div className={[style.orgs, style.items_container].join(" ")}>
                            <div className={style.title}><p>ORGANIZATIONS</p></div>
                            <div className={style.create__wrapper} onClick={() => {
                                setIsModalActive(true)
                                setTitle("Create Org")
                            }}>
                                <div className={style.create_button}>
                                    <p>Create Org</p>
                                </div>
                            </div>
                            <div>
                                <Item/>
                                <Item/>
                            </div>

                        </div>
                        <div className={[style.projs, style.items_container].join(" ")}>
                            <div className={style.title}><p>PROJECTS</p></div>
                            <div className={style.create__wrapper} onClick={() => {
                                setIsModalActive(true)
                                setTitle("Create Project")
                            }}>
                                <div className={[style.inactive].join(" ")}>
                                    <p>Create Project</p>
                                </div>
                            </div>
                            <div>
                                <Item/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Metadata;