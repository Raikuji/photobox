import * as photoload from './photoloader.js';

let idPhoto, servUrl

export const init = ((id) => {
    idPhoto = id
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

export const load = ((url, uri) => {
    servUrl = url
    photoload.init(url)
    photoload.load(`${uri}photos/${idPhoto}`)
    .then(change)
    .then(display)
    .catch((error) => (console.error(error))) 
})