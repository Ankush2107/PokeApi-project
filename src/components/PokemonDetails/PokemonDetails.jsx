import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PokemonDetails() {
  const { pokemonName } = useParams();
  const [ pokemonDetails, setPokemonDetails ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    async function fetchPokemonDetails () {
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      console.log("res", response.data)
      setPokemonDetails(response.data);
      setLoading(false);
    }
    fetchPokemonDetails()
  }, [])
  return (
    <div className="pokemon-detail-container">
      <Link to="/" className="back-button">
        Back to List
      </Link>
      <div className="pokemon-detail-card">
        {/* Name */}
        <h2>{pokemonDetails?.name}</h2>
        {/* Image */}
        <img src={pokemonDetails?.sprites?.other?.dream_world?.front_default} alt={pokemonDetails?.name} />
        {/* Types */}
        <div className="details-section">
          <h3>Type</h3>
          <p>
            {pokemonDetails?.types?.map((t) => (t.type.name))}
          </p>
        </div>
        {/* Abilities */}
        <div className="details-section"> 
          <h3>Abilities</h3>
          <ul>
            {pokemonDetails?.abilities?.map(ability => (
              <li>
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
        {/* Stats */}
        <div className="details-section">
            <h3>Stats</h3>
            <ul>
              {pokemonDetails?.stats.map(statInfo => (
                <li>
                  {statInfo.stat.name}: {statInfo.base_stat}
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  )
}
export default PokemonDetails