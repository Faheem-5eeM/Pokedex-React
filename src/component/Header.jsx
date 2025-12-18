import pokeball from "../assets/pokeball.svg";

export default function Header() {
  return (
    <header className="header home">
      <div className="container">
        <div className="logo-wrapper">
          <img src={pokeball} alt="pokeball" />
          <h1>Pokédex</h1>
        </div>
      </div>
    </header>
  );
}
