import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [stud, setStud] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then((result) => {
                console.log(result);
                setName(result.data.name);
                setAge(result.data.age);
                setStud(result.data.stud);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/update/${id}`, { name, age, stud })
            .then((result) => {
                console.log(result);
                navigate('/details');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <h2>Update User</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="stud">StudId</label>
                    <input
                        type="text"
                        placeholder="Enter StudId"
                        value={stud}
                        onChange={(e) => setStud(e.target.value)}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Update;
