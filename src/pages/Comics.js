import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

const Comics = ({ token, library, faStar, faHeart }) => {
  const [data, setData] = useState();
  const [comics, setComics] = useState("");
  const [suggest, setSuggest] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {};
        if (comics) {
          params.title = comics;
        }
        params.page = page;
        params.limit = limit;

        // const resp = await axios.get(`http://localhost:4000/comics`);
        const resp = await axios.get(
          `https://my-api-marvel.herokuapp.com/comics`,
          {
            params: params,
          }
        );
        setData(resp.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [comics, page, limit]);

  const registerFav = async (favorite) => {
    try {
      const resp = await axios.post(
        "https://my-api-marvel.herokuapp.com/favorite/comic",
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
  const handleSuggestion = (text) => {
    setComics(text);
  };

  const handleFavorite = (item) => {
    if (token) {
      registerFav(item);
      alert("Comics enregistré en favori !");
    } else {
      alert("veuillez-vous connecter pour enregistrer des favoris");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
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

  return (
    <section className="body-comics">
      <div className="search">
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
        <span style={{ color: "red" }}>{data?.count} comics trouvés</span>
        <span>
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
              <FontAwesomeIcon
                icon="heart"
                className="iconHeart"
                onClick={() => handleFavorite(item)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Comics;
