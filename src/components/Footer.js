import React, { useEffect } from "react";
import "./Footer.css";
import { useDataLayerValue } from '../DataLayer';
import { useSoundLayerValue } from '../SoundLayer';
import { PauseCircleOutline, PlayCircleOutline, PlaylistPlay, Repeat, Shuffle, SkipNext, SkipPrevious, VolumeDown } from '@mui/icons-material';
import { Grid, Slider } from '@mui/material';



function Footer({ spotify }) {
    //const [{ token, item, playing }, dispatch] = useDataLayerValue();

      const [{track, tracks}, dispatch] = useDataLayerValue();
      const [{audio, playing, volume, repeat, shuffle}, soundDispatch] = useSoundLayerValue();

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

    const setRepeat = () => {
        if(!repeat && shuffle) {
            setShuffle();
        }
        soundDispatch({
            type: "SET_REPEAT",
            repeat: !repeat
        });
    };

    const setShuffle = () => {
        if(!shuffle && repeat) {
            setRepeat();
        }
        soundDispatch({
            type: "SET_SHUFFLE",
            shuffle: !shuffle
        });
    };

    const handleChange = (event, value) => {
        soundDispatch({
            type: "SET_VOLUME",
            volume: value / 100
        });
    };

    if(audio) {
        audio.onended = () => {
            if(shuffle) {
                while(true) {
                    let randomTrackNumber = Math.floor((Math.random() * tracks.items.length));
                    let randomTrack = tracks.items[randomTrackNumber].track;
                    if(track !== randomTrack) {
                        dispatch({
                            type: 'SET_TRACK',
                            track: randomTrack
                        });

                        let wasPlaying = playing;
                        soundDispatch({
                            type: 'SET_PLAYING',
                            playing: false,
                        });

                        let audio = new Audio(randomTrack.preview_url);
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

                        document.title = `${randomTrack.name} · ${randomTrack.artists.map((artist) => artist.name).join(', ')}`
                        break
                    }
                }
            }
            if(!shuffle && !repeat) {
                soundDispatch({
                    type: 'SET_PLAYING',
                    playing: false,
                });
            }
        }
  }

      return (
        <div className="footer">
            <div className='footer_left'>
                <img className='footer_albumLogo' src={track ? track.album.images[0].url : ''} alt=""/>
                <div className='footer_songInfo'>
                    <h4>{track ? track.name : 'No song selected'}</h4>
                    <p>{track ? track.artists.map((artist) => artist.name).join(", ") : null}</p>
                </div>
            </div>
            <div className='footer_center'>
                <Shuffle onClick={track? setShuffle : null} className={shuffle ? 'footer_green' : 'footer_icon'}/>
                <SkipPrevious className='footer_icon'/>
                {playing ? <PauseCircleOutline onClick={track ? stopPlaying : null} fontSize='large'
                                                  className='footer_icon'/> :
                    <PlayCircleOutline onClick={track ? startPlaying : null} fontSize='large'
                                          className='footer_icon'/>}
                <SkipNext className='footer_icon'/>
                <Repeat onClick={track? setRepeat : null} className={repeat ? 'footer_green' : 'footer_icon'}/>
            </div>
            <div className='footer_right'>
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlay/>
                    </Grid>
                    <Grid item>
                        <VolumeDown/>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="off"
                            onChange={handleChange}
                            min={0}
                            max={100}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
