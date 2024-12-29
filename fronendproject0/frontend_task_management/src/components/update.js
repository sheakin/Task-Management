import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function UpdateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();  // Get the task ID from the URL

    // Fetch the task data when the component mounts
    useEffect(() => {
        console.log(`Fetching task with ID: ${id}`);
        setErrors({});  // Reset errors
        axios.get(`http://localhost:8000/taskiddetails/${id}/`)
          .then(response => {
            setTitle(response.data.title);
            setDescription(response.data.description);
            setDueDate(response.data.due_date);
            setStatus(response.data.status);
          })
          .catch(error => {
            if (error.response && error.response.data) {
                // Handle errors returned by the backend
                setErrors(error.response.data);  // This will set the backend error messages
            } else {
                console.error("There was an error fetching the task!", error);
            }
        });
    }, [id]);

    // Function to handle the form submission and send data to the backend
    function updateTask() {
        // Reset errors before making the API call
        setErrors({});

        // Send the updated task data to the backend
        axios.put(`http://localhost:8000/tasks/${id}/`, {
            title: title,
            description: description,
            due_date: dueDate,
            status: status,
        }).then(response => {
            navigate('/Listtasks');  // Redirect to the task list page after successful update
        }).catch(error => {
            if (error.response && error.response.data) {
                // Handle errors returned by the backend
                setErrors(error.response.data);  // This will set the backend error messages
            } else {
                console.error("There was an error updating the task!", error);
            }
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Update Task</h1>
                        <div className="form-group">
                            <label>Title:</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`} 
                                value={title}  
                                onChange={(event) => setTitle(event.target.value)} 
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea 
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
                                value={description}  
                                onChange={(event) => setDescription(event.target.value)} 
                            />
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                        </div>
                        <div className="form-group">
                            <label>Due Date:</label>
                            <input 
                                type="date" 
                                className={`form-control ${errors.due_date ? 'is-invalid' : ''}`} 
                                value={dueDate}  
                                onChange={(event) => setDueDate(event.target.value)} 
                            />
                            {errors.due_date && <div className="invalid-feedback">{errors.due_date}</div>}
                        </div>
                        <div className="form-group">
                            <label>Status:</label>
                            <select 
                                className={`form-control ${errors.status ? 'is-invalid' : ''}`} 
                                value={status} 
                                onChange={(event) => setStatus(event.target.value)} 
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={updateTask}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateTask;
