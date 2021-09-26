export const initialState = {
    user: null,
    playlists: [],
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

        default: 
            return state;
    }
}

export default reducer;