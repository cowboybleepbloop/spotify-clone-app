import { useEffect, useState } from 'react';
import './App.css';
import Login from "./components/Login"
import Player from './components/Player';
import { getTokenFromUrl } from './components/spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi(); //creating an instance of spotify for ease of use

function App() {

  //const [token, setToken] = useState(null);
  const [{ user, token }, dispatch] = useDataLayerValue(); //push and pull from data layer

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = ""; //strip token from url
    const _token = hash.access_token;

    if (_token) { //storing token in state

      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      })
      

      spotify.setAccessToken(_token); //gives access token to spotify api

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
         })
      })
    }

  }, []);

  //console.log('User: ', user);
  //console.log('Token: ', token);

  return (
    <div className="app">
      {
        token ? (<Player spotify={spotify} />) : ( <Login />) //if there is a token, render the player otherwise render the login page
      }
      
    </div>
  );
}

export default App;
