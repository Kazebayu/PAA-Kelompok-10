import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const PersForm = () => {
const [personality,setPersonality] = useState("");
const navigate = useNavigate();
const {id} = useParams();
const [a, setA] = useState(0);
const [b, setB] = useState(0);
const [c, setC] = useState(0);
const [d, setD] = useState(0);
//const [all, setAll] = useState(a+b);

useEffect(() => {
    getUserById();

}, []);

const updateUser = async (e) => {
    e.preventDefault();
    handleHasil();
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
    setPersonality(response.data.personality);
}



const handleHasil = () => {
    let result = "";
    if (a >= 0) {
        result += "E";
    } else {
        result += "I";
    }
    if (b >= 0) {
        result += "S";
    } else {
        result += "N";
    }
    if (c >= 0) {
        result += "T";
    } else {
        result += "F";
    }
    if (d >= 0) {
        result += "J";
    } else {
        result += "P";
    }
    setPersonality(result);
};


  const handlePertanyaanA = (e) => {
    const selectedValue = Number(e.target.value);
    setA((prevA) => prevA + selectedValue);
    handleHasil();
  };

  const handlePertanyaanB= (e) => {
    const selectedValue = Number(e.target.value);
    setB((prevB) => prevB + selectedValue);
    handleHasil();
  };

  const handlePertanyaanC= (e) => {
    const selectedValue = Number(e.target.value);
    setC((prevC) => prevC + selectedValue);
    handleHasil();
  };

  const handlePertanyaanD= (e) => {
    const selectedValue = Number(e.target.value);
    setD((prevD) => prevD + selectedValue);
    handleHasil();
  }; 


  return (
    <section className="hero has-background-light is-fullwidth pb-5">
      <div className="hero-body">
        <div className="container">
          <div className='columns is-centered'>
            <div className='column is-7-desktop'>
            <form className='box has-background-primary-light' onSubmit={updateUser}>
            <h1 className='label has-text-centered is-size-4 mt-2 '>Isilah pertanyaan-pertanyaan dibawah ini sesuai dengan isi hatimu</h1>
            <hr className='has-background-grey-lighter'></hr>
                <div className="field box">
                    <label className="label">Pertanyaan 1</label>
                    <p>Saya mencoba untuk tidak menarik perhatian pada diri daya sendiri</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p1"
                                value={10}
                                onChange={handlePertanyaanA}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p1"
                                value={-10}
                                onChange={handlePertanyaanA}
                            />
                            Akurat
                        </label>
                    </div>
                </div>
                <div className="field box">
                    <label className="label">Pertanyaan 2</label>
                    <p>Berada di sekitar banyak orang membuat saya bersemangat</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p2"
                                value={-10}
                                onChange={handlePertanyaanA}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p2"
                                value={10}
                                onChange={handlePertanyaanA}
                            />
                            Akurat
                        </label>
                    </div>
                </div>
                <div className="field box">
                    <label className="label">Pertanyaan 3</label>
                    <p>Saya sering menjadi orang yang memulai percakapan</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p3"
                                value={-10}
                                onChange={handlePertanyaanA}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p3"
                                value={10}
                                onChange={handlePertanyaanA}
                            />
                            Akurat
                        </label>
                    </div>
                </div>


                <div className="field box">
                    <label className="label">Pertanyaan 4</label>
                    <p>Saya menghabiskan waktu mencoba memahami diri sendiri</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p4"
                                value={10}
                                onChange={handlePertanyaanB}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p4"
                                value={-10}
                                onChange={handlePertanyaanB}
                            />
                            Akurat
                        </label>
                    </div>
                </div>
                <div className="field box">
                    <label className="label">Pertanyaan 5</label>
                    <p>Saya menikmati diskusi filosofis</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p5"
                                value={10}
                                onChange={handlePertanyaanB}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p5"
                                value={-10}
                                onChange={handlePertanyaanB}
                            />
                            Akurat
                        </label>
                    </div>
                </div>
                <div className="field box">
                    <label className="label">Pertanyaan 6</label>
                    <p>Saya menyukai ide-ide yang mudah dipahami daripada ide-ide yang kompleks </p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p6"
                                value={-10}
                                onChange={handlePertanyaanB}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p6"
                                value={10}
                                onChange={handlePertanyaanB}
                            />
                            Akurat
                        </label>
                    </div>
                </div>



                <div className="field box">
                    <label className="label">Pertanyaan 7</label>
                    <p>Saya mengutamakan kebutuhan saya daripada kebutuhan orang lain</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p7"
                                value={10}
                                onChange={handlePertanyaanC}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p7"
                                value={-10}
                                onChange={handlePertanyaanC}
                            />
                            Akurat
                        </label>
                    </div>
                </div>   
                <div className="field box">
                    <label className="label">Pertanyaan 8</label>
                    <p>Saya memaafkan kesalahan orang lain, bahkan ketika itu merugikan saya</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p8"
                                value={10}
                                onChange={handlePertanyaanC}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p8"
                                value={-10}
                                onChange={handlePertanyaanC}
                            />
                            Akurat
                        </label>
                    </div>
                </div>   
                <div className="field box">
                    <label className="label">Pertanyaan 9</label>
                    <p>Saya objektif saat membuat keputusan</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p9"
                                value={-10}
                                onChange={handlePertanyaanC}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p9"
                                value={10}
                                onChange={handlePertanyaanC}
                            />
                            Akurat
                        </label>
                    </div>
                </div>



                <div className="field box">
                    <label className="label">Pertanyaan 10</label>
                    <p>Saya kesulitan mengikuti rutinitas</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p10"
                                value={10}
                                onChange={handlePertanyaanD}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p10"
                                value={-10}
                                onChange={handlePertanyaanD}
                            />
                            Akurat
                        </label>
                    </div>
                </div>
                <div className="field box">
                    <label className="label">Pertanyaan 11</label>
                    <p>Saya sangat memperhatikan tenggat waktu</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p11"
                                value={-10}
                                onChange={handlePertanyaanD}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p11"
                                value={10}
                                onChange={handlePertanyaanD}
                            />
                            Akurat
                        </label>
                    </div>
                </div>
                <div className="field box">
                    <label className="label">Pertanyaan 12</label>
                    <p>Saya sering membuat keputusan berdasarkan kata hati saya</p>
                    <div className="control columns mt-1">
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p12"
                                value={10}
                                onChange={handlePertanyaanD}
                            />
                            Tidak Akurat
                        </label>
                        <label className="radio column">
                            <input
                                type="radio"
                                name="p12"
                                value={-10}
                                onChange={handlePertanyaanD}
                            />
                            Akurat
                        </label>
                    </div>
                </div>
                <hr className='has-background-grey-lighter'></hr>
                <div className="field">
                    <button type='submit' className='button is-success is-size-4 box'>
                        Simpan
                    </button>
                </div>
                </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}


export default PersForm;