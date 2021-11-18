import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = ({ token, library, faStar, faHeart }) => {
  const [data, setData] = useState();
  const [comics, setComics] = useState("");
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

        // const resp = await axios.get(`http://localhost:4000/comics`);
        const resp = await axios.get(`http://localhost:4000/comics`, {
          params: params,
        });
        setData(resp.data);
        // console.log(resp.data, "heya");
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [comics, page, limit]);

  const registerFav = async (favorite) => {
    try {
      // console.log(token);
      // favorite.AccountToken = token;
      // console.log(FavChar);
      const resp = await axios.post(
        "http://localhost:4000/favorite/comic",
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

  const handleFavorite = (item) => {
    if (token) {
      registerFav(item);
    } else {
      alert("veuillez-vous connecter pour enregistrer des favoris");
    }
    // console.log(item._id);
  };

  const maxPage = Math.round(data?.count / limit);
  //   console.log(maxPage);

  const handleComics = (event) => {
    setComics(event.target.value);
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
          onChange={handleComics}
        />
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
