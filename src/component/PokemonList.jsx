import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemons, onSelect }) {
  return (
    <div className="list-wrapper">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} onClick={onSelect} />
      ))}
    </div>
  );
}
