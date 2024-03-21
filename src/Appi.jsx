import './App.css';
import {useEffect, useState} from 'react'

function Appi () {
    const [nombrePokemon, setNombrePokemon] = useState("")
    const [foundPokemon, setFoundPokemon] = useState({})
    const [error, setError] = useState(true)

    useEffect(() => {
        async function fetchPokemon () {
            try {
                const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}/`)
                const pokemon = await pokemonData.json()
                setError(false)
                setFoundPokemon({name: pokemon.name, image: pokemon.sprites.front_default})
            } catch (error) {
                setError(true)
            }
        }
        fetchPokemon()
    },[nombrePokemon])

    return (
        <>
        <form>
            <label htmlFor="pokemonName">Nombre del pokemon: </label>
            <input id="pokemonName" name="pokemonName" onChange={(e) => setNombrePokemon(e.target.value)}/>
        </form>
        {nombrePokemon === "" ? <h2>Introduce un nombre</h2> : error===true ? (<h2>Pokemon no encontrado</h2>): (
        <div className='foundPokemon'>
            <h3>{foundPokemon.name.charAt(0).toUpperCase() + foundPokemon.name.slice(1)}</h3>
            <img src={foundPokemon.image}/>
        </div>)}
        </>
    )
};

export default Appi;