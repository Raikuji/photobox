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
        JSON.parse(data);
    });
})
