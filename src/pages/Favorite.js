import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Favorite = ({ token }) => {
  const [data, setData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [character, setCharacter] = useState(true);

  useEffect(() => {
    const fetchFav = async () => {
      try {
        if (character) {
          const response = await axios.get(
            "http://localhost:4000/favorite/character",
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(token);
          // console.log(response.data);
          setData(response.data);
        } else {
          const response = await axios.get(
            "http://localhost:4000/favorite/comic",
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(token);
          // console.log(response.data);
          setData(response.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFav();
  }, [refresh, character]);

  const FavDelete = async (idToDelete) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/character/delete",
        { id: idToDelete }
      );
      setRefresh(!refresh);
    } catch (error) {
      console.log();
    }
  };

  return token && character ? (
    <section>
      <h2 className="yourFavorites"> Vos favoris :</h2>
      <div className="choice">
        <span onClick={() => setCharacter(true)}>Personnages</span>
        <span onClick={() => setCharacter(false)}>Comics</span>
      </div>
      <div className="fav-charac">
        {data?.map((elem) => {
          return (
            <div key={elem._id} className="favorites">
              <div>{elem.favorite.name}</div>

              <img
                src={
                  elem.favorite.thumbnail.path +
                  "." +
                  elem.favorite.thumbnail.extension
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
    <section>
      <h2 className="yourFavorites"> Vos favoris :</h2>
      <div className="choice">
        <span onClick={() => setCharacter(true)}>Personnages</span>
        <span onClick={() => setCharacter(false)}>Comics</span>
      </div>
      <div className="fav-charac">
        {data?.map((elem) => {
          return (
            <div key={elem._id} className="favorites">
              <div>{elem.favorite.name}</div>

              <img
                src={
                  elem.favorite.thumbnail.path +
                  "." +
                  elem.favorite.thumbnail.extension
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
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorite;
