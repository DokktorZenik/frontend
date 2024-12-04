import style from "./item.module.css"

const Item = ({item, selected}) => {
    return (
        <div className={style.wrapper}>
            <div className={[style.container, selected ? style.selected : ''].join(" ")}>
                <div className={style.title}>
                    <p>{item.name}</p>
                </div>
                <div className={style.buttons}>
                    <div className={style.buttons__delete}>DELETE</div>
                </div>
            </div>
        </div>
    )
}

export default Item;