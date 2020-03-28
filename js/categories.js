import * as photoload from './photoloader.js';

/**
 * Fonction qui permet d'ajouter les categories a un menu deroulant pour charger seulement celle selectionee
 * @param {Categories} data ensemble des categories disponible sur le site 
 */
const display = ((data) => {
    $('#load_gallery').after('<select id=categories>')
    data.data.categories.forEach(categ => {
        $('#categories').append(`<option value=${categ.categorie.id}>${categ.categorie.nom}</option>`)
    });
})

/**
 * Fonction permettant de charger les differentes categories apres la reception d'une promesse
 * @param {String} url url vers laquelle faire la requete 
 * @param {String} uri uri de base pour faire la requete
 */
export const load = ((url, uri) => {
    photoload.init(url)
    photoload.load(`${uri}categories`)
    .then(display)
    .catch((error) => (console.error(error))) 
})