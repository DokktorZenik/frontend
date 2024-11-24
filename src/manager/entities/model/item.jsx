import style from "./item.module.css"

const Item = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.title}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, veniam.</p>
                </div>
                <div className={style.buttons}>
                    <div className={style.buttons__delete}>DELETE</div>
                </div>
            </div>
        </div>
    )
}

export default Item;