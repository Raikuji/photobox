import * as photoload from './photoloader.js';

let idGallery, servUrl

export const init = ((id) => {
    idGallery = id
})

const display = ((data) => {
    $('#photobox-gallery').html("")
    data.data.photos.forEach(photo => {
        $('#photobox-gallery')
        .append(`<div class="vignette value=${photo.photo.id}"><img data-img="${servUrl}${photo.photo.original.href}"\ndata-uri="${photo.links.self.href}"\nsrc="${servUrl}${photo.photo.thumbnail.href}">${photo.photo.titre}</div></div>`)
    });
});

export const load = ((url, uri) => {
    servUrl = url
    photoload.init(url)
    photoload.load(`${uri}/${idGallery}/photos`)
    .then(display)
    .catch((error) => (console.error(error))) 
})
