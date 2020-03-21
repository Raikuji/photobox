import * as photoload from './photoloader.js';

let idGallery, servUrl, prev, next

export const init = ((id) => {
    idGallery = id
})

const display = ((data) => {
    prev = data.data.links.prev.href
    next = data.data.links.next.href
    $('#photobox-gallery').html("")
    data.data.photos.forEach(photo => {
        $('#photobox-gallery')
        .append(`<div class="vignette" id="${photo.photo.id}""><img id="${photo.photo.id}" data-img="${servUrl}${photo.photo.original.href}"\ndata-uri="${photo.links.self.href}"\nsrc="${servUrl}${photo.photo.thumbnail.href}"><br>${photo.photo.titre}</div></div>`)
    });
});

export const changePage = (page) => {
    photoload.init(servUrl)
    photoload.load(page ? prev : next)
    .then(display)
    .catch((error) => (console.error(error))) 
}

export const load = ((url, uri) => {
    servUrl = url
    photoload.init(url)
    photoload.load(`${uri}categories/${idGallery}/photos`)
    .then(display)
    .catch((error) => (console.error(error))) 
})
