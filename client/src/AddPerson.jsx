import React, { useState } from "react";
import { useEffect } from "react";
import PhonebookService from "./PhonebookService";
import './css/addPerson.css'

function AddPerson({persons, setPersons, newName, setNewName, newNumber, setNewNumber, filterPersonInput}) {

    const [successMessage, setSuccessMessage] = useState("Added " + newName)
    const [validationError, setValidationError] = useState("")
    const [validationErrorBoolean, setValidationErrorBoolean] = useState(false)
    const [personAdded, setPersonAdded] = useState(false)
    const [cathcError, setCatchError] = useState("")

    let newObj = {
        name: "",
        number: ""
    }

    useEffect(() => {
        PhonebookService.getAll().then(persons => {
            setPersons(persons)
        })
    }, [])


    const addPerson = (event) => {
        event.preventDefault()
        const nameExists = persons.some(person => person.name == newName)
        const phoneExists = persons.some(person => person.number == newNumber)

        if (nameExists || phoneExists) {
          if(confirm(newName + " is already added to phonebook, replace the old number with a new one?")) {

            PhonebookService.getId(newName)
                .then(id => {
                    newObj = {
                        name: newName,
                        number: newNumber
                    }
                
                    PhonebookService.update(id, newObj)
                        .then(reponse => {
                            PhonebookService.getAll()
                                .then(persons => {
                                    setPersons(persons)
                                })
                        })
                        .catch(err => {
                            if(err.response && err.response.status === 404) {
                                setCatchError("Information of " + newName + " has already been removed from server")
                            }
                        })
                })

          } else {
            alert(newName + " or " + newNumber + " is already added to phonebook")
          }

        } else {

            newObj = {
            name: newName,
            number: newNumber
            }

            PhonebookService.create(newObj)
                .then(person => {
                    PhonebookService.getAll().then(persons => {
                        console.log(persons)
                        setPersons(persons)
                        setPersonAdded(true)
                    })
                })
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.error) {
                        const errorMessage = error.response.data.error;
                        console.error(errorMessage); 
                        setValidationError(errorMessage);
                        setValidationErrorBoolean(true);
                    } else {
                        console.error(error); 
                    }
                })

        }
    }

    const handleChangeName = (event) => {
        setNewName(event.target.value)
    }
    
    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }
    
    
    return(
        <div>
            <form>
                <div>
                    name: <input onChange={handleChangeName}  value={newName}/>
                </div>
                <div>
                    phone: <input onChange={handleChangeNumber} value={newNumber}/>
                </div>
            <div>
                <button onClick={addPerson} type="submit">add</button>
            </div>
            </form>
            <br/>
            <h1 className="error">{validationErrorBoolean ? validationError : ""}</h1>
            <h1 className="success">{personAdded ? successMessage : ""}</h1>
            <h1 className="error">{cathcError}</h1>
        </div>
    )

}

export default AddPerson