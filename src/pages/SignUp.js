import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

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
          "https://my-api-marvel.herokuapp.com/signup",
          {
            username: username,
            email: email,
            password: password,
          }
        );
        setWrongPassword(false);
        // console.log(response.data);
        if (response.data?.token) {
          setUser(response.data.token);
          navigate("/");
        }
      } else {
        setWrongPassword(true);
      }
    } catch (error) {
      //   console.log(error.message);
      //   console.log(error.response);
      if (error.response?.status === 409) {
        setError("Cet email n'est pas disponible");
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
    <main>
      {/* <div>S'inscrire (On progress ...)</div> */}
      <form className="form sign" onSubmit={handleSubmit}>
        <h3>Se connecter</h3>
        <input type="text" placeholder="username" onChange={handleUsername} />
        <input
          type="email"
          placeholder="email"
          onChange={handleMail}
          className={error ? "wrongmessage" : null}
        />
        <div className="error">{error}</div>
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
        <input type="submit" />
      </form>
    </main>
  );
};

export default LogIn;
