import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [personality, setPersonality] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        email,
        personality,
      });
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setPersonality(response.data.personality);
  };

  return (
    <div className="columns mt-5 is-center">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          {/* <div className="field">
            <label className="label">Personality</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div> */}
          <div className="field">
            <button type="submit" className="button is-success">
              Perbarui
            </button>
          </div>
        </form>
        <div className="field">
          <button onClick={deleteUser} className="button is-danger">
            Hapus Akun
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
