import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const PersForm = () => {
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [gender,setGender] = useState("Male");
const navigate = useNavigate();
const {id} = useParams();
const [pers, setPers] = useState([]);
const [personalityName,setPersonalityName] = useState("");

useEffect(() => {
    getUserById();
    getPers();
    getPersById();
}, []);

const updateUser = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:5000/users/${id}`,{
            name,
            email,
            gender,
        });
        navigate("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

const getUserById = async () =>{
    const response =await axios.get(`http://localhost:5000/users/${id}`)
    setName(response.data.name);
    setEmail(response.data.email);
    setGender(response.data.gender);
}

const getPers = async() => {
    const response = await axios.get('http://localhost:5000/pers')
    setPers(response.data);
}

const getPersById = async () =>{
    const response =await axios.get(`http://localhost:5000/pers/${id}`)
    setPersonalityName(response.data.personalityName);
}

  return (
    
    <div className="columns mt-5 is-center">
        <table className='table is-striped is-fullwidth '>
                <tbody>
                    {pers.map((user, index) => (
                        <tr key={user.idPers}>
                         <td>{index + 1}</td>
                         <td>{user.personalityName}</td>
                         <td>{user.id}</td>
                        </tr>
                    ))}
                    <td>{personalityName}</td>
                </tbody>
            </table>
        <div className="column is-half">
            <form onSubmit={updateUser}>
                <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={name} 
                            onChange={(e)=> setName(e.target.value)}
                            placeholder='Nama'
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
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder='Email'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Gender</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select 
                                value={gender} 
                                onChange={(e)=> setGender(e.target.value)}
                            >
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <button type='submit' className='button is-success'>
                        Perbarui
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default PersForm;