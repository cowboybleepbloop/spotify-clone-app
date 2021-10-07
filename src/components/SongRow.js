import React from 'react';
import './SongRow.css';
import { useDataLayerValue } from '../DataLayer';
import { useSoundLayerValue } from '../SoundLayer';

function SongRow({ track }) {

    const [{}, dispatch] = useDataLayerValue();
    const [{playing, repeat}, soundDispatch] = useSoundLayerValue();

    const changeTrack = (e, track) => {
        dispatch({
            type: 'SET_TRACK',
            track: track
        });

        let wasPlaying = playing;
        soundDispatch({
            type: 'SET_PLAYING',
            playing: false,
        });

        let audio = new Audio(track.preview_url);
        audio.loop = repeat;
        soundDispatch({
            type: 'SET_AUDIO',
            audio: audio
        });

        if(wasPlaying) {
            soundDispatch({
                type: 'SET_PLAYING',
                playing: true,
            });
        }

        document.title = `${track.name} · ${track.artists.map((artist) => artist.name).join(', ')}`
    };

    return (
        <div className="songRow" onClick={(e) => changeTrack(e, track)}>
            <img className="songRow_album" src={track.album.images[0].url} alt="" />
            <div className="songRow_info">
                <h1>{track.name}</h1>
                <p>
                    {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                    {track.album.name}
                </p>
            </div>
        </div>
    )
}

export default SongRow
