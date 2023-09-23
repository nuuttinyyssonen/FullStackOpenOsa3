import { useState, useEffect } from 'react'
import AddPerson from './AddPerson'
import Persons from './Persons'
import Filter from './Filter'


function App() {

  const [persons, setPersons] = useState()
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState(false)
  const [filterPersonInput, setFilterPersonInput] = useState("")

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      filterPersonInput={filterPersonInput}
      setFilterPersonInput={setFilterPersonInput}
      setFilterPerson={setFilterPerson}
      />
      <AddPerson 
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        filterPersonInput={filterPersonInput}
      />
      <Persons 
        persons={persons}
        filterPersonInput={filterPersonInput}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App
