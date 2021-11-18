import { Link } from "react-router-dom";
// import { useState } from "react";

const Header = ({ token, setUser }) => {
  return (
    <header>
      <div className="header-left">
        <Link to="/">
          <img
            src="https://www.thegeekgeneration.com/wp-content/uploads/2009/12/thumbnail-marvel-character-logo.jpg"
            alt="marvel logo"
            className="logo"
          />
        </Link>
        {/* <input
          type="text"
          className="searchBar"
          placeholder="Recherche"
          onChange={handleCharacters}
        /> */}
      </div>
      <div className="header-right">
        <div>
          <Link to="/">
            <button>Personnages</button>
          </Link>
          <Link to="/comics">
            <button>Comics</button>
          </Link>
          <Link to="/favorite">
            <button>Favoris</button>
          </Link>
        </div>
        {token ? (
          <div
            onClick={() => {
              setUser(null);
            }}
          >
            <button>Déconnexion</button>
          </div>
        ) : (
          <div>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>connexion</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
