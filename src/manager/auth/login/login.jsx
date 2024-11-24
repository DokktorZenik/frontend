import style from "./login.module.css"

const Login = () => {
    return (
        <div className={style.placement}>
            <div className={style.container}>
                <div className={[style.container_item, style.info].join(" ")}></div>
                <div className={[style.container_item, style.login_container].join(" ")}>
                    <div className={style.login_wrapper}>
                        <div className={style.login_form}>
                            <div className={style.title}>LOGIN</div>
                            <div className={style.email}>
                                <input type="text" placeholder={"email"}/>
                            </div>
                            <div className={style.password}>
                                <input type="password" placeholder={"password"}/>
                            </div>
                            <div className={style.buttons}>
                                <div className={[style.button, style.button__register].join(" ")}>REGISTER</div>
                                <div className={[style.button, style.button__login].join(" ")}>LOGIN</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;