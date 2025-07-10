import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>React PokeAPI Project</h1>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<PokemonList/>} />
            <Route path='/pokemon/:pokemonName' element={<PokemonDetails/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
export default App;