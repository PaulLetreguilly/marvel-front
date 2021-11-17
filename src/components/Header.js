import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [characters, setCharacters] = useState("");

  const handleCharacters = (event) => {
    setCharacters(event.target.value);
  };

  return (
    <header>
      <div className="header-left">
        <Link to="/">
          <img
            src="https://www.thegeekgeneration.com/wp-content/uploads/2009/12/thumbnail-marvel-character-logo.jpg"
            alt="marvel logo"
            class="logo"
          />
        </Link>
        <input
          type="text"
          className="searchBar"
          placeholder="Recherche"
          onChange={handleCharacters}
        />
      </div>
      <div className="header-right">
        <div>
          <Link to="/">
            <button>Personnages</button>
          </Link>
          <Link to="/comics">
            <button>Comics</button>
          </Link>
          <Link to="/">
            <button>Favoris</button>
          </Link>
        </div>
        <div>
          <button>connexion</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
