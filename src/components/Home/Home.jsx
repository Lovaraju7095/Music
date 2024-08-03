import React, { useEffect, useState } from "react";
import './home.css';
import logo from "../../assets/spotify-logo.png";


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function onShowSong (songId) {

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://cms.samespace.com/items/songs");
        const result = await response.json();

        if (response.ok) {
          const resultData = result.data;
          const updatedData = resultData.map(eachItem => ({
            accent: eachItem.accent,
            artist: eachItem.artist,
            cover: eachItem.cover,
            dateCreated: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(eachItem.date_created)),
            id: eachItem.id,
            name: eachItem.name,
            sort: eachItem.sort,
            status: eachItem.status,
            topTrack: eachItem.top_track,
            url: eachItem.url,
            userCreated: eachItem.user_created,
            userUpdated: eachItem.user_updated,
            thumbnail: `https://cms.samespace.com/assets/${eachItem.cover}`
          }));
          console.log(updatedData);
          setData(updatedData);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-12 col-lg-2 bg-info start-card" style={{ height: '100vh' }}>
          <img src="" alt="logo image" />
          <div className="avatar">
          </div>
        </div>

        <div className="col-12 col-lg-4 bg-secondary p-0">
          <div className="top-track-section">
            <h2 className="top-track-tit1">For You</h2>
            <h2 className="top-track-tit2">Top Tracks</h2>
          </div>
          {data.length > 0 && (
            <div>
              {
                data.map(song => (
                  <div key={song.id} className="songs-card">
                    <div className="songs-card1" onClick={onShowSong(song.id)}>
                      <div className="inside-card">
                        <img src={song.thumbnail} alt={song.name} className="song-image" />
                        <div className="songs-desc">
                          <span>{song.artist}</span>
                          <span>{song.name}</span>
                        </div>
                      </div>
                      <span>{song.dateCreated}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>

        <div className="col-12 col-lg-6 active-song-main">
          <div className="active-song-card">
            <div className="active-card1">
              <span className="card-tit1">hello hello1</span>
              <span className="card-tit2">hello11</span>
            </div>
            <div className="active-card2">
              <img src="https://cms.samespace.com/assets/4f718272-6b0e-42ee-92d0-805b783cb471"  alt="active image" className="active-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
