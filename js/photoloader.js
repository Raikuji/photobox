let servUrl;

export const init = ((url) => {
    servUrl = url;
})

export const load = ((uri) => {
    return axios.get("" + servUrl + uri, {withCredentials: true})
    .catch((error) => {
        console.error("Data transfer error : " + error)
    })
})