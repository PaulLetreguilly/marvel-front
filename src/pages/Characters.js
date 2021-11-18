import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ library, faStar, faHeart, token }) => {
  const [data, setData] = useState();
  // const [pic, setPic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [characters, setCharacters] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const params = {};
      if (characters) {
        params.name = characters;
      }
      params.page = page;
      params.limit = limit;

      const fetchData = async () => {
        const response = await axios.get("http://localhost:4000/characters", {
          params: params,
        });
        setData(response.data);

        // console.log(response.data);
        setIsLoading(false);
      };
      fetchData();
      // console.log("my params :", params);
    } catch (error) {
      console.log(error.message);
    }
  }, [characters, page, limit]);

  const registerFav = async (favorite) => {
    try {
      // console.log(fav);
      // console.log("ahah");
      // console.log(token);
      // favorite.AccountToken = token;
      // console.log(FavChar);
      const resp = await axios.post(
        "http://localhost:4000/favorite/create",
        {
          favorite,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      // console.log("this was registered ===>", resp.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const maxPage = Math.round(data?.count / limit);
  // console.log(maxPage);

  const handleCharacters = (event) => {
    setCharacters(event.target.value);
  };

  const handleMinus = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handlePlus = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };
  const handleFavorite = (item) => {
    if (token) {
      registerFav(item);
    } else {
      alert("veuillez-vous connecter pour enregistrer des favoris");
    }
    // console.log(item._id);
  };

  return isLoading ? (
    <div>Loading ...</div>
  ) : (
    <section className="body">
      <div className="search">
        <input
          type="text"
          className="searchBar"
          placeholder="Recherche de personnage..."
          onChange={handleCharacters}
        />
        <span style={{ color: "red" }}>{data?.count} personnages trouvés</span>
        <span style={{ color: "red" }}>
          <button onClick={handleMinus}>-</button>page {page}
          <button onClick={handlePlus}>+</button>
        </span>
      </div>
      <main className="container">
        {data.results.map((item) => {
          return (
            // <Link to={`/comics/${item._id}`}>
            <div
              key={item._id}
              className="char"
              // onClick={() => navigate(`/comics/${item._id}`)}
            >
              <h3>{item.name}</h3>
              <div>
                <img
                  src={item.thumbnail.path + "." + item.thumbnail.extension}
                  alt=""
                  onClick={() => navigate(`/comics/${item._id}`)}
                />
                <FontAwesomeIcon
                  icon="star"
                  className="iconStar"
                  onClick={() => handleFavorite(item)}
                />
              </div>
              <p>{item.description}</p>
            </div>
            // </Link>
          );
        })}
      </main>
    </section>
  );
};

export default Characters;
