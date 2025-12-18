import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonDetail } from "../services/pokemonApi";

import backIcon from "../assets/back-to-home.svg";
import leftArrow from "../assets/chevron_left.svg";
import rightArrow from "../assets/chevron_right.svg";
import weightIcon from "../assets/weight.svg";
import heightIcon from "../assets/height.svg";
import pokedexBg from "../assets/pokedex.svg";

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

const statMap = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const [pokemon, setPokemon] = useState(null); //stores height , weight , types, stats
  const [species, setSpecies] = useState(null); //stores descriptions

  //Change title for each species
  useEffect(() => {
    if (!pokemon) return;
    document.title =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }, [pokemon]);

  //FETCH DATA 
  useEffect(() => {
    getPokemonDetail(id).then(({ pokemon, species }) => {
      setPokemon(pokemon);
      setSpecies(species);
    });
  }, [id]);

  const mainType = pokemon?.types?.[0]?.type?.name;
  const bgColor = mainType ? typeColors[mainType] : null;

  // ✅ BACKGROUND COLOR (HOOK ALWAYS RUNS)
  useEffect(() => {
    if (!bgColor) return;
    document.documentElement.style.setProperty("--identity-primary", bgColor);
  }, [bgColor]);

  // ✅ EARLY RETURN ONLY AFTER ALL HOOKS
  if (!pokemon || !species) return null;

  const description = species.flavor_text_entries
    .find((e) => e.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  return (
    <main className="detail-main main" style={{ backgroundColor: bgColor }}>
      {/* HEADER */}
      <header className="header">
        <div className="header-wrapper">
          <div className="header-wrap">
            <img
              src={backIcon}
              alt="back"
              className="back-btn"
              onClick={() => navigate("/")}
            />
            <div className="name-wrap">
              <h1 className="name">{capitalize(pokemon.name)}</h1>
            </div>
          </div>
          <div className="pokemon-id-wrap">
            <p className="body2-fonts">
              #{String(pokemon.id).padStart(3, "0")}
            </p>
          </div>
        </div>
      </header>

      {/* IMAGE + ARROWS */}
      <div className="featured-img">
        <a
          className={`arrow left-arrow ${pokemon.id === 1 ? "hidden" : ""}`}
          onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)}
        >
          <img src={leftArrow} alt="prev" />
        </a>

        <div className="detail-img-wrapper">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt={pokemon.name}
          />
        </div>

        <a
          className={`arrow right-arrow ${pokemon.id === 151 ? "hidden" : ""}`}
          onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}
        >
          <img src={rightArrow} alt="next" />
        </a>
      </div>

      {/* CARD */}
      <div className="detail-card-detail-wrapper">
        {/* TYPES */}
        <div className="power-wrapper">
          {pokemon.types.map(({ type }) => (
            <p
              key={type.name}
              className={`body3-fonts type ${type.name}`}
              style={{ backgroundColor: bgColor }}
            >
              {type.name}
            </p>
          ))}
        </div>

        <p className="body2-fonts about-text">About</p>

        {/* DETAILS */}
        <div className="pokemon-detail-wrapper">
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail">
              <img src={weightIcon} alt="weight" />
              <p className="body3-fonts">{pokemon.weight / 10}kg</p>
            </div>
            <p className="caption-fonts">Weight</p>
          </div>

          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail">
              <img src={heightIcon} className="straighten" alt="height" />
              <p className="body3-fonts">{pokemon.height / 10}m</p>
            </div>
            <p className="caption-fonts">Height</p>
          </div>

          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail move">
              {pokemon.abilities.map(({ ability }) => (
                <p key={ability.name} className="body3-fonts">
                  {ability.name}
                </p>
              ))}
            </div>
            <p className="caption-fonts">Move</p>
          </div>
        </div>

        <p className="body3-fonts pokemon-description">{description}</p>

        {/* BASE STATS — EXACT VANILLA */}
        <p className="body2-fonts about-text">Base Stats</p>

        <div className="stats-wrapper">
          {pokemon.stats.map(({ stat, base_stat }) => (
            <div className="stats-wrap" key={stat.name}>
              <p className="body3-fonts stats">{statMap[stat.name]}</p>
              <p className="body3-fonts">
                {String(base_stat).padStart(3, "0")}
              </p>
              <progress className="progress-bar" value={base_stat} max="100" />
            </div>
          ))}
        </div>
      </div>

      {/* BACKGROUND ICON */}
      <img src={pokedexBg} alt="pokedex" className="detail-bg" />
    </main>
  );
}
