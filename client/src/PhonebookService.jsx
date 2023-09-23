import axios from "axios"
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (obj) => {
    const request = axios.post(baseUrl, obj)
    return request.then(response => response.data)
}

const deleteRecord = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
} 

const update = (id, obj) => {
    const request = axios.put(`${baseUrl}/${id}`, obj)
    return request.then(response => response.data)
}

const getId = (name) => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        let persons = response.data
        for(let i = 0; i < persons.length; i++) {
            if(persons[i].name == name) {
                return persons[i].id
            }
        }
    })
}

export default {
    getAll: getAll,
    create: create,
    deleteRecord: deleteRecord,
    update: update,
    getId: getId
}