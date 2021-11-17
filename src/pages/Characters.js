import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  // const [pic, setPic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get("http://localhost:4000/characters");
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoading ? (
    <div>Loading ...</div>
  ) : (
    <section>
      {/* {data.count} */}
      <main className="container">
        {data.results.map((item, index) => {
          // console.log(item._id);
          return (
            <Link to={`/comics/${item._id}`} state={{ comics: item.comics }}>
              <div key={index} className="char">
                <div>{item.name}</div>
                {/* <img src={item.thumbnail.path} alt="" /> */}
              </div>
            </Link>
          );
        })}
      </main>
    </section>
  );
};

export default Characters;
