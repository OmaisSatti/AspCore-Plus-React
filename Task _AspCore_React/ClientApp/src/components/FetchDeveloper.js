import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
export const FetchDeveloper = () => {
    const [formValues, setFormValues] = useState([{Name: "", Age: "", JobTitle: ""}]);
    const [devs, setDevs ] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    useEffect(() => { FetchDeveloper(); }, [])

    const addFormFields = () => {
        setFormValues([...formValues, { Name: "", Age: "", JobTitle: "" }]);
    }

    const handleChange = (i, e) => {
        e.preventDefault();
        let newformValues = [...formValues];
        newformValues[i][e.target.name] = e.target.value;
        setFormValues(newformValues);
        console.log(formValues);
    }
    const customStyles = {
        content: {
            top: '50%',
            width: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: '500px',
            overlfow: 'scroll'
        },
    };
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    Modal.setAppElement('#root');
    const FetchDeveloper = async ()=> {
        const response = await fetch('https://localhost:44373/Developer/GetAllDeveloper');
        const data = await response.json();
        setDevs(data)
    }
    const addDevelopers = async (e) => {
        /*e.preventDefault();*/
        const url = `https://localhost:44373/Developer/AddDeveloper`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues)
        });
        const json = await response.json();
        setFormValues([{ Name: "", Age: "", JobTitle: "" }]);
        setIsOpen(false);
        closeModal();
    }
    const deleteProduct = async (id) => {
        const url = `https://localhost:44373/Developer/DeleteDeveloper/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json()
        const newDeveloper = devs.filter((item) => { return item.id !== id })
        setDevs(newDeveloper);
    }
    const history = useHistory();
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form className="container my-3" id="mainform" onSubmit={(e) => addDevelopers(e)}>
                    <h4 className="text-danger flex" style={{ display: 'inline' }}>Add New Developer</h4>
                    <button type="button" className="btn btn-danger ml-2" onClick={()=>addFormFields()}>Add More</button>
                    {formValues.map((element, index) => (
                        <>
                            <h5>Developer {index+1}</h5>
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">Name</label>
                                <input type="text" className="form-control" value={element.Name} id="Name" name="Name" onChange={e =>handleChange(index, e)} required />
                            </div><div className="mb-3">
                                <label htmlFor="Age" className="form-label">Age</label>
                                <input type="text" className="form-control" id="Age" name="Age" value={element.Age} onChange={e =>handleChange(index, e)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="JobTitle" className="form-label">Job Title</label>
                                <input type="text" className="form-control" id="JobTitle" name="JobTitle" value={element.JobTitle} onChange={e =>handleChange(index, e)} required/>
                            </div>
                        </>
                    ))}
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        <button type="submit" className="btn btn-danger">Save</button>
                    </div>
                </form>
            </Modal>

            <h1 id="tabelLabel" >Developer Data List</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <button className="btn btn-outline-primary float-lg-end mb-2" onClick={openModal}>Add New</button>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>JobTitle</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {devs.map(dev =>
                        <tr key={dev.id}>
                            <td>{dev.name}</td>
                            <td>{dev.age}</td>
                            <td>{dev.jobTitle}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => history.push({ pathname: '/editdeveloper',state:dev })}>Edit</button> |
                                <button className="btn btn-danger" onClick={() => deleteProduct(dev.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
        );
}
