import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Listtasks() {
    const [posts, setPosts] = useState([]);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [statusFilter, setStatusFilter] = useState(""); // To store the selected status filter

    useEffect(() => {
        fetchPosts();
    }, [statusFilter]);  // Re-fetch tasks when the status filter changes

    // Fetch the list of tasks from the API with the selected status filter
    function fetchPosts() {
        const url = statusFilter
            ? `http://localhost:8000/tasks/?status=${statusFilter}`  // Filter by status
            : `http://localhost:8000/tasks/`;  // Get all tasks if no filter

        axios.get(url)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }

    // Handle task deletion
    const handleDelete = () => {
        if (taskToDelete) {
            axios.delete(`http://localhost:8000/tasks/${taskToDelete}/`)
                .then(response => {
                    alert("Task deleted successfully");
                    fetchPosts();  // Refresh the task list after deletion
                    setTaskToDelete(null); // Reset the task to delete
                })
                .catch(error => {
                    console.error("Error deleting task:", error);
                    alert("Failed to delete task");
                });
        }
    };

    // Open the delete confirmation modal and set the task ID
    const openDeleteModal = (id) => {
        setTaskToDelete(id);
        const deleteModal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.show();
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className="my-4 text-center" style={{ color: " rgba(37, 99, 130, 0.9)" }}>Tasks</h1>
                
                {/* Filter dropdown for task status */}
                <div className="mb-3">
                    <select 
                        className="form-select"
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)} 
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="row justify-content-center">
                    {posts.map((post) => (
                        <div className="col-md-4" key={post.id}>
                            <div className="card mb-5 h-100 shadow-sm">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-center">{post.title}</h5>
                                    <p className="card-text text-justify text-center">{post.description}</p>
                                    <p className="card-text text-center"><strong>{post.due_date}</strong></p>
                                    <p className="card-text text-center"><strong>Status:</strong> {post.status}</p>
                                    <div className="text-center justify-content-center mt-4">
                                        <Link to={`/update/${post.id}`} className="btn btn-success mx-2">Update</Link>
                                        <button onClick={() => openDeleteModal(post.id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bootstrap Modal for Confirmation */}
            <div className="modal fade" id="deleteModal" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Delete Task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this task?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Listtasks;
