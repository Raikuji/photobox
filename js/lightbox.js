import * as photoload from './photoloader.js';
import * as gallery from './gallery.js'

let idPhoto, servUrl, images

export const init = ((id, img) => {
    idPhoto = id
    images = img
})

const change = (data) => {
    $('#lightbox-img').html(`<img id="lightbox_full_img" src="${servUrl}${data.data.photo.url.href}" width="100%"></img>`)
    $('#lightbox_title').html(data.data.photo.titre)
}

const display = () => {
    $('#photobox-gallery').css("display", "none")
    $('nav').css("display", "none")
    $('#lightbox_container').css("display", "inline")
    $('body').css("background-color", "black")
}

export const prev = () => {
    photoload.init(servUrl)
    if(isPageEnd(parseInt(idPhoto), true)) {
        getImageId(idPhoto, true)
        .then(images = gallery.getImages())
        .then(() => {
            idPhoto = images[images.length - 1]
            photoload.load(`/www/canals5/photobox/photos/${idPhoto}`)
            .then(change)
            .catch((error) => (console.error(error)))
        })
    } else {
        photoload.init(servUrl)
        idPhoto = getImageId(idPhoto, true)
        photoload.load(`/www/canals5/photobox/photos/${idPhoto}`)
        .then(change)
        .catch((error) => (console.error(error)))
    }
}

export const next = () => {
    photoload.init(servUrl)
    if(isPageEnd(parseInt(idPhoto), false)) {
        getImageId(idPhoto, false)
        .then(images = gallery.getImages())
        .then(() => {
            idPhoto = images[0]
            photoload.load(`/www/canals5/photobox/photos/${idPhoto}`)
            .then(change)
            .catch((error) => (console.error(error)))
        })
    } else {
        photoload.init(servUrl)
        idPhoto = getImageId(idPhoto, false)
        photoload.load(`/www/canals5/photobox/photos/${idPhoto}`)
        .then(change)
        .catch((error) => (console.error(error)))
    }
}

const isPageEnd = (id, isPrev) => {
    if((images.indexOf(id) == images.length - 1 && !isPrev) || (images.indexOf(id) == 0 && isPrev)) {
        return true
    } else return false
}

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

const samePageId = (id, isPrev) => {
    let newImage = id;
    images.forEach((element) => {
        if(id == element) {
            newImage = isPrev ? images[images.indexOf(element) - 1] : images[images.indexOf(element) + 1]
        }
    })
    return newImage
}

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

export const load = ((url, uri) => {
    servUrl = url
    photoload.init(url)
    photoload.load(`${uri}photos/${idPhoto}`)
    .then(change)
    .then(display)
    .catch((error) => (console.error(error))) 
})