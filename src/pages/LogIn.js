import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const LogIn = ({ setUser, token }) => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:4000/login", {
        email: email,
        password: password,
      });
      // console.log(response.data);
      if (response.data?.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return login ? (
    <div>S'inscrire</div>
  ) : (
    <main>
      <div>Se connecter (On progress ...)</div>
      <form className="form log" onSubmit={handleSubmit}>
        <h3>Se connecter</h3>
        <input type="email" placeholder="email" onChange={handleMail} />
        <input
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
        <input type="submit" />
      </form>
    </main>
  );
};

export default LogIn;
