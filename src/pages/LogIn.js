import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LogIn = ({ setUser, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        // "https://my-api-marvel.herokuapp.com/login",
        "http://localhost:4000/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data?.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      if (error.response?.status === 401) {
        setError("Mauvais email/mot de passe");
      }
    }
  };

  const handleMail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <main className="body-log">
      <form className="form log" onSubmit={handleSubmit}>
        <h3>Se connecter</h3>
        <input
          className={error ? "red" : null}
          type="email"
          placeholder="email"
          onChange={handleMail}
        />
        <input
          className={error ? "red" : null}
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
        <div className="wrongmessage">{error}</div>
        <input type="submit" value="connexion" />
        <Link to="/signup" className="white">
          {" "}
          Pas encore de compte? Cliquez ici !
        </Link>
      </form>
    </main>
  );
};

export default LogIn;
