import React from 'react'
import './Header.css'
import Search from '@mui/icons-material/Search'
import { Avatar } from '@mui/material'
import { useDataLayerValue } from '../DataLayer'

function Header() {
    const [{ user }] = useDataLayerValue();
    return (
        <div class="header">
            <div className="header_left">
            <Search />
            <input placeholder="Artists, songs, or podcasts" type="text" />
            </div>
            <div className="header_right">
                <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}

export default Header
