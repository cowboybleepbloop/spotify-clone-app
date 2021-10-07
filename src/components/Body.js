import React from 'react'
import "./Body.css";
import Header from './Header';
import SongRow from './SongRow';
import { useDataLayerValue } from '../DataLayer';
import { useSoundLayerValue } from '../SoundLayer';
import { Favorite, MoreHoriz, PauseCircleFilled, PlayCircleFilled } from '@mui/icons-material';

function Body({ spotify }) {
    const [{current_playlist, tracks, track}] = useDataLayerValue();
    const [{playing, volume}, soundDispatch] = useSoundLayerValue();
    //const [{ discover_weekly }, dispatch] = useDataLayerValue();

    const startPlaying = () => {
        soundDispatch({
            type: "SET_PLAYING",
            playing: true
        });
        soundDispatch({
            type: "SET_VOLUME",
            volume: volume / 100
        });
    };

    const stopPlaying = () => {
        soundDispatch({
            type: "SET_PLAYING",
            playing: false
        });
    };

    return (
        <div className="body">
            <Header spotify={spotify}/>

            <div className="body_info">
                <img src={current_playlist ? current_playlist?.images[0].url : 'https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'} alt="" />
                <div className="body_infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{current_playlist?.name}</h2>
                    <p>{current_playlist?.description}</p>
                </div>
            </div>
            <div className="body_songs">
            <div className="body_icons">
            {playing ? <PauseCircleFilled onClick={track ? stopPlaying : null}
                                                      className='body_shuffle'/> :
                        <PlayCircleFilled onClick={track ? startPlaying : null} fontSize='large'
                                              className='body_shuffle'/>}
                    <Favorite fontSize='large'/>
                    <MoreHoriz/>
            </div>

            {tracks?.items.map(track => {
                    return <SongRow track={track.track} key={track.track.id}/>
            })}
            </div>
        </div>
    )
}

export default Body;
