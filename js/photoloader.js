let servUrl;

export const init = ((url) => {
    servUrl = url;
})

export const load = ((uri) => {
    axios.get("" + servUrl + uri)
    .catch((error) => {
        console.log("Data transfer error : " + error)
    })
})