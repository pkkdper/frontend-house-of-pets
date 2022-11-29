import React, { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/auth.context';




const Animal = (props) => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [size, setSize] = useState('')
    const [medical, setMedical] = useState('')
    const [passport, setPassport] = useState(false)
    const [vaccines, setVaccines] = useState(false)
    const [picture, setPicture] = useState('')
const {getToken, updateUser} = useContext(AuthContext)

// const [showanimal, setShowanimal] = useState(null)

    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = getToken()
        const response = await axios.post("http://localhost:5005/animals", {
            name,
            type,
            size,
            medical,
            passport,
            vaccines,
            picture
        },  {headers: { Authorization: `Bearer ${token}` }})
        // setShowanimal(event.target.value)
        updateUser()
        // const parsed = response.data;
        navigate('/auth/profile');
        // if (parsed.status === 200) {
        //   setToken(parsed.token);
        // } else {
        //   setError(parsed);
        // }
    };


    // function to update name of the animal
    const handleChange = (event) => {
        setName(event.target.value);
    }

    // function to update type of the animal
    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    // function to update size of the animal
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    }

    // function to update medical state of the animal
    const handleMedicalChange = (event) => {
        setMedical(event.target.value);
    }

    // function to update passport state of the animal
    const handlePassportChange = (event) => {
        setPassport(event.target.value);
    }

    // function to update vaccines state of the animal
    const handleVaccinesChange = (event) => {
        setVaccines(event.target.value);
    }

    // function to update picture state of the animal
    const handlePictureChange = (event) => {
        setPicture(event.target.value);
    }

    return (
        <div className="animal">
            <h4>Add Animal</h4>
            <form>
                <label>Name: </label>
                <input type="text" value={name} onChange={handleChange} />
                <label>
                    Type:
                </label>
                <input type="text" value={type} onChange={handleTypeChange} />
                <label>
                    Size:
                </label>
                <input type="text" value={size} onChange={handleSizeChange} />
                <label>
                    Medical:
                </label>
                <input type="text" value={medical} onChange={handleMedicalChange} />
                <label>
                    Passport:
                </label>
                <input type="checkbox" value={passport} onChange={handlePassportChange} />
                <label>
                    Vaccines:
                </label>
                <input type="checkbox" value={vaccines} onChange={handleVaccinesChange} />
                <label>
                    Picture:
                </label>
                <input id="picture" type="file" value={picture} onChange={handlePictureChange} />
                <input type="picture" value={picture} onChange={handlePictureChange} />
                <Link to="/profile"><button onClick={handleSubmit} className="btn" type="submit" >
                    Submit
                </button></Link>
            </form>
        </div>
    );
}

export default Animal;




































