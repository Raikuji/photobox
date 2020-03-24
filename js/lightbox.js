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
    idPhoto = getImageId(idPhoto, true)
    photoload.load(`/www/canals5/photobox/photos/${idPhoto}`)
    .then(change)
    .catch((error) => (console.error(error)))
}

export const next = () => {
    photoload.init(servUrl)
    idPhoto = getImageId(idPhoto, false)
    photoload.load(`/www/canals5/photobox/photos/${idPhoto}`)
    .then(change)
    .catch((error) => (console.error(error)))
}

const getImageId = (id, image) => {
    let isFind = false
    let newImage = []
    if((id == images[0] && image) || id == images[images.length - 1] && !image) return id
    images.forEach((element) => {
        if(id == element) {
            newImage = image ? images[images.indexOf(element) - 1] : images[images.indexOf(element) + 1]
            isFind = true
        }
    })
    if(isFind) return newImage
    else return images[0]
}

export const load = ((url, uri) => {
    servUrl = url
    photoload.init(url)
    photoload.load(`${uri}photos/${idPhoto}`)
    .then(change)
    .then(display)
    .catch((error) => (console.error(error))) 
})