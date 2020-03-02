let servUrl;

export const init = ((url) => {
    servUrl = url;
})

export const load = ((uri) => {
    raxios.get("" + servUrl + uri)
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.log("Data transfer error : " + error)
    })
})