import * as photoload from './photoloader.js';

let idGallery, servUrl, prev, next, images

/**
 * Fonction initialisant les parametres a utiliser pour affcher une galerie d'image
 * @param {int} id id de la galerie a afficher
 */
export const init = ((id) => {
    idGallery = id
})

/**
 * Fonction permattant d'afficher les donnees d'une page d'une galerie
 * @param {Galerie} data donnee da la galerie a afficher
 */
const display = ((data) => {
    prev = data.data.links.prev.href
    next = data.data.links.next.href
    images = []
    $('#photobox-gallery').html("")
    data.data.photos.forEach(photo => {
        $('#photobox-gallery')
        .append(`<div class="vignette" id="${photo.photo.id}""><img id="${photo.photo.id}" data-img="${servUrl}${photo.photo.original.href}"\ndata-uri="${photo.links.self.href}"\nsrc="${servUrl}${photo.photo.thumbnail.href}"><br>${photo.photo.titre}</div></div>`)
        images.push(photo.photo.id)
    });
});

/**
 * Fonction permettant de changer de page 
 * @param {booelan} page booleen permettant de determiner s'il faut charger la page precedente ou la page suivante
 */
export const changePage = (page) => {
    photoload.init(servUrl)
    photoload.load(page ? prev : next)
    .then(display)
    .catch((error) => (console.error(error))) 
}

/**
 * Fonction retournant la liste des images d'une page
 */
export const getImages = () => {
    return images
}

/**
 * Fonction permettant de charger un page d'une galerie
 * @param {String} url url de la galerie 
 * @param {String} uri uri de la galerie
 */
export const load = ((url, uri) => {
    servUrl = url
    photoload.init(url)
    photoload.load(`${uri}categories/${idGallery}/photos`)
    .then(display)
    .catch((error) => (console.error(error))) 
})