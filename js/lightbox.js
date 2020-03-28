import * as photoload from './photoloader.js';
import * as gallery from './gallery.js'

let idPhoto, servUrl, images, servUri

/**
 * Fonction initialisant les parametres a charger a l'ouverture d'une lightbox
 * @param {int} id id de la photo en cours d'affichage
 * @param {int[]} img liste d'images en cours d'affichage
 */
export const init = ((id, img) => {
    idPhoto = id
    images = img
})

/**
 * Fonction permettant de modifier la page en fonction des donnees d'une image
 * @param {Photo} data donner de la photo utilisé pour modifer la page
 */
const change = (data) => {
    $('#lightbox-img').html(`<img id="lightbox_full_img" src="${servUrl}${data.data.photo.url.href}" width="100%"></img>`)
    $('#lightbox_title').html(data.data.photo.titre)
    $('#format').html(`format : ${data.data.photo.format}`)
    $('#type').html(`type : ${data.data.photo.type}`)
    $('#size').html(`size : ${data.data.photo.size}`)
    $('#width').html(`width : ${data.data.photo.width}`)
    $('#height').html(`height : ${data.data.photo.height}`)
}

/**
 * Fonction permettant l'affichage de la page en mode lightbox
 */
const display = () => {
    $('#photobox-gallery').css("display", "none")
    $('nav').css("display", "none")
    $('#lightbox_container').css("display", "flex")
}

/**
 * Fonction permettant d'afficher tout les commentaires d'une image
 * @param {Commentaires} data donnees des commentaires a afficher sur la page
 */
const displayComments = (data) => {
    $("#comments-viewer").html("")
    data.data.comments.forEach(comment => {
        $("#comments-viewer").append(`<h2>${comment.titre}</h2>`)
        $("#comments-viewer").append(`<h4>Posté par ${comment.pseudo} le ${comment.date}</h4>`)
        $("#comments-viewer").append(`<p>${comment.content}</p>`)
        console.log(comment)
    })
}

/**
 * Fonction permettant de passer a l'image precendante dans la liste, et change de page si c'est la premiere image d'une page
 */
export const prev = () => {
    photoload.init(servUrl)
    if(isPageEnd(parseInt(idPhoto), true)) {
        getImageId(idPhoto, true)
        .then(images = gallery.getImages())
        .then(() => {
            idPhoto = images[images.length - 1]
            photoload.load(`/www/canals5/photobox/photos/${idPhoto}`)
            .then(change)
            .then(() => {
                photoload.load(`${servUri}photos/${idPhoto}/comments`)
                .then(displayComments)
                .catch((error) => (console.error(error))) 
            })
            .catch((error) => (console.error(error)))
        })
    } else {
        photoload.init(servUrl)
        idPhoto = getImageId(idPhoto, true)
        photoload.load(`/www/canals5/photobox/photos/${idPhoto}`)
        .then(change)
        .then(() => {
            photoload.load(`${servUri}photos/${idPhoto}/comments`)
            .then(displayComments)
            .catch((error) => (console.error(error))) 
        })
        .catch((error) => (console.error(error)))
    }
}

/**
 * Fonction permettant de passer a l'image suivante dans la liste, et change de page si c'est la derniere image d'une page
 */
export const next = () => {
    photoload.init(servUrl)
    if(isPageEnd(parseInt(idPhoto), false)) {
        getImageId(idPhoto, false)
        .then(images = gallery.getImages())
        .then(() => {
            idPhoto = images[0]
            photoload.load(`/www/canals5/photobox/photos/${idPhoto}`)
            .then(change)
            .then(() => {
                photoload.load(`${servUri}photos/${idPhoto}/comments`)
                .then(displayComments)
                .catch((error) => (console.error(error))) 
            })
            .catch((error) => (console.error(error)))
        })
    } else {
        photoload.init(servUrl)
        idPhoto = getImageId(idPhoto, false)
        photoload.load(`/www/canals5/photobox/photos/${idPhoto}`)
        .then(change)
        .then(() => {
            photoload.load(`${servUri}photos/${idPhoto}/comments`)
            .then(displayComments)
            .catch((error) => (console.error(error))) 
        })
        .catch((error) => (console.error(error)))
    }
}

/**
 * Fonction permettant de determiner si une image est soit au debut soit la fin d'une liste d'image
 * @param {int} id id de l'image a verifier
 * @param {boolean} isPrev booleen permattant de savoir si on veut l'image suivante ou precedente
 */
const isPageEnd = (id, isPrev) => {
    if((images.indexOf(id) == images.length - 1 && !isPrev) || (images.indexOf(id) == 0 && isPrev)) {
        return true
    } else return false
}

/**
 * Fonction permattant de determiner l'id de la prochaine image a charger
 * @param {int} id id de l'image a utiliser 
 * @param {boolean} isPrev booleen permattant de savoir si on veut l'image suivante ou precedente 
 */
const getImageId = (id, isPrev) => {
    console.log(id == images[0] && isPrev)
    if(id == images[0] && isPrev) {
        return otherPageId(isPrev)
    } else if(id == images[images.length - 1] && !isPrev) {
        return otherPageId(isPrev)
    } else {
        return samePageId(id, isPrev)
    }
}

/**
 * Fonction retourant l'id de l'image a afficher si celle ci est dans la meme liste que l'image en cours d'affichage
 * @param {int} id id de l'image a utiliser 
 * @param {boolean} isPrev booleen permattant de savoir si on veut l'image suivante ou precedente 
 */
const samePageId = (id, isPrev) => {
    let newImage = id;
    images.forEach((element) => {
        if(id == element) {
            newImage = isPrev ? images[images.indexOf(element) - 1] : images[images.indexOf(element) + 1]
        }
    })
    return newImage
}

/**
 * Fonction retournant une promesse qui indique la prochaine liste d'image a charger ainsi que l'id de l'image afficher
 * @param {boolean} isPrev booleen permattant de savoir si on veut l'image suivante ou precedente 
 */
const otherPageId = (isPrev) => {
    if(isPrev) {
        return gallery.changePage(true, true)
        .then(() => {
            images = gallery.getImages()
        })
        .catch((error) => (console.error(error)))
    } else {
        return gallery.changePage(false, true)
        .then(() => {
            images = gallery.getImages()
        })
        .catch((error) => (console.error(error)))
    }
}

/**
 * Fonction permettant de charger les differents elements a afficher en mode photobox
 * @param {String} url url vers laquelle faire la requete 
 * @param {String} uri uri de base pour faire la requete
 */
export const load = ((url, uri) => {
    servUrl = url
    servUri = uri
    photoload.init(url)
    photoload.load(`${uri}photos/${idPhoto}`)
    .then(change)
    .then(display)
    .then(() => {
        photoload.load(`${uri}photos/${idPhoto}/comments`)
        .then(displayComments)
        .catch((error) => (console.error(error))) 
    })
    .catch((error) => (console.error(error))) 
})