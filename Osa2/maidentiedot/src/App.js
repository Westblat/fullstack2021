import React, { useState, useEffect } from 'react'
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY

const CountrySpecificaiton = ({contry}) => {
    const [weather, setWeather] = useState({})

    useEffect(() =>{
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${contry.capital[0]}&appid=${api_key}`)
            .then(res => {
                if(!res.error) {
                    setWeather(res.data)
                }
            })
    }, [])

    return(
        <div>
            <h1>{contry.name.common}</h1>
            <p>Capital: {contry.capital[0]}</p>
            <p>Population: {contry.population}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(contry.languages).map((language, i) => {
                    return (
                        <li key={i}>{language}</li>
                    )
                })}
            </ul>
            <img src={contry.flags.png} alt={"Flag of the country"}/>
            <p>Temperature: {weather?.main?.temp} Kelvin</p>
            <p>Wind: {weather?.wind?.speed} m/s</p>
        </div>
    )
}
const CountriesList = ({countries}) => {
    const singleCountry = countries[0]
    const [showCountry, setShowCountry] = useState({})

    return (
        <div>
            {countries.length < 10  && countries.length !== 1 ? countries.map(country => {
                const name = country.name.common
                return (
                    <div key={name}>
                        {name}
                        <button onClick={
                            ()=> {
                                const copy = {...showCountry}
                                copy[name] = !showCountry[name]
                                setShowCountry(copy)
                            }}
                        >Show</button>
                        {showCountry[name] && (
                            <CountrySpecificaiton contry={country}/>
                        )}
                    </div>
                )
            }) : <p>
                Too many mathces, specify another filter
            </p>
            }
            {countries.length === 1 && (
                <CountrySpecificaiton contry={singleCountry}/>
            )}
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    const shownCountries = countries.filter(country => country.name.common.toLowerCase().includes(search))

    useEffect(()=>{
        axios.get('https://restcountries.com/v3.1/all').then(res =>{
            if (!res.error) {
                setCountries(res.data)
            }
        })
    },[])

    return (
        <div>
            Find countries: <input onChange={(e => setSearch(e.target.value))}/>
            <CountriesList countries={shownCountries}/>
      </div>
    )

}

export default App