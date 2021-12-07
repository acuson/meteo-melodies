var playlists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var output = "";

playlists.forEach(playlist => {
    output += `<img src='./assets/images/100placeholder.png' class='m-1' style='height: 100px; width: 100px' onclick='window.location.href='./player.html''/>`;
});
const clientId = "7a0f37913ee7411a91763141d13810b5";
const redirectUri = "http://127.0.0.1:5500/recsPage.html";
let redirect = () => {
    location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
};

// var data = {
//     client_id: clientId,
//     code_verifier:
// }

function getCode() {
    let code = null;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
    token(code);
}

let token = code => {
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
            queryPlaylists(data.access_token);
        })
        .catch(err => {
            console.log(err);
        });
};

var testWeatherSearch = "cloudy";

function queryPlaylists(token) {
    var bucket = "";
    fetch(
        `https://api.spotify.com/v1/search?query=${testWeatherSearch}&type=playlist&include_external=audio&offset=0&limit=50`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    )
        .then(response => response.json())
        .then(data => {
            console.log(data.playlists.items);
            var playlists = data.playlists.items;
            playlists.forEach(i => {
                bucket += `<a href="${i.external_urls.spotify}" target="_blank"><img src="${i.images[0].url}" class='m-1' style='height: 150px; width: 150px' onclick='window.location.href='./player.html''/></a>`;
            });
            $(".playlists").html(bucket);
        })
        .catch(err => {
            console.log(err);
        });
}
