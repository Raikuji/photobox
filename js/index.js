import * as gallery from './gallery.js';

$(document).ready( function() {
    $('#load_gallery').click(() => gallery.load('https://webetu.iutnc.univ-lorraine.fr', '/www/canals5/photobox/photos/?offset=8&size=12'))
})