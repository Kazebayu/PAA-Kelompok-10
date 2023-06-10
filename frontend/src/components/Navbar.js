import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const logout = async() => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <nav className="navbar has-background-primary has-shadow p-1" role="navigation" aria-label="main navigation">
        <div className="container">
      <div className="navbar-brand">
      <h1 className='has-text-weight-bold is-family-monospace has-text-centered is-size-2 has-text-white'>MyPersonality</h1>
      </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={logout} className="button is-white">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar