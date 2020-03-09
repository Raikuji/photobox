import * as photoload from './photoloader.js';

let idGallery, offset;

export const init = ((id, offs) => {
    idGallery = id;
    offset = offs;
})

export const load = ((url, uri) => {
    photoload.init(url);
    const data = photoload.load(uri);
    //console.log(data)
    const display = ((data) => {
        //console.log(data)
        data.forEach(photo => {
            photo = data
            console.log(photo)
            $('#photobox-gallery')
            .append('<div class="vignette">')
            .append('<img data-img=' + photo.original.href + '\ndata-uri=' + photo.links.self.href + '\nsrc=' + photo.thumbnail.href)
            .append('<div>' + photo.titre + '</div></div>')
        });
    });
    display(data);
})
