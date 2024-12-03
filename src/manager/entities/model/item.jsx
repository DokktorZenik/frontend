import style from "./item.module.css"

const Item = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.title}>
                    <p>Lorem </p>
                </div>
                <div className={style.buttons}>
                    <div className={style.buttons__delete}>DELETE</div>
                </div>
            </div>
        </div>
    )
}

export default Item;