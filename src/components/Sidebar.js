import React from 'react'
import "./Sidebar.css";
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerValue } from '../DataLayer';
import { getTokenFromResponse } from "./spotify";



function Sidebar({ spotify }) {
    const [{playlists}, dispatch] = useDataLayerValue()
    return (
        <div className="sidebar">

            <img className="sidebar_logo" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="" />
           
            <SidebarOption title='Home' Icon={HomeIcon}/>
            <SidebarOption title='Search' Icon={SearchIcon}/>
            <SidebarOption title='Your Library' Icon={LibraryMusicIcon}/>
            <br />
            <strong className="sidebar_title">PLAYLISTS</strong>
            <hr />

            {playlists?.items?.map((playlist) => {
                return <SidebarOption spotify={spotify} title={playlist.name} id={playlist.id} key={playlist.id}/>
            })}
            
        </div>
    )
}

export default Sidebar
