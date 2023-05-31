import React,{useState, useEffect} from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate, Link} from "react-router-dom";

const Dashboard = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [personality, setPersonality] = useState('')
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [personalityName, setPersonalityName] = useState('');

    useEffect(() => {
        getUsers();
        getPersById();
        refreshToken();
    }, []);

    const refreshToken = async() => {
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
            if(error.response){
                navigate("/")
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
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

    const getUsers = async() => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        setUsers(response.data)
    }

    const getPersById = async () =>{
        const response =await axios.get(`http://localhost:5000/pers/${id}`)
        setPersonalityName(response.data.personalityName);
    }

    const deleteUser = async (id) =>{
        try {
            await axios.delete(`http://localhost:5000/users/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='container mt-5'>
        <h1 className='title is-3'>Selamat datang, {name}</h1>
        <p>id= {id}</p>
        <p>Kamu bisa tahu kepribadianmua ofhsakdjvusjkahvoeisdljb s entahlah isi nnt aj</p>
        {/* <button onClick={getUsers} className='button is-info'>Show Users</button> */}
        <table className='table is-striped is-fullwidth mt-5'>
            <tbody>
                <tr>
                    <td className='has-text-centered'>
                        <p>{name}</p>
                        <p>{email}</p>
                        <p>{personality}</p>
                        <Link to={`/edit/${id}`} className='button is-small is-danger'>Edit</Link>
                    </td>
                    <td className='has-text-centered'>
                        <p>Isi pertanyaan dibawah ini sesuai dengan jati dirimu</p>
                        <Link to={`/personality/${id}`} className='button is-small is-primary'>Test Personalitymu</Link>
                    </td>
                </tr> 
            </tbody>
        </table>
        <h1>Kepribadian seperti apa yang kamu punya?</h1>
        <table className='table is-striped is-fullwidth mt-5'>
            <tbody>
                <tr>
                    <td className='has-text-centered'>
                        INtrovert adalah...    
                    </td>
                    <td className='has-text-centered'>
                        Introvert vs extrovert
                    </td>
                    <td className='has-text-centered'>
                        Extrovert adalah...    
                    </td>
                </tr> 
                <tr>
                    <td className='has-text-centered'>
                        INtrovert adalah...    
                    </td>
                    <td className='has-text-centered'>
                        Introvert vs extrovert
                    </td>
                    <td className='has-text-centered'>
                        Extrovert adalah...    
                    </td>
                </tr> 
            </tbody>
        </table>
    </div>
  )
}

export default Dashboard