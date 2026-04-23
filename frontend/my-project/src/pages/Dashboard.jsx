import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { authAPI } from '../api';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>ResQFood Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome, {user?.full_name}!</h2>
          <p>Email: {user?.email}</p>
          <p>You are successfully logged in to ResQFood.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🍽️ Request Food</h3>
            <p>Browse and request available food items</p>
          </div>
          <div className="feature-card">
            <h3>📦 Donate Food</h3>
            <p>Share surplus food with those in need</p>
          </div>
          <div className="feature-card">
            <h3>👥 Community</h3>
            <p>Connect with other members</p>
          </div>
          <div className="feature-card">
            <h3>⭐ Ratings</h3>
            <p>View and manage your ratings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
