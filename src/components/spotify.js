// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
//const redirectUrl = window.location.origin + '/'; //where are you running your app (local react by default is http://localhost:3000/
const clientId = "77b5066807c645a0b7d1cd6f98e2eed1";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

export const getAccessTokenFromUrl = () => {
        return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
    }, {});
}

