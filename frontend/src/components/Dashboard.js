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
        <p>Kamu dapat tahu bagaimana kepribadianmu yang sesungguhnya dengan menjawab pertanyaan-pertanyaan pada form dibawah</p>
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
                        <Link to={`/personality/${id}`} className='button is-small is-primary'>Tes Personalityku</Link>
                    </td>
                </tr> 
            </tbody>
        </table>
        <h1>Apakah kamu sudah tahu bagaimana kepribadianmu?</h1>
        <h1>Mari kita lihat penjelasannya dibawah ini</h1>
        <h1>{personality}</h1>
        <table className='table is-striped is-fullwidth mt-5'>
            <tbody>
                <tr>
                    <td className='has-text-centered'>
                        Extraversion
                        <li>Terpulihkan energinya saat beramai-ramai</li> 
                        <li>Lebih suka bekerja dalam tim</li> 
                        <li>Cenderung ceplas-ceplos</li> 
                    </td>
                    <td className='has-text-centered'>
                        E vs I
                    </td>
                    <td className='has-text-centered'>
                        Introversion
                        <li>Terpulihkan energinya saat sendirian</li> 
                        <li>Lebih suka bekerja sendiri</li> 
                        <li>Cenderung pendiam</li>  
                    </td>
                </tr> 
                <tr>
                    <td className='has-text-centered'>
                        Sensing
                        <li>Melihat sesuatu apa adanya</li> 
                        <li>Memusatkan perhatian pada hal yang konkrit dan detail</li> 
                        <li>Lebih suka ide-ide yang praktis</li> 
                    </td>
                    <td className='has-text-centered'>
                        S vs N
                    </td>
                    <td className='has-text-centered'>
                        Intuition
                        <li>Membayangkan kemungkinan yang dapat terjadi</li> 
                        <li>Memusatkan pada gambaran besar</li> 
                        <li>Menyukai ide-ide dan konsep-konsep</li>  
                    </td>
                </tr> 
                <tr>
                    <td className='has-text-centered'>
                        Thinking
                        <li>Mengutamakan aspek keadilan</li> 
                        <li>Menyukai mencari celah dari suatu argumen</li> 
                        <li>Digambarkan sebagai orang yang logis</li> 
                    </td>
                    <td className='has-text-centered'>
                        T vs F
                    </td>
                    <td className='has-text-centered'>
                        Feeling
                        <li>Mengutamakan hubungan yang baik dengan orang lain</li> 
                        <li>Suka menyenangkan orang lain</li> 
                        <li>Digambarkan sebagai orang yang hangat dan empatetik</li>  
                    </td>
                </tr> 
                <tr>
                    <td className='has-text-centered'>
                        Judging
                        <li>Berpikir bahwa aturan dan deadline harus ditaati</li> 
                        <li>Lebih suka mendapat instruksi yang detail</li> 
                        <li>Membuat rencara untuk menghadapi masa depan</li> 
                    </td>
                    <td className='has-text-centered'>
                        J vs P
                    </td>
                    <td className='has-text-centered'>
                        Perceiving
                        <li>Melihat aturan dan deadline sebagai hal yang fleksibel</li> 
                        <li>Suka mengembangkan dan memperbaiki sesuatu sejalan dengan berjalannya aktivitas</li> 
                        <li>Termasuk spontan, menyukai kejutan dan situasi baru</li>  
                    </td>
                </tr> 
            </tbody>
        </table>
    </div>
  )
}

export default Dashboard