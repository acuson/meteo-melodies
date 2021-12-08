const clientId = "7a0f37913ee7411a91763141d13810b5";
const redirectUri = "http://127.0.0.1:5500/recsPage.html";
let redirect = () => {
    location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
};

function getCode() {
    let code = null;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
    getToken(code);
}

let getToken = code => {
    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization:
                "Basic N2EwZjM3OTEzZWU3NDExYTkxNzYzMTQxZDEzODEwYjU6NmVlOTc4MjJjMTg2NDZkMjg5MGYyOGVjOGMwNzFiNDA=",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        redirect_uri: redirectUri,
        code: code,
        body: "grant_type=client_credentials",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.sessionStorage.setItem("token", data.access_token);
            return data.access_token;
        })
        .catch(err => {
            console.log(err);
        });
};

var testWeatherSearch = "rainy";

function queryPlaylists() {
    var output = "";
    var token = window.sessionStorage.getItem("token");
    fetch(
        `https://api.spotify.com/v1/search?query=${testWeatherSearch}&type=playlist&include_external=audio&offset=0&limit=50`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}}`,
                "Content-Type": "application/json",
            },
        }
    )
        .then(response => response.json())
        .then(data => {
            console.log(data.playlists.items);

            var playlists = data.playlists.items;
            playlists.forEach(i => {
                output += `<a href="${i.external_urls.spotify}" target="_blank"><img src="${i.images[0].url}" class='m-1' style='height: 150px; width: 150px' onclick='window.location.href='./player.html''/></a>`;
            });
            $(".playlists").html(output);
        })
        .catch(err => {
            console.log(err);
        });
}
