let servUrl;

export const init = ((url) => {
    servUrl = url;
})

export const load = ((uri) => {
    return axios.get("" + servUrl + uri)
    .catch((error) => {
        console.log("Data transfer error : " + error)
    })
})