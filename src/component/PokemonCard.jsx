export default function PokemonCard({ pokemon, onClick }) {
  const id = pokemon.url.split("/")[6];
  return (
    <div className="list-item" onClick={() => onClick(id)}>
      <div className="number-wrap">
        <p className="caption-fonts">#{id}</p>
      </div>

      <div className="img-wrap">
        <img
          src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt={pokemon.name}
        />
      </div>

      <div className="name-wrap">
        <p className="body3-fonts">{pokemon.name}</p>
      </div>
    </div>
  );
}
