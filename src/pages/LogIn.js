import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const LogIn = ({ setUser, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://my-api-marvel.herokuapp.com/login",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.data);
      if (response.data?.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      // console.log(error.message);
      // console.log(error.response);
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
    <main>
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
        <div className="error">{error}</div>
        <input type="submit" />
      </form>
    </main>
  );
};

export default LogIn;
