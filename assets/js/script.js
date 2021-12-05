var client_id = '7a0f37913ee7411a91763141d13810b5'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret

const baseAddress = 'https://api.spotify.com/v1'

// your application requests authorization
// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))


const redirectUri = 'http://127.0.0.1:5500/index.html'

// var parameters = {
//     client_id
//     response_type
//     redirect_uri
//     code_challenge_method: S256
//     code_challenge
// }

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

https://accounts.spotify.com/en/authorize?client_id=7a0f37913ee7411a91763141d13810b5&response_type=code&redirect_uri=http:%2F%2F127.0.0.1:5500%2Findex.html

// &code_challenge_method=s256
// &code_challenge=

https://api.spotify.com/v1/authorize&client_id=7a0f37913ee7411a91763141d13810b5&response_type=code&redirect_uri=http://127.0.0.1:5500/index.html&code_challenge_method=s256&code_challenge=ae8a27cb2679d49c628a2d2ce647df91005bafb86e6ef8d000aab8db

AQApnb_sfMZF6zC4yotmWIHH0BE3bendm6whrvjLvYWV7Ye_oqJHXQOZBNMNCmvtWmXypV2sCz73qeFncXmG6EAOGVJqF0aDME8L5X-7__cM7uoEq3i35EpJSl2Tdp7Wl8HKIRgR1GB9xXJKSLGoWuFUFJp6VX4Cloe-vVSNiUZAP8dF

//Token parameters
grant_type: 'authorization_code'
code: long thing
redirect_uri: redirectUri
client_id: client_id
code_verifier: 