import * as photoload from './photoloader.js';

const display = ((data) => {
    $('#load_gallery').after('<select id=categories>')
    data.data.categories.forEach(categ => {
        $('#categories').append(`<option value=${categ.categorie.id}>${categ.categorie.nom}</option>`)
    });
})

export const load = ((url, uri) => {
    photoload.init(url)
    photoload.load(uri)
    .then(display)
    .catch((error) => (console.error(error))) 
})