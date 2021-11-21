import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
// import { useState } from "react";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-left">
        <Link to="/">
          <img
            src="https://lereacteur-marvel-api.netlify.app/static/media/logo.ad6c786b.svg"
            alt="marvel logo"
            className="logo"
          />
        </Link>
      </div>
      <div className="header-mid">
        <span onClick={() => navigate("/")}>Personnages</span>

        <span onClick={() => navigate("/comics")}>Comics</span>

        <span onClick={() => navigate("/favorite")}>Favoris</span>
      </div>
      <div className="header-right">
        {token ? (
          <div>
            <span
              className="wrongmessage"
              onClick={() => {
                setUser(null);
              }}
            >
              Déconnexion
            </span>
          </div>
        ) : (
          <div className="log-buttons">
            <span onClick={() => navigate("/signup")}>S'inscrire</span>
            <span onClick={() => navigate("/login")}>connexion</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
