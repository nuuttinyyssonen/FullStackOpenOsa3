import React from "react";
import PhonebookService from "./PhonebookService";

function Persons({persons, setPersons, filterPersonInput}) {

    const deletePerson = (id, person) => {
        if(confirm("Delete " + person + " ?")) {
            PhonebookService.deleteRecord(id).then(response => {
                PhonebookService.getAll().then(persons => {
                    setPersons(persons)
                })
            })
        }
    }

    const personsMap = () => {
        if (persons !== undefined) {
          return persons.map((person, key) => (
            <div key={key}>
              <h3>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button></h3>
            </div>
          ));
        } else {
          return null; 
        }
    }

    const personsMapFiltered = () => {
        if(persons != undefined) {
            return persons.map((person, key) => {
            let testPerson = person.name.toLowerCase()
            if (testPerson.startsWith(filterPersonInput)) {
            return(
                <div key={key}>
                <h3>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></h3>
                </div>
            )
            }
        })
        }
    }

    return(
        <div>
            <h2>Numbers</h2>
            {filterPersonInput ? personsMapFiltered() : personsMap()}
        </div>
    )
}
export default Persons