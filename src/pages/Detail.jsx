import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonDetail } from "../services/pokemonApi";

import backIcon from "../assets/back-to-home.svg";
import leftArrow from "../assets/chevron_left.svg";
import rightArrow from "../assets/chevron_right.svg";
import weightIcon from "../assets/weight.svg";
import heightIcon from "../assets/height.svg";
import pokedexBg from "../assets/pokedex.svg";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    getPokemonDetail(id).then(({ pokemon, species }) => {
      setPokemon(pokemon);
      setSpecies(species);
    });
  }, [id]);

  if (!pokemon) return null;

  return (
    <main className="detail-main main">
      <header className="header">
        <div className="header-wrapper">
          <div className="header-wrap">
            <img
              src={backIcon}
              className="back-btn"
              alt="back"
              onClick={() => navigate("/")}
            />
            <h1 className="name">{pokemon.name}</h1>
          </div>
          <p className="body2-fonts">
            #{String(pokemon.id).padStart(3, "0")}
          </p>
        </div>
      </header>

      {/* IMAGE + ARROWS */}
      <div className="featured-img">
        <a
          className={`arrow left-arrow ${
            pokemon.id === 1 ? "hidden" : ""
          }`}
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
          className={`arrow right-arrow ${
            pokemon.id === 151 ? "hidden" : ""
          }`}
          onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}
        >
          <img src={rightArrow} alt="next" />
        </a>
      </div>

      {/* CARD */}
      <div className="detail-card-detail-wrapper">
        <div className="power-wrapper">
          {pokemon.types.map((t) => (
            <p key={t.type.name} className="body3-fonts type">
              {t.type.name}
            </p>
          ))}
        </div>

        <p className="body2-fonts about-text">About</p>

        <div className="pokemon-detail-wrapper">
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail">
              <img src={weightIcon} />
              <p className="body3-fonts">{pokemon.weight / 10}kg</p>
            </div>
            <p className="caption-fonts">Weight</p>
          </div>

          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail">
              <img src={heightIcon} className="straighten" />
              <p className="body3-fonts">{pokemon.height / 10}m</p>
            </div>
            <p className="caption-fonts">Height</p>
          </div>
        </div>
      </div>

      <img src={pokedexBg} className="detail-bg" />
    </main>
  );
}
