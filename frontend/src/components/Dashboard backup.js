import React,{useState, useEffect} from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async() => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
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

    const getUserById = async () =>{
        const response =await axios.get(`http://localhost:5000/users/${id}`)
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
    }

  return (
    <div className='container mt-5'>
        <h1 className='title is-3'>Selamat datang {name} !</h1>
        {/* <button onClick={getUsers} className='button is-info'>Show Users</button> */}
        <table className='table is-striped is-fullwidth mt-5'>
            <thead>
                <tr>
                    <th>No. </th>
                    <th>Nama</th>
                    <th>Email</th>
                    {/* <th>Gender</th> */}
                    <th>Opsi</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                <tr key={user.id}>
                   <td>{index + 1}</td>
                   <td>{user.name}</td>
                   <td>{user.email}</td>
                   {/* <td>{user.gender}</td> */}
                    <td>
                        <Link to={`/edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                        <button onClick={()=> deleteUser(user.id)} className='button is-small is-danger'>Hapus</button>
                    </td>
                </tr> 
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Dashboard