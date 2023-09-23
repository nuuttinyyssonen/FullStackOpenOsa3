const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'))

app.get('/', (req, res) => {
    res.send("Hellloooooooo")
})

let phonebook = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    }, 
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.send(phonebook)
})


app.get('/info', (req, res) => {
    const d = new Date()
    res.send("Phonebook has info for " + phonebook.length + " people \n" + d)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const phonebookRecord = phonebook.find(phonebook => phonebook.id === id)
    console.log(phonebookRecord)
    res.send(phonebookRecord)
})


app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(phonebook => phonebook.id !== id)
    res.status(204).end()
})


app.post('/api/persons', (req, res) => {
    let id = Math.floor(Math.random() * 25)
    console.log(req.body)
    const body = req.body
    if(!body.name || !body.number) {
        return res.status(400).json({
            error: "missing content"
        })
    }
    const isNameInPhonebook = phonebook.some(person => person.name === body.name)
    if(isNameInPhonebook) {
        return res.status(400).json({
            error: "This name is already in phonebook"
        })
    }
    let person = {
        id:id,
        name: body.name,
        number: body.number
    }
    phonebook = phonebook.concat(person)
    res.json(phonebook)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})