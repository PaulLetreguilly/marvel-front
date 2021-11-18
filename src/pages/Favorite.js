import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Favorite = ({ token }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const response = await axios.get("http://localhost:4000/favorite", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        // console.log(token);
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFav();
  }, []);

  return token ? (
    <section>
      <h2 className="yourFavorites"> Vos favoris :</h2>
      <div className="fav-charac">
        {data?.map((elem) => {
          return (
            <div key={elem._id}>
              <div>{elem.favorite.name}</div>
              <img
                src={
                  elem.favorite.thumbnail.path +
                  "." +
                  elem.favorite.thumbnail.extension
                }
                alt=""
              />
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
