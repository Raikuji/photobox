import * as photoload from './photoloader.js';
import * as gallery from './gallery.js'

let idPhoto, servUrl, images, servUri

export const init = ((id, img) => {
    idPhoto = id
    images = img
})

const change = (data) => {
    $('#lightbox-img').html(`<img id="lightbox_full_img" src="${servUrl}${data.data.photo.url.href}" width="100%"></img>`)
    $('#lightbox_title').html(data.data.photo.titre)
    $('#format').html(`format : ${data.data.photo.format}`)
    $('#type').html(`type : ${data.data.photo.type}`)
    $('#size').html(`size : ${data.data.photo.size}`)
    $('#width').html(`width : ${data.data.photo.width}`)
    $('#height').html(`height : ${data.data.photo.height}`)
}

const display = () => {
    $('#photobox-gallery').css("display", "none")
    $('nav').css("display", "none")
    $('#lightbox_container').css("display", "flex")
}

const displayComments = (data) => {
    $("#comments-viewer").html("")
    data.data.comments.forEach(comment => {
        $("#comments-viewer").append(`<h2>${comment.titre}</h2>`)
        $("#comments-viewer").append(`<h4>Posté par ${comment.pseudo} le ${comment.date}</h4>`)
        $("#comments-viewer").append(`<p>${comment.content}</p>`)
        console.log(comment)
    })
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