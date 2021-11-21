import axios from "axios";
import { useEffect, useState } from "react";
import Favourite from "../components/Favourite";

const Comics = ({ token, library, faStar, faHeart }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [comics, setComics] = useState("");
  const [suggest, setSuggest] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {};
        if (comics) {
          params.title = comics;
        }
        params.page = page;
        params.limit = limit;

        const resp = await axios.get(
          `https://my-api-marvel.herokuapp.com/comics`,
          // "http://localhost:4000/comics",
          {
            params: params,
          }
        );
        setData(resp.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [comics, page, limit]);

  const handleSuggestion = (text) => {
    setComics(text);
  };

  const maxPage = Math.round(data?.count / limit);

  const handleComics = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = data.results.filter((comics) => {
        const regex = new RegExp(`${text}`, "gi");
        return comics.title.match(regex);
      });
    }
    setSuggest(matches);
    setComics(text);
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
    <section className="body-comics">
      <div className="search">
        <div className="search-left">
          {" "}
          <input
            type="text"
            className="searchBar"
            placeholder="Recherche de comics..."
            onChange={(event) => handleComics(event.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setSuggest([]);
              }, 200);
            }}
            value={comics}
          />
          <div className="suggestions contain-search">
            {suggest &&
              suggest.map((suggestion, i) => {
                return (
                  <div
                    key={i}
                    className="suggestion"
                    onClick={() => handleSuggestion(suggestion.title)}
                  >
                    {suggestion.title}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="search-right">
          {" "}
          <span style={{ color: "white" }}>{data?.count} comics trouvés</span>
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
          <span style={{ color: "white" }}>
            Combien d'articles voulez-vous afficher ?{" "}
            <input
              type="number"
              placeholder="100"
              onChange={(event) => setLimit(event.target.value)}
            />
          </span>
        </div>
      </div>
      <div className="container">
        {data?.results.map((item) => {
          return (
            <div className="contain-comics" key={item._id}>
              <h3>{item.title}</h3>
              <img
                src={item.thumbnail.path + "." + item.thumbnail.extension}
                alt=""
              />
              <p>{item.description}</p>
              <Favourite item={item} token={token} text="comic" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Comics;
