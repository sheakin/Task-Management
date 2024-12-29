import Navbar from './components/Navbar';
import './App.css';
import backgroundImage1 from './components/images/img1.jpg';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <div className="image-section">
          <img src={backgroundImage1} alt="Background" className="img-fluid" />
        </div>
        <div className="welcome-message-container ">
          <div className="welcome-message text-center ">
            <h1>Welcome to Task Management</h1>
            <p>Organize your tasks and stay productive with ease!</p>
            <Link to="/Listtasks" className="btn btn-primary btn-lg mt-3">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
