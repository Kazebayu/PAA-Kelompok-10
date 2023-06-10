import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [personality, setPersonality] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setId(decoded.id);
      setName(decoded.name);
      setEmail(decoded.email);
      setPersonality(decoded.personality);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate('/');
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async () => {
    const response = await axiosJWT.get('http://localhost:5000/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  };

  return (
    <section className="hero is-fullwidth pb-5 has-background-white-bis">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-2 pb-5 has-text-centered">Selamat datang, {name}</h1>
          <p className="subtitle is-5 is-half-desktop has-text-centered">
            Ambillah Tes Kepribadian dibawah dan temukan jati dirimu yang sesungguhnya
          </p>
          <hr className="mt-6 mb-6 has-background-white-bis" />
          <hr className="" />
          <div className="columns is-centered">
            <div className="column is-two-thirds">
              <div className="box mt-5 mb-5 has-background-primary-light">
                <table className="table is-fullwidth has-background-primary-light">
                  <tbody>
                    <tr>
                      <td className="has-text-centered is-vcentered">
                        <h1 className="title is-4">Profil</h1>
                        <div className="has-text-justified">
                          <tr>
                            <td>
                              <p>Nama</p>
                              <p>Email</p>
                              <p>Kepribadian</p>
                            </td>
                            <td>
                              <p>: {name}</p>
                              <p>: {email}</p>
                              <p>: {personality}</p>
                            </td>
                          </tr>
                          <Link to={`/edit/${id}`} className="button is-small is-danger mt-2 ml-3">
                            Edit Profil
                          </Link>
                        </div>
                      </td>
                      <td className="has-text-centered">
                        <h1 className="title is-4">Tes Kepribadian</h1>
                        <div className="content">
                          <p>Isilah pertanyaan pada formulir sesuai dengan isi hatimu</p>
                          <Link to={`/personality/${id}`} className="button is-primary mt-5">
                            Tes Personalityku
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <hr className="" />

          <div className="container is-centered">
            <h1 className="title is-4 has-text-centered">Apakah kamu sudah tahu bagaimana kepribadianmu?</h1>
            <h1 className="subtitle is-4 has-text-centered">Mari kita lihat penjelasannya dibawah ini</h1>
          </div>

          <hr className=" mb-6 has-background-white-bis" />

          <div className="box has-text-centered is-vcentered">
            <h1 className="title is-size-1 mb-6 is-underlined">{personality}</h1>
            <hr></hr>

            <div className="columns is-vcentered pt-3 pb-3 has-background-primary-light">
              <div className="column">
                <div>
                  <h1 className="title is-5">Extraversion</h1>
                  <ul>
                    <li>Terpulihkan energinya saat beramai-ramai</li>
                    <li>Lebih suka bekerja dalam tim</li>
                    <li>Cenderung ceplas-ceplos</li>
                  </ul>
                </div>
              </div>

              <div className="column title is-2">
                <div>
                  <h1 className="has-text-weight-bold">E vs I</h1>
                </div>
              </div>

              <div className="column">
                <div>
                  <h1 className="title is-5">Introversion</h1>
                  <ul>
                    <li>Terpulihkan energinya saat sendirian</li>
                    <li>Lebih suka bekerja sendiri</li>
                    <li>Cenderung pendiam</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="columns is-vcentered pt-3 pb-3">
              <div className="column">
                <div>
                  <h1 className="title is-5">Sensing</h1>
                  <ul>
                    <li>Melihat sesuatu apa adanya</li>
                    <li>Memusatkan perhatian pada hal yang konkrit dan detail</li>
                    <li>Lebih suka ide-ide yang praktis</li>
                  </ul>
                </div>
              </div>

              <div className="column title is-2">
                <div>
                  <h1 className="has-text-weight-bold">S vs N</h1>
                </div>
              </div>

              <div className="column">
                <div>
                  <h1 className="title is-5">Intuition</h1>
                  <ul>
                    <li>Membayangkan kemungkinan yang dapat terjadi</li>
                    <li>Memusatkan pada gambaran besar</li>
                    <li>Menyukai ide-ide dan konsep-konsep</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="columns is-vcentered pt-3 pb-3 has-background-primary-light">
              <div className="column">
                <div>
                  <h1 className="title is-5">Thinking</h1>
                  <ul>
                    <li>Mengutamakan aspek keadilan</li>
                    <li>Menyukai mencari celah dari suatu argumen</li>
                    <li>Digambarkan sebagai orang yang logis</li>
                  </ul>
                </div>
              </div>

              <div className="column title is-2">
                <div>
                  <h1 className="has-text-weight-bold">T vs F</h1>
                </div>
              </div>

              <div className="column">
                <div>
                  <h1 className="title is-5">Feeling</h1>
                  <ul>
                    <li>Mengutamakan hubungan yang baik dengan orang lain</li>
                    <li>Suka menyenangkan orang lain</li>
                    <li>Digambarkan sebagai orang yang hangat dan empatetik</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="columns is-vcentered pt-3 pb-3">
              <div className="column">
                <div>
                  <h1 className="title is-5">Judging</h1>
                  <ul>
                    <li>Berpikir bahwa aturan dan deadline harus ditaati</li>
                    <li>Lebih suka mendapat instruksi yang detail</li>
                    <li>Membuat rencana untuk menghadapi masa depan</li>
                  </ul>
                </div>
              </div>

              <div className="column title is-2">
                <div>
                  <h1 className="has-text-weight-bold">J vs P</h1>
                </div>
              </div>

              <div className="column">
                <div>
                  <h1 className="title is-5">Perceiving</h1>
                  <ul>
                    <li>Melihat aturan dan deadline sebagai hal yang fleksibel</li>
                    <li>Suka mengembangkan dan memperbaiki sesuatu seiring berjalannya aktivitas</li>
                    <li>Termasuk spontan, menyukai kejutan dan situasi baru</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
