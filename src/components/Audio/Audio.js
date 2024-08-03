import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss'

export const AudioPlayerComponent = ({url,songId,handleNextSong,handlePrevious}) => (
  <AudioPlayer
    autoPlay
    src={url}
    onPlay={e => console.log("onPlay")}
    // other props here
    showSkipControls={true}
    autoPlayAfterSrcChange={true}
    showFilledVolume={false}
    showJumpControls={false}
    onClickPrevious={()=>handlePrevious(songId)}
    onClickNext={()=>handleNextSong(songId)}
  />
);