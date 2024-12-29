import { createBrowserRouter } from "react-router-dom";
import Listtasks from "./components/home";
import App from "./App";
import CreateTask from "./components/AddTask";
import UpdateTask from "./components/update";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'Listtasks', element: <Listtasks/> },
    { path: 'create_task', element: <CreateTask/> },
    { path: 'update/:id', element: <UpdateTask/> },
   
]);

export default router;