import TaskMainForm from "./manager/TaskMainForm";
import Login from "./manager/auth/login/login";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Metadata from "./manager/entities/metadata";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path={"/tasks"} element={<TaskMainForm/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/metadata"} element={<Metadata/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
