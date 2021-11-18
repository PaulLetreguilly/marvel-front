import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

const Character = () => {
  const [data, setData] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const resp = await axios.get(`http://localhost:4000/comics`);
        const resp = await axios.get(`http://localhost:4000/comics/${id}`);
        setData(resp.data);
        // console.log(resp.data, "heya");
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <section className="charac-comics">
      {data?.comics.map((item) => {
        return (
          <div key={item._id} className="comics">
            <h3>{item.title}</h3>
            <img
              src={item.thumbnail.path + "." + item.thumbnail.extension}
              alt=""
            />
          </div>
        );
      })}
    </section>
  );
};

export default Character;
