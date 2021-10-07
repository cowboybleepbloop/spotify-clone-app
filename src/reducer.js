export const initialState = {
    user: null,
    playlists: [],
    //spotify: null,
    //discover_weekly: null,
    current_playlist: null,
    top_artists: null,
    tracks: null,
    track: null,
    playing: false,
    item: null,
    //set token to null for production
    //token: "BQBWkQlujXUz6VcKJTD_rB9c4S571rIkY-khgUshwawppkZfzyObeCCzSPNVVcQsXsHRN7Ftu9aREpF1ODTTeca_bH0vZiewPAL5Q8CT_gy4gqoLX_M4pJDVCXLEl1Ht9Uc_v7EGZZvs5wB2W_04Tr0WGZTiJ3gl5if83zWrz3jFWMY4rGeH",
};

const reducer = (state, action) => {
    console.log(action); 
    //dispatch action, listener
    //action -> has type, payload

    switch(action.type){
        case 'SET_USER':
            return { //keep current state update user with whatever the action was
                ...state, 
                user: action.user
            };

        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            };

        case 'SET_CURRENT_PLAYLIST': {
            let currentPlaylist = null;
            state.playlists.items.forEach(playlist => {
                if(playlist.id === action.id) {
                    currentPlaylist = playlist;
                }
            });
            return {
                ...state,
                current_playlist: currentPlaylist
            }
        }

        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            };
          
        /* case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            }; */
          
        /* case "SET_TOP_ARTISTS":
            return {
                ...state,
                top_artists: action.top_artists,
            }; */

        case 'SET_TOKEN':
            return{
                ...state,
                token: action.token
            };

        case 'SET_PLAYLISTS':
            return{
                ...state,
                playlists: action.playlists
            }

        /*case 'GET_DISCOVER_WEEKLY':
            return{
                ...state,
                discover_weekly: action.discover_weekly
            }; */

        /* case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify,
            }; */

        case 'SET_TRACKS': {
             return {
                 ...state,
                tracks: action.tracks
             };
            }
        case 'SET_TRACK': {
            return {
                 ...state,
                 track: action.track
            };
            }

        default: 
            return state;
    }
}

export default reducer;