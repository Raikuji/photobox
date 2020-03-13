import * as photoload from './photoloader.js';

let idGallery, offset;

let servUrl;

export const init = ((id, offs) => {
    idGallery = id;
    offset = offs;
})

const display = ((data) => {
    data.data.photos.forEach(photo => {
        //console.log(photo.photo)
        $('#photobox-gallery')
        .append('<div class="vignette"><img data-img=' + servUrl + photo.photo.original.href + '\ndata-uri=' + photo.links.self.href + '\nsrc=' + servUrl + photo.photo.thumbnail.href + '>' + photo.photo.titre + '</div></div>')
    });
});

export const load = ((url, uri) => {
    servUrl = url
    photoload.init(url);
    photoload.load(uri)
    .then(display)
    .catch((error) => (console.error(error))) 
})
