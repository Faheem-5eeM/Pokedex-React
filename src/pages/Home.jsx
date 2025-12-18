import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import PokemonList from "../component/PokemonList";
import { getPokemons } from "../services/pokemonApi";

import searchIcon from "../assets/search.svg";
import crossIcon from "../assets/cross.svg";
import sortIcon from "../assets/sorting.svg";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("name");
  const [showSort, setShowSort] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getPokemons().then((data) => setPokemons(data.results));
  }, []);

  const filtered = pokemons.filter((p) => {
    const id = p.url.split("/")[6];
    return filter === "number"
      ? id.startsWith(search)
      : p.name.toLowerCase().startsWith(search.toLowerCase());
  });

  return (
    <main className="main">
      <header className="header home">
        <div className="container">
          <Header />

          {/* SEARCH */}
          <div className="search-wrapper">
            <div className="search-wrap">
              <img src={searchIcon} className="search-icon" alt="search" />

              <input
                type="text"
                className="search-input body3-fonts"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <img
                  src={crossIcon}
                  className="search-close-icon search-close-icon-visible"
                  alt="clear"
                  onClick={() => setSearch("")}
                />
              )}
            </div>

            {/* SORT */}
            <div className="sort-wrapper">
              <div className="sort-wrap" onClick={() => setShowSort(!showSort)}>
                <img src={sortIcon} className="sort-icon" alt="sort" />
              </div>

              <div
                className={`filter-wrapper ${
                  showSort ? "filter-wrapper-open" : ""
                }`}
              >
                <p className="body2-fonts">Sort by:</p>
                <div className="filter-wrap">
                  <div>
                    <input
                      type="radio"
                      checked={filter === "number"}
                      onChange={() => setFilter("number")}
                    />
                    <label className="body3-fonts">Number</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      checked={filter === "name"}
                      onChange={() => setFilter("name")}
                    />
                    <label className="body3-fonts">Name</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* LIST */}
      <section className="pokemon-list">
        <div className="container">
          <PokemonList
            pokemons={filtered}
            onSelect={(id) => navigate(`/pokemon/${id}`)}
          />
        </div>

        {filtered.length === 0 && (
          <div id="not-found-message">Pokemon not found</div>
        )}
      </section>
    </main>
  );
}
