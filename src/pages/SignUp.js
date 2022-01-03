import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LogIn = ({ setUser, token }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (password === confirmPassword) {
        const response = await axios.post(
          // "https://my-api-marvel.herokuapp.com/signup",
          "http://localhost:4000/signup",
          {
            username: username,
            email: email,
            password: password,
          }
        );
        setWrongPassword(false);
        if (response.data?.token) {
          setUser(response.data.token);
          navigate("/");
        }
      } else {
        setWrongPassword(true);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response?.status === 409) {
        setError("Cet email n'est pas disponible");
      } else if (error.response?.status === 400) {
        setError("Il manque des informations");
      }
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleMail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirm = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <main className="body-log">
      <form className="form sign" onSubmit={handleSubmit}>
        <h3>Se connecter</h3>
        <input type="text" placeholder="username" onChange={handleUsername} />
        <input
          type="email"
          placeholder="email"
          onChange={handleMail}
          className={error ? "wrongmessage" : null}
        />
        <input
          className={wrongPassword ? "wrong" : "norm"}
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
        <input
          className={wrongPassword ? "wrong" : "norm"}
          type="password"
          placeholder="confirm password"
          onChange={handleConfirm}
        />
        <div className="wrongmessage">
          {wrongPassword && "veuillez rentrer deux fois le même mot de passe"}
        </div>
        <div className="wrongmessage">{error}</div>
        <input type="submit" />
        <Link to="/login" className="white">
          {" "}
          Déjà un compte? Cliquez ici !
        </Link>
      </form>
    </main>
  );
};

export default LogIn;
