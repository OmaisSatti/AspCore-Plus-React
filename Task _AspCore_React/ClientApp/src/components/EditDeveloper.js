import React, { useState,useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
export const EditDeveloper = () => {
    const [dev, setDev] = useState({ id:"", name:"", age:"", jobTitle:"" })
    const onChange = (e) => {
        setDev({ ...dev, [e.target.name]: e.target.value })
    }
    let history = useHistory();
    const backToList = () => {
        history.push('/developer');
    }
    useEffect(() => { setDev({ id: location.state.id, name: location.state.name, age: location.state.age, jobTitle: location.state.jobTitle })},[])
    const location = useLocation();

    const editDeveloper = async (e) => {
        e.preventDefault();
        const response = await fetch('https://localhost:44373/Developer/UpdateDeveloper', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dev)
        });
        const json = response.json();
        console.log(JSON.stringify(json));
        backToList();
    }
    return (
        <div className='container' style={{ width: '60%' }}>
            <form className="container my-3" onSubmit={editDeveloper}>
                <h2 className="text-danger">Update Developer Data</h2>
                <div className="mb-3">
                    <input type="hidden" className="form-control" value={dev.id} id="name" name="name" />
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="" className="form-control" value={dev.name} id="name" name="name" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="color" className="form-label">Age</label>
                    <input type="text" className="form-control" id="age" name="age" value={dev.age} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Job Title</label>
                    <input type="text" className="form-control" id="jobTitle" name="jobTitle" value={dev.jobTitle} onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-danger">Update</button>
                <button type="button" className="btn btn-outline-primary" style={{ marginLeft: 10 }} onClick={backToList}>Back To List</button>
            </form>
        </div>
        );
}
 