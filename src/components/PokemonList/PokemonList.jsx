import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PokemonList.css";
function PokemonList() {
    const [ allPokemons, setAllPokemons ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ loading, setLoading ] = useState(false);
    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon")
                let pokemonList = response.data.results;
                const pokemonDetailPromises = pokemonList.map(pokemon => axios.get(pokemon.url));
                const pokemonDetailResponse = await Promise.all(pokemonDetailPromises);
                const pokemonWithDetails = pokemonDetailResponse.map(response => {
                    const pokemonData = response.data;
                    return {
                        id: pokemonData.id,
                        name: pokemonData.name,
                        imageUrl: pokemonData.sprites.other.dream_world.front_default,
                        height: pokemonData.height,
                        weight: pokemonData.weight,
                        type: pokemonData.types.filter(ele => ele.type.name)
                    }
                })
                console.log(pokemonWithDetails)
                setAllPokemons(pokemonWithDetails)
                setLoading(false)
            } catch (error) {
                console.error("Something went wrong in the pokemon list", error)
                setLoading(false);
            }
        }
        fetchPokemons();
    }, [])

    const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredPokemons)

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        if(loading){
            return <p>Loading pokemons ...</p>
        }
    }
  return (
    <div className="pokemon-list-container">
      <input type="text" placeholder="Search pokemon by name..." value={searchTerm} onChange={handleSearchChange} className="search-bar" />

      <div className="pokemon-grid">
        {filteredPokemons.map(pokemon => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name} className="pokemon-card" >
                <img src={pokemon.imageUrl} alt={pokemon.name} />
                {pokemon.type.map((ele) => (
                    <p>{ele.name}</p>
                ) )}
                <p>{pokemon.name.charAt(0).toUpperCase() +  pokemon.name.slice(1)}</p>
                <p>height: {pokemon.height}</p>
                <p>weight: {pokemon.weight}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default PokemonList;