import React, { useState } from 'react'
import axios from 'axios'


import {useNavigate} from 'react-router-dom'

function Student(props) {

    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [stud, setStud] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e)=> {
        e.preventDefault()
        axios.post('http://localhost:3001/stud', {name, age, stud})
        .then(result => {
            console.log(result)
            navigate('/details')
        })
        .catch(err => console.log(err))
    }

   
    

  return (
    <div>
        <h1>students database</h1>

        <form onSubmit={handleSubmit}>

        <div className="cont-fl">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Name' name='email' className='form-con-inp' onChange={(e) => setName(e.target.value)} />

        </div>

        <div className="cont-fl">
            <label htmlFor="age">Age</label>
            <input type="number" placeholder='age' name='email' className='form-con-inp' onChange={(e) => setAge(e.target.value)} />
        </div>

        <div className="cont-fl">
            <label htmlFor="studid">StudentId</label>
            <input type="text" placeholder='studid' name='email' className='form-con-inp' onChange={(e) => setStud(e.target.value)} />
        </div>

        <button type='submit' className='btn-stud'>Add Db</button>
        </form>


        <div className="props-cont-stu">
            <p>{props.name}</p>
        </div>
    </div>


    
  )
}

export default Student