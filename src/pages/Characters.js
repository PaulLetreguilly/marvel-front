import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Favourite from "../components/Favourite";

const Characters = ({ library, faStar, faHeart, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [characters, setCharacters] = useState("");
  const [suggest, setSuggest] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {};
        if (characters) {
          params.name = characters;
        }
        params.page = page;
        params.limit = limit;

        const response = await axios.get(
          "https://my-api-marvel.herokuapp.com/characters",
          // "http://localhost:4000/characters",
          {
            params: params,
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characters, page, limit]);

  const maxPage = Math.round(data?.count / limit);

  const handleSuggestion = (text) => {
    setCharacters(text);
  };

  const handleCharacters = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = data.results.filter((charac) => {
        const regex = new RegExp(`${text}`, "gi");
        return charac.name.match(regex);
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

  return isLoading ? (
    <div className="body-load">
      <div className="loading">Loading ...</div>
    </div>
  ) : (
    <section className="body">
      <div className="search">
        <div className="search-left">
          {" "}
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
        </div>
        <div className="search-right">
          <span style={{ color: "white" }}>
            <span className="count">{data?.count}</span> personnages trouvés
          </span>
          <span style={{ color: "white" }}>
            <button
              onClick={handleMinus}
              className={page > 1 ? null : "invisible"}
            >
              -
            </button>
            page {page}
            <button onClick={handlePlus}>+</button>
          </span>
          <span style={{ color: "white" }} className="option1">
            Combien d'articles voulez-vous afficher ?{" "}
            <input
              type="number"
              placeholder="100"
              onChange={(event) => setLimit(event.target.value)}
            />
          </span>
          <span style={{ color: "white" }} className="option2">
            nombres d'articles :
            <input
              type="number"
              placeholder="100"
              onChange={(event) => setLimit(event.target.value)}
            />
          </span>
        </div>
      </div>
      <main className="container">
        {data?.results.map((item) => {
          return (
            <div key={item._id} className="char">
              <h3>{item.name}</h3>
              <div>
                <img
                  src={item.thumbnail.path + "." + item.thumbnail.extension}
                  alt=""
                  onClick={() => navigate(`/comics/${item._id}`)}
                />
                <Favourite item={item} token={token} text="character" />
              </div>
              <p>{item.description}</p>
            </div>
          );
        })}
      </main>
    </section>
  );
};

export default Characters;
