import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const resp = await axios.get(`http://localhost:4000/comics`);
        const resp = await axios.get(`http://localhost:4000/comics`);
        setData(resp.data);
        console.log(resp.data, "heya");
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <section>
      <div className="container">
        {data?.results.map((item) => {
          return (
            <div className="contain-comics">
              <h3>{item.title}</h3>
              <img
                src={item.thumbnail.path + "." + item.thumbnail.extension}
                alt=""
              />
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Comics;
