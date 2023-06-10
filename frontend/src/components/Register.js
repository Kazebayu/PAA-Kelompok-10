import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users',{
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/");
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
            <div className='columns is-centered'>
                <div className='column is-4-desktop'>
                    <form className='box' onSubmit={Register}>
                    <h1 className='has-text-weight-bold is-family-monospace has-text-centered is-size-2 has-background-primary box has-text-white'>MyPersonality</h1>
                    <hr></hr>
                    <h1 className='label is-size-4 mt-5'>REGISTER</h1>
                        <div className='field'>
                            <label className='has-text-weight-medium'>Masukkan nama:</label>
                            <div className='controls'>
                                <input type="text" className='input' placeholder='Nama'
                                value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                        <div className='field mt-5'>
                            <label className='has-text-weight-medium'>Masukkan email:</label>
                            <div className='controls'>
                                <input type="text" className='input' placeholder='email@mail.com' 
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className='field mt-5'>
                            <label className='has-text-weight-medium'>Masukkan password:</label>
                            <div className='controls'>
                                <input type="password" className='input' placeholder='****'
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className='field mt-5'>
                            <label className='has-text-weight-medium'>Konfirmasi password:</label>
                            <div className='controls'>
                                <input type="password" className='input' placeholder='****'
                                value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className='field mt-5'>
                            <button className='button is-primary is-fullwidth'>Register</button>
                        </div>
                        <Link to={"/"}>Sudah punya akun ?</Link>
                        <p className='has-text-centered'>{msg}</p>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Register