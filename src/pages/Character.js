import { useParams } from "react-router";
import { useLocation } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

const Character = () => {
  const [data2, setData2] = useState();

  const { id } = useParams;
  const location = useLocation();
  const { comics } = location.state;
  const test = "5fcf91f4d8a2480017b91453";
  console.log("mon id : ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`http//localhost:4000/comics/${test}`);
        setData2(resp.data);
        console.log(resp.data, "heya");
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      {comics.map((elem, index) => {
        return <div key={index}>{elem}</div>;
      })}
      {/* {data.map((item, index) => {
        return <div key={index}>{item.title}</div>;
      })} */}
    </section>
  );
};

export default Character;
