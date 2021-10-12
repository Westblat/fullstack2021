import React, { useState, useEffect } from 'react'
import personsService from "./services/persons";
import './app.css'


const Filter = ({filter, setFilter}) => {
    return (<div>
        filter shown with <input onChange={(e) => setFilter(e.target.value)}/>
    </div>)
}

const PersonForm =({ setPersons, persons, setErrorMessage, setSuccessMessage}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    return(
        <form>
            <h1> Add new person</h1>
            <div>
                name: <input onChange={(e) => setNewName(e.target.value)}/>
            </div>
            <div>
                number: <input onChange={(e) => setNewNumber(e.target.value)}/>
            </div>

            <div>
                <button type="sumbit" onClick={(e) => {
                    e.preventDefault();
                    if(persons.find(e => e.name === newName)){
                        console.log(newNumber, newName)
                        if(window.confirm(`User with name ${newName} exists already, do you want to replace old number?`)){
                            console.log(persons.filter(obj => obj.name === newName))
                            const updatedPerson = persons.filter(obj => obj.name === newName)[0]
                            personsService.update(updatedPerson.id, {name: newName, number: newNumber})
                                .then((res) => {
                                    const copy = persons.filter(obj => obj.id !== updatedPerson.id)
                                    setPersons([...copy, res.data])
                                    setSuccessMessage("User updated succesfully")
                                    setTimeout(() => {
                                        setSuccessMessage(null)
                                    }, 5000)
                                }).catch(err => {
                                    setErrorMessage("This user was already deleted from server")
                                    setTimeout(() => {
                                        setErrorMessage(null)
                                    }, 5000)
                            })
                        }
                    } else {
                        personsService.create({name: newName, number: newNumber})
                            .then(res => {
                                setPersons([...persons, res.data])
                                setSuccessMessage("User added succesfully")
                                setTimeout(() => {
                                    setSuccessMessage(null)
                                }, 5000)

                            })
                    }

                }}>add</button>
            </div>
        </form>
    )
}

const Persons = ({shownNames, setPersons, persons, setErrorMessage, setSuccessMessage}) => {
    return (
        <div>
            {shownNames?.map((person, i) => {
                return (
                    <div key={i}>
                        <span>{person.name} {person.number}</span>
                        <button onClick={(e)=> {
                            if(window.confirm(`Delete ${person.name} ?`)){
                                personsService.deleteObject(person.id)
                                    .then((res) => {
                                        setPersons(persons.filter(value => value.id !== person.id))
                                        setSuccessMessage("User deleted succesfully")
                                        setTimeout(() => {
                                            setSuccessMessage(null)
                                        }, 5000)

                                    }).catch(err => {
                                    setErrorMessage("This user was already deleted from server")
                                    setTimeout(() => {
                                        setErrorMessage(null)
                                    }, 5000)
                                })
                            }
                        }}>Delete</button>
                    </div>
                    )
            })}

        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(()=>{
        personsService.getAll()
            .then(res =>{
                if (!res.error) {
                    setPersons(res.data)
                }
        })
    },[])

    const shownNames = persons.filter(person => person.name.includes(filter))

    return (
        <div>
            <h2>Phonebook</h2>
            {successMessage && <p className='success'>{successMessage}</p>}
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <Filter setFilter={setFilter}/>
            <PersonForm
                persons={persons}
                setPersons={setPersons}
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
            />
        <h2>Numbers</h2>
            <Persons
                shownNames={shownNames}
                persons={persons}
                setPersons={setPersons}
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
            />
      </div>
    )

}

export default App;