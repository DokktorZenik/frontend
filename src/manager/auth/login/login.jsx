import style from "./login.module.css"
import {useState} from "react";
import axios from "axios";
import {redirect, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Login = () => {
    const [formData,setFormData] = useState({});
    let navigate = useNavigate()
     function register() {
         axios.post("http://localhost:8083/v1/auth/register",formData)
         .then(res => {
             alert("You have successfully registered");

         })
         .catch(err => {
             alert(err.response.data);
         })
    }
        function login() {
             axios.post("http://localhost:8083/v1/auth/login",{
                 username:formData.username,
                 password:formData.password
             })
            .then(res => {
                localStorage.setItem("token", res.data.token);
                let token = jwtDecode(res.data.token)
                localStorage.setItem("userid",token.userid)
                localStorage.setItem("username",token.sub)
                navigate("/metadata")
            })
            .catch(err => {
                return alert(err.response.data);
            })
        }
    return (
        <div className={style.placement}>
            <div className={style.container}>
                <div className={[style.container_item, style.info].join(" ")}></div>
                <div className={[style.container_item, style.login_container].join(" ")}>
                    <div className={style.login_wrapper}>
                        <div className={style.login_form}>
                            <div className={style.title}>LOGIN</div>
                            <div className={style.email}>
                                <input type="text" placeholder={"Email"} onChange={(e) =>
                                    setFormData({...formData, email: e.target.value})}/>
                            </div>
                            <div className={style.username}>
                                <input type="text" placeholder={"Username"} onChange={(e) =>
                                setFormData({...formData, username: e.target.value})}/>
                            </div>
                            <div className={style.password}>
                                <input type="password" placeholder={"Password"} onChange={(e) =>
                                setFormData({...formData, password: e.target.value})}/>
                            </div>
                            <div className={style.password}>
                                <input type="password" placeholder={"Confirm password"} onChange={(e) =>
                                setFormData({...formData, confirmPassword: e.target.value})}/>
                            </div>
                            <div className={style.buttons}>
                                <div className={[style.button, style.button__register].join(" ")} onClick={()=>register()}>REGISTER</div>
                                <div className={[style.button, style.button__login].join(" ")} onClick={()=>login()}>LOGIN</div>
                            </div>
                            <div className={style.oauth_buttons}>
                                <div className={[style.button, style.button__google].join(" ")}>Login with Google</div>
                                <div className={[style.button, style.button__facebook].join(" ")}>Login with Facebook</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;