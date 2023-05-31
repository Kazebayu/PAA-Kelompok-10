import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const PersForm = () => {
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [personality,setPersonality] = useState("");
const navigate = useNavigate();
const {id} = useParams();
const [pers, setPers] = useState([]);
const [personalityName,setPersonalityName] = useState("");
const [a, setA] = useState(1);
const [b, setB] = useState(1);
//const [all, setAll] = useState(a+b);

useEffect(() => {
    getUserById();
    getPers();
    getPersById();
}, []);

const updateUser = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:5000/users/${id}`,{
            personality,
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
    setPersonality(response.data.personality);
}

const getPers = async() => {
    const response = await axios.get('http://localhost:5000/pers')
    setPers(response.data);
}

const getPersById = async () =>{
    const response =await axios.get(`http://localhost:5000/pers/${id}`)
    setPersonalityName(response.data.personalityName);
}



const handlePertanyaan1Change = (e) => {
    const selectedValue = Number(e.target.value);
    setA(selectedValue);
    setPersonality(selectedValue + b);
  };

  const handlePertanyaan2Change = (e) => {
    const selectedValue = Number(e.target.value);
    setB(selectedValue);
    if (selectedValue >= 1){
        setPersonality(selectedValue+ 'N')
    } else {
        setPersonality(selectedValue+ 'S')
    };
    //setPersonality(selectedValue + a);
  };
  
  const handlePertanyaan3Change = (e) => {
    const selectedValue = Number(e.target.value);
    setB((prevB) => prevB + selectedValue);
  };

var all = a+b;


  return (
    <div className="columns mt-5 is-center">
        <div className="column is-half">
        <p>{a}{b}</p>
        <p>{all}</p>
            <form onSubmit={updateUser}>
                <div className="field">
                    <label className="label">Pertanyaan 1</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select 
                                value={a} 
                                onChange={handlePertanyaan1Change}
                            >
                                <option value={1}>YA</option>
                                <option value={-1}>TIDAK</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Pertanyaan 2</label>
                    <div className="control">
                        <label className="radio">
                            <input
                                type="radio"
                                name="p2"
                                value={1}
                                onChange={handlePertanyaan2Change}
                            />
                            YA
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                name="p2"
                                value={-1}
                                onChange={handlePertanyaan2Change}
                            />
                            TIDAK
                        </label>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Pertanyaan 3</label>
                    <div className="control">
                        <label className="radio">
                            <input
                                type="radio"
                                name="p3"
                                value={1}
                                onChange={handlePertanyaan3Change}
                            />
                            YA
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                name="p3"
                                value={-1}
                                onChange={handlePertanyaan3Change}
                            />
                            TIDAK
                        </label>
                    </div>
                </div>
                {/* <div className="field">
                    <label className="label">Pertanyaan 3</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select 
                                onChange={handlePertanyaan2Change}
                            >
                                <option value={1}>YA</option>
                                <option value={-1}>TIDAK</option>
                            </select>
                        </div>
                    </div>
                </div> */}
                {/* <div className="field">
                    <label className="label">Personality</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            onChange={handleAll}
                            placeholder='Personality'/>
                    </div>
                </div> */}
                {/* <div className="field">
                    <label className="label">Gender</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select 
                                value={all} 
                                onChange={(e)=> setPersonality(e.target.value)}
                            >
                                <option value={a}>Laki-laki</option>
                                <option value={a}>Perempuan</option>
                            </select>
                        </div>
                    </div>
                </div> */}
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