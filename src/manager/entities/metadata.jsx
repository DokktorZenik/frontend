import style from "./metadata.module.css"
import Item from "./model/item";

const Metadata = () => {
    return (
        <div className={style.placement}>
            <div className={style.wrapper}>
                <div className={style.main_container}>
                    <div className={style.apply}><p>ACCEPT</p></div>
                    <div className={style.choose}>
                        <div className={[style.orgs, style.items_container].join(" ")}>
                            <div className={style.title}><p>ORGANIZATIONS</p></div>
                            <div>
                                <Item/>
                                <Item/>
                            </div>

                        </div>
                        <div className={[style.projs, style.items_container].join(" ")}>
                            <div className={style.title}><p>PROJECTS</p></div>
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