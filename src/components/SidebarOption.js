import React from 'react'
import "./SidebarOption.css"
import { useDataLayerValue } from '../DataLayer';

function SidebarOption({spotify, title, id, Icon}) {
    const [{}, dispatch] = useDataLayerValue();

    const changePlaylist = (id, e) => {
        dispatch({
            type: 'SET_CURRENT_PLAYLIST',
            id: id
        });

        spotify.getPlaylistTracks(id).then((tracks) => {
            dispatch({
                type: 'SET_TRACKS',
                tracks: tracks
            })
        });
    }

    return (
        <div className='sidebarOption'>
            {Icon && <Icon className='sidebarOption_icon'/>}
            {Icon ? <h4>{title}</h4> : <p onClick={(e) => changePlaylist(id, e)}>{title}</p>}
        </div>
    )
}

export default SidebarOption
