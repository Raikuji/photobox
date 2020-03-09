import * as photoload from './photoloader.js';

let idGallery, offset;

export const init = ((id, offs) => {
    idGallery = id;
    offset = offs;
})

export const load = ((url, uri) => {
    photoload.init(url);
    const data = photoload.load(uri);
    const display = ((data) => {
        const json = JSON.parse(data);
        let photo;
        console.log(json)
        for(let i = 90; i < 100; i++) {
            photo = json.filter(elem => elem.id == i)
            console.log(photo)
            $('#photobox-gallery')
            .append('<div class="vignette">')
            .append('<img data-img=' + photo.original.href + '\ndata-uri=' + photo.links.self.href + '\nsrc=' + photo.thumbnail.href)
            .append('<div>' + photo.titre + '</div></div>')
            
        }
    });
    display(data);
})
