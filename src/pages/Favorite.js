import { Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Favorite = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setisLoading] = useState(true);

  const [refresh, setRefresh] = useState(false);
  const [character, setCharacter] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFav = async () => {
      try {
        if (character) {
          const response = await axios.get(
            "https://my-api-marvel.herokuapp.com/favorite/character",
            // "http://localhost:4000/favorite/character",
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setData(response.data);
          setisLoading(false);
        } else {
          const response = await axios.get(
            "https://my-api-marvel.herokuapp.com/favorite/comic",
            // "http://localhost:4000/favorite/comic",
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setData(response.data);
          setisLoading(false);
        }
        console.log();
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFav();
  }, [refresh, character, token]);

  const FavDelete = async (idToDelete) => {
    try {
      const response = await axios.post(
        "https://my-api-marvel.herokuapp.com/character/delete",
        // "http://localhost:4000/character/delete",
        { id: idToDelete }
      );
      setRefresh(!refresh);
    } catch (error) {
      console.log(error.message);
    }
  };
  const ComicDelete = async (idToDelete) => {
    try {
      const response = await axios.post(
        "https://my-api-marvel.herokuapp.com/comic/delete",
        // "http://localhost:4000/comic/delete",
        {
          id: idToDelete,
        }
      );
      setRefresh(!refresh);
    } catch (error) {
      console.log();
    }
  };

  return isLoading ? (
    <div className="body-load">
      <div className="loading">Loading ...</div>
    </div>
  ) : token && character ? (
    <section className="body-fav">
      <h2 className="yourFavorites"> Vos favoris :</h2>
      <div className="choice">
        <span
          onClick={() => setCharacter(true)}
          className={character ? "switchOn" : "switchOff"}
        >
          Personnages
        </span>
        <span
          onClick={() => setCharacter(false)}
          className={character ? "switchOff" : "switchOn"}
        >
          Comics
        </span>
      </div>
      <div className="fav-charac">
        {data?.map((elem) => {
          return (
            <div key={elem._id} className="favorites">
              <div>{elem.favorite.name}</div>

              <img
                src={
                  elem.favorite.thumbnail?.path +
                  "." +
                  elem.favorite.thumbnail?.extension
                }
                alt=""
              />
              <span className="fav-delete" onClick={() => FavDelete(elem._id)}>
                X
              </span>
            </div>
          );
        })}
      </div>
    </section>
  ) : token && !character ? (
    <section className="body-fav">
      <h2 className="yourFavorites"> Vos favoris :</h2>
      <div className="choice">
        <span
          onClick={() => setCharacter(true)}
          className={character ? "switchOn" : "switchOff"}
        >
          Personnages
        </span>
        <span
          onClick={() => setCharacter(false)}
          className={character ? "switchOff" : "switchOn"}
        >
          Comics
        </span>
      </div>
      <div className="fav-charac">
        {data?.map((elem) => {
          return (
            <div key={elem._id} className="favorites">
              <div>{elem.favorite.title}</div>

              <img
                src={
                  elem.favorite.thumbnail.path +
                  "." +
                  elem.favorite.thumbnail.extension
                }
                alt=""
              />
              <span
                className="fav-delete"
                onClick={() => ComicDelete(elem._id)}
              >
                X
              </span>
            </div>
          );
        })}
        <div className="someSpace"></div>
      </div>
    </section>
  ) : (
    <Navigate to="/login" />
    // navigate("/login")
  );
};

export default Favorite;
