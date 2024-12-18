import TaskMainForm from "./manager/TaskMainForm";
import Login from "./manager/auth/login/login";
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";
import Metadata from "./manager/entities/metadata";
import AcceptInvitation from "./manager/invite/invite";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/v1/invitations/organization/accept" element={<AcceptInvitation/>} />
                    <Route path="/v1/invitations/project/accept" element={<AcceptInvitation/>} />
                    <Route path ={"/"} element={<Navigate to={'/login'} replace/>}/>
                    <Route path={"/tasks"} element={<TaskMainForm/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/metadata"} element={<Metadata/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
