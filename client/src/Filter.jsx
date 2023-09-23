import React from "react";

function Filter({filterPersonInput, setFilterPersonInput, setFilterPerson}) {

    const handleChangeFilter = (event) => {
        setFilterPersonInput(event.target.value)
        if(filterPersonInput !== "") {
          setFilterPerson(true)
        } 
    }

    return(
        <div>
            filter shown with <input onChange={handleChangeFilter}/>
        </div>
    )
}

export default Filter