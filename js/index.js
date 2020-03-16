import * as gallery from './gallery.js';
import * as categories from './categories.js'

const url = 'https://webetu.iutnc.univ-lorraine.fr'
const uri = '/www/canals5/photobox/categories'

$(document).ready(() => {
    categories.load(url, uri)
    $('#load_gallery').click(() => {
        gallery.init($("#categories :selected").val())
        gallery.load(url, uri)
    })
})