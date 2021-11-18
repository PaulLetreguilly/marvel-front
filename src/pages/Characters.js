import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ library, faStar, faHeart, token }) => {
  const [data, setData] = useState();
  // const [pic, setPic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [characters, setCharacters] = useState("");
  const [suggest, setSuggest] = useState([]);

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
      const resp = await axios.post(
        "http://localhost:4000/favorite/character",
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const maxPage = Math.round(data?.count / limit);

  const handleSuggestion = (text) => {
    setCharacters(text);
  };

  const handleCharacters = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = data.results.filter((heroes) => {
        const regex = new RegExp(`${text}`, "gi");
        return heroes.name.match(regex);
      });
    }
    setSuggest(matches);
    setCharacters(text);
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
          onChange={(event) => handleCharacters(event.target.value)}
          value={characters}
          onBlur={() => {
            setTimeout(() => {
              setSuggest([]);
            }, 200);
          }}
        />
        <div className="suggestions contain-search">
          {suggest &&
            suggest.map((suggestion, i) => {
              return (
                <div
                  key={i}
                  className="suggestion"
                  onClick={() => handleSuggestion(suggestion.name)}
                >
                  {suggestion.name}
                </div>
              );
            })}
        </div>
        {/* {suggest &&
          suggest.map((suggestion, i) => {
            return (
              <div
                key={i}
                className="suggestion"
                onClick={() => handleSuggestion(suggestion.name)}
              >
                {suggestion.name}
              </div>
            );
          })} */}
        <span style={{ color: "red" }}>{data?.count} personnages trouvés</span>
        <span style={{ color: "red" }}>
          <button onClick={handleMinus}>-</button>page {page}
          <button onClick={handlePlus}>+</button>
        </span>
        <span style={{ color: "red" }}>
          Combien d'articles voulez-vous afficher ?{" "}
          <input
            type="number"
            placeholder="100"
            onChange={(event) => setLimit(event.target.value)}
          />
        </span>
      </div>
      <main className="container">
        {data?.results.map((item) => {
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
