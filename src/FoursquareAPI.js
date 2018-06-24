function getArgs() {
    let today = new Date();
    let timestamp = today.getFullYear().toString() + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + today.getDate()).slice(-2)
    let args = new Map();
    args.set("ll", "51.500699,-0.126087");
    args.set("client_id", "1QASIAATSXDBS0S0L53OWVB4AHXEZZFCHTR2AVQDDVCYKHGT");
    args.set("client_secret", "ABCKBF1EJQCQK4Z0H1QX0YQDB3LX0H1YGFLMEPX4HWWGUQRT");
    args.set("v", timestamp);
    return (api + getUri(args));
}

function getUri(args) {
    let postData = "";
    Array.from(args.keys()).map(function (key) {
        if (postData.length > 0) {
            postData += "&";
        }
        postData += key + "=" + args.get(key);
    });
    return postData;
}

const api = "https://api.foursquare.com/v2/venues/search?";

export async function getAll() {
    let venues = [];
    try {
        venues = await fetch(getArgs())
            .then(res => res.json())
            .then(data => data.response.venues);
    }
    catch (err) {
        console.log('fetch failed', err);
    }
    console.log(typeof venues);
    return typeof venues === "object" ? venues : [];
}