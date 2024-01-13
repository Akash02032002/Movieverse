import React, { useEffect, useState } from "react";
import { Audio, ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { Link } from "react-router-dom";

const Cards = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(moviesRef);
        const fetchedData = querySnapshot.docs.map(doc => ({ ...(doc.data()), id: doc.id }));
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <div className="flex flex-wrap justify-between px-3 mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        filteredData.map((e, i) => (
          <Link to={`/detail/${e.id}`} key={i}>
            <div className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500">
              <img className="h-60 md:h-72" src={e.image} alt={e.title} />
              <h1>{e.title}</h1>
              <h1 className="flex items-center">
                <span className="text-gray-500 mr-1">Rating:</span>
                <ReactStars
                  size={20}
                  half={true}
                  value={e.rating / e.rated}
                  edit={false}
                />
              </h1>
              <h1>
                <span className="text-gray-500">Year:</span> {e.year}
              </h1>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Cards;
