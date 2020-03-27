import * as gallery from './gallery.js';
import * as categories from './categories.js'
import * as lightbox from './lightbox.js'

const url = 'https://webetu.iutnc.univ-lorraine.fr'
const uri = '/www/canals5/photobox/'
let images

$(document).ready(() => {
    categories.load(url, uri)
    $('#load_gallery').click(() => {
        gallery.init($("#categories :selected").val())
        gallery.load(url, uri)

    })

    $(document).on("click", ".vignette", (e) => {
        images = gallery.getImages()
        lightbox.init(e.target.id, images)
        lightbox.load(url, uri)
    })

    $('#lightbox_close').click(() => {
        $('#photobox-gallery').css("display", "grid")
        $('nav').css("display", "block")
        $('#lightbox_container').css("display", "none")
        $('body').css("background-color", "white")
    })

    $('#previous').click(() => {
        gallery.changePage(true, false)
    })

    $('#next').click(() => {
        gallery.changePage(false, false)
    })

    $('#prevImage').click(() => {
        lightbox.prev()
    })

    $('#nextImage').click(() => {
        lightbox.next()
    })
})