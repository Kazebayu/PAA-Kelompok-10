import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login',{
                email: email,
                password: password,
            });
            navigate("/dashboard");
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
                    <form className='box' onSubmit={Auth}>
                    <h1 className='has-text-weight-bold is-family-monospace has-text-centered is-size-2 has-background-primary box has-text-white'>MyPersonality</h1>
                    <hr></hr>
                    <h1 className='label is-size-4 mt-5'>LOGIN</h1>
                        <div className='field'>
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
                            <button className='button is-primary is-fullwidth'>Login</button>
                        </div>
                        <Link to={"register"}>Tidak punya akun ?</Link>
                        <p className='has-text-centered'>{msg}</p>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Login