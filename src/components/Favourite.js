import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Favourite = ({ item, token, text }) => {
  const [data, setData] = useState();

  const [checkChar, setCheckChar] = useState(false);

  const navigate = useNavigate();
  const list = [];
  // const tab = localStorage.getItem("Favorites")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-api-marvel.herokuapp.com/favorite/${text}`,
          // `http://localhost:4000/favorite/${text}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  if (text === "character") {
    // localStorage.setItem("favorite", "item.name")
  } else if (text === "comic") {
    // localStorage.setItem("favorite", "item.title")
  }

  const handleClick = async (item) => {
    if (token) {
      if (item.name) {
        // localStorage.getItem() ? "" : ""
        if (list.indexOf(item.name) === -1) {
          list.push(item.name);
          console.log(list);
          item.liked = true;
          const resp = await axios.post(
            `https://my-api-marvel.herokuapp.com/favorite/${text}`,
            // `http://localhost:4000/favorite/${text}`,
            { item },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          setCheckChar(true);
          alert("Personnage enregistré en favoris !");
        } else {
          setCheckChar(true);
          alert("Personnage déjà en favoris");
        }
      } else if (item.title) {
        if (list.indexOf(item.title) === -1) {
          list.push(item.title);
          console.log(list);
          item.liked = true;
          const resp = await axios.post(
            `https://my-api-marvel.herokuapp.com/favorite/${text}`,
            // `http://localhost:4000/favorite/${text}`,
            { item },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          setCheckChar(true);
          alert("Comics enregistré en favoris !");
        } else {
          setCheckChar(true);
          alert("Comics déjà en favoris");
        }
      }
    } else {
      alert("veuillez-vous connecter pour enregistrer des favoris");
      setTimeout(() => {
        navigate("/login");
      }, 200);
    }
  };

  return (
    <FontAwesomeIcon
      icon="heart"
      className={checkChar ? "iconStar" : "starIcon"}
      onClick={() => handleClick(item)}
    />
  );
};

export default Favourite;
