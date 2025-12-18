const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async (limit = 151) => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  return res.json();
};

export const getPokemonDetail = async (id) => {
  const [pokemon, species] = await Promise.all([
    fetch(`${BASE_URL}/pokemon/${id}`).then((res) => res.json()),
    fetch(`${BASE_URL}/pokemon-species/${id}`).then((res) => res.json()),
  ]);

  return { pokemon, species };
};
