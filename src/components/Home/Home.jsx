import React, { useEffect, useMemo, useState } from "react";
import "./home.css";
import logo from "../../assets/spotify-logo.png";
import { AudioPlayerComponent } from "../Audio/Audio";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSong, setActiveSong] = useState({});
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState("You");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://cms.samespace.com/items/songs");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        const updatedData = result.data.map((item) => ({
          ...item,
          dateCreated: new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date(item.date_created)),
          thumbnail: `https://cms.samespace.com/assets/${item.cover}`,
        }));
        setActiveSong(updatedData[0]);
        setData(updatedData);
        console.log({updatedData})
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNextSong = (songId) => {
    const nextSongIndex = data.findIndex((song) => song.id === songId) + 1;
    if (nextSongIndex < data.length) {
      setActiveSong(data[nextSongIndex]);
    }
  };

  const handlePrevious = (songId) => {
    const previousSongIndex = data.findIndex((song) => song.id === songId) - 1;
    if (previousSongIndex >= 0) {
      setActiveSong(data[previousSongIndex]);
    }
  };

  const currentSongsList = useMemo(() => {
    if (currentTab === "You") {
      return data;
    } else {
      return data.filter((item) => item.top_track);
    }
  }, [data, currentTab]);

  const onChangeTopTab = (tab) => {
    setCurrentTab(tab);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-2 bg-info start-card" style={{ height: "100vh" }}>
          <img src={logo} alt="logo image" />
          <div className="avatar"></div>
        </div>

        <div className="col-12 col-lg-4 bg-secondary p-0">
          <div className="top-track-section">
            <button className="top-track-tit1" style={currentTab=="You"? {color:'#fff'}:{color:'grey'}} onClick={() => onChangeTopTab("You")}>
              For You
            </button>
            <button className="top-track-tit2" onClick={() => onChangeTopTab("Tracks")}  style={currentTab=="Tracks"? {color:'#fff'}:{color:'grey'}}>
              Top Tracks
            </button>
          </div>
          {data.length > 0 && (
            <div>
              {currentSongsList.map((song) => (
                <div key={song.id} className="songs-card" onClick={() => setActiveSong(song)}>
                  <div className="songs-card1">
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
              ))}
            </div>
          )}
        </div>

        <div className="col-12 col-lg-6 active-song-main">
          <div className="active-song-card">
            <div className="active-card1">
              <span className="card-tit1">{activeSong.artist}</span>
              <span className="card-tit2">{activeSong.name}</span>
            </div>
            <div className="active-card2">
              <img src={activeSong.thumbnail} alt={activeSong.name} className="active-image" />
            </div>
            <div style={{ background: "red", height: 100, width: "100%" }}>
              <AudioPlayerComponent
                url={activeSong.url}
                songId={activeSong.id}
                handleNextSong={handleNextSong}
                handlePrevious={handlePrevious}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
