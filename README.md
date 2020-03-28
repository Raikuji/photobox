# Projet Photobox

[Projet photobox sur github](https://github.com/Raikuji/photobox)

Chaque fonction utiliser dans les modules a été documentée sous forme de JSDoc, permattant la comprehension de chacune des fonction, cependant, voici l'arbre de lancement de chaque fonction pour chaque module :

 - ### Gallery :
    - init
    - load 
        - photoloader.init
        - photoloader.load
            - display
    - changePage
        - photoloader.init
        - photoloader.load
            - display

 -  ### Lightbox :
    - init
    - load
        - photoloader.init
        - photoloader.load
            - change
            - display
            - photoloader.load
                - displayComments
    - prev / next
        - photoloader.init
        - photoloader.load
            - isEndPage : true
            - getImageId
                - otherPageId
                    - gallery.changePage
                        - gallery.getImages
                        - photoloader.load
                            - change
                            - photoloader.load
                                - displayComments
    - prev / next
        - photoloader.init
        - photoloader.load
            - isEndPage : false
            - getImageId
                - samePageId
                    - gallery.getImages
                - photoloader.load
                    - change
                    - photoloader.load
                        - displayComments

 - ### Categories :
    - load
        - photoloader.init
        - photoloader.load
            - display

 - ### Photoloader :
    - init
    - load
        - axios.get
