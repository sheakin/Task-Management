import { NavLink,  useParams } from "react-router-dom";
import './navbar.css';

function Navbar() {
    
    const { postId } = useParams();

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="navbar-brand">
                <h4>Daily Tasks</h4>
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className="collapse navbar-collapse mr-auto"
                id="navbarNav"
                style={{ float: "left" }}
            >
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/Listtasks" className="nav-link" style={{ fontSize: 19 }}>
                            List Tasks
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/create_task" className="nav-link" style={{ fontSize: 19 }}>
                            Create Tasks
                        </NavLink>
                    </li>

                   
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
