import style from "./createModal.module.css"

const CreateModal = ({callback, title, closeModal}) => {
    return (
        <div className={style.wrapper} onClick={closeModal}>
            <div className={style.container} onClick={e => e.stopPropagation()}>
                <div className={style.title_field}>{title}</div>
                <div className={style.name_field}>
                    <input type="text"/>
                </div>
                <div className={style.button__wrapper}>
                    <div className={style.button}>APPLY</div>
                </div>
            </div>
        </div>
    );
}

export default CreateModal;