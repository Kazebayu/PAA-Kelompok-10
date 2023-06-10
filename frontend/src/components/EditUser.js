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
    <section className="hero has-background-light is-fullwidth pb-5">
      <div className="hero-body">
        <div className="container">
            <div className='columns is-centered'>
                <div className='column is-4-desktop'>
                    <form className='box' onSubmit={updateUser}>
                    <h1 className='label has-text-centered is-size-4 mt-2'>Edit Data Akun Anda</h1>
                    <hr></hr>
                        <div className='field'>
                            <label className='has-text-weight-medium'>Nama:</label>
                            <div className='controls'>
                              <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nama"
                              />
                            </div>
                        </div>
                        <div className='field'>
                            <label className='has-text-weight-medium'>Email:</label>
                            <div className='controls'>
                              <input
                                type="text"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                              />
                            </div>
                        </div>
                        <div className='field mt-6'>
                          <button type="submit" className="button is-success">
                            Perbarui
                          </button>
                        </div>
                        <p className='is-size-7 mt-4 has-text-danger'>
                          *PERINGATAN akun akan dihapus secara permanen
                        </p>
                        <p className='is-size-7 has-text-danger'>
                          *Akun akan dihapus secara permanen
                        </p>
                        <div className="field">
                          <button onClick={deleteUser} className="button is-danger">
                            Hapus Akun
                          </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>

   );
};

export default EditUser;
