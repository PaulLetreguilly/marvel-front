import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (token) {
      navigate("/favorite");
    } else {
      alert("Veuillez-vous connecter pour accéder aux favoris");
    }
  };

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

        <span onClick={() => handleClick()}>Favoris</span>
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
