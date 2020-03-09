import * as photoload from './photoloader.js';

let idGallery, offset;

export const init = ((id, offs) => {
    idGallery = id;
    offset = offs;
})

export const load = ((url, uri) => {
    photoload.init(url);
    const data = photoload.load(uri);
    ((data) => {
        const json = JSON.parse(data);
        let photo;
        for(let i = 86; i < 90; i++) {
            $('#photobox-gallery')
            .append('<div class="vignette" >')
            .append('<img data-img=' + json.original.href + '\ndata-uri=' + json.links.self.href + '\nsrc=' + json.thumbnail.href)
            .append('<div>' + json.titre + '</div></div>')
            
        }
    });
})
