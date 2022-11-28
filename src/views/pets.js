
import React, { useState, useContext } from "react";




function PetsPage() {

    // const { setToken } = useContext(SessionContext);
    // const [Petname, setPetname] = useState("");
    // const [Breed, setBreed] = useState("");
    // const [MedicalConditions, setMedicalConditions] = useState("");
    // const [Age, setAge] = useState("");
    // const [error, setError] = useState();

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const response = await axios.post("http://localhost:5005/pets", {
    //         Petname,
    //         Breed,
    //         MedicalConditions,
    //         Age,
    //     });
    //     console.log(response.data);

    //     const parsed = response.data;

    //     if (parsed.status === 200) {
    //         setToken(parsed.token);
    //     } else {
    //         setError(parsed);
    //     }
    // };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Petname:
                <input type="text" value={Petname} onChange={handleChange} />
            </label>
            <label>
                Breed:
                <input type="text" value={Breed} onChange={handleChange} />
            </label>
            <label>
                MedicalConditions:
                <input type="text" value={MedicalConditions} onChange={handleChange} />
            </label>
            <label>
                Age:
                <input type="text" value={Age} onChange={handleChange} />
            </label>
            <button type="submit">Create pet profile</button>
        </form>
    );
};

export default PetsPage;








