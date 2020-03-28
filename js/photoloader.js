let servUrl;

/**
 * Fonction permettant l'initialisation de la requete axios
 * @param {Stirng} url url a charger
 */
export const init = ((url) => {
    servUrl = url;
})

/**
 * Fonction permettant de lancer une requete get grace a axios
 * @param {String} uri uri a charger
 */
export const load = ((uri) => {
    return axios.get("" + servUrl + uri, {withCredentials: true})
    .catch((error) => {
        console.error("Data transfer error : " + error)
    })
})