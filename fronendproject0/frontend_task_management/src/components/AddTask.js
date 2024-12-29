import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [errors, setErrors] = useState({});  // State to hold error messages
    const navigate = useNavigate();

    function addPost() {
        // Clear any previous errors
        setErrors({});

        // Make the POST request
        axios.post('http://localhost:8000/tasks/', {
            title: title,
            description: description,
            due_date: dueDate,
            status: status,
        }).then(response => {
            navigate('/Listtasks');
        }).catch(error => {
            if (error.response && error.response.data) {
                // Handle validation errors returned by the backend
                setErrors(error.response.data);  // This will set the backend error messages
            } else {
                console.error("There was an error creating the task!", error);
            }
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Create Task</h1>
                        <div className="form-group">
                            <label>Title:</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}  // Add error styling if there is an error
                                value={title} 
                                onChange={(event) => setTitle(event.target.value)} required
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}  {/* Display error message */}
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea 
                                className="form-control" 
                                value={description} 
                                onChange={(event) => setDescription(event.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Due Date:</label>
                            <input 
                                type="date" 
                                className={`form-control ${errors.due_date ? 'is-invalid' : ''}`}  // Add error styling if there is an error
                                value={dueDate} required
                                onChange={(event) => setDueDate(event.target.value)} 
                            />
                            {errors.due_date && <div className="invalid-feedback">{errors.due_date}</div>}  {/* Display error message */}
                        </div>
                        <div className="form-group">
                            <label>Status:</label>
                            <select 
                                className="form-control" 
                                value={status} 
                                onChange={(event) => setStatus(event.target.value)} 
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={addPost}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;
