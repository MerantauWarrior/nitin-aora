/*var placeForColor = document.querySelector('.product__color-container__chosen');
var colorLabels = document.querySelectorAll('.color-controls label');
var colorInputs = document.querySelectorAll('input[name="color"]');

for (var i = 0; i < colorInputs.length; i++) {

    for(var j = 0; j < colorLabels.length; j++) {
        if(colorInputs[i].checked && colorLabels[j].htmlFor === colorInputs[i].id) {

            placeForColor.innerHTML = '' + colorLabels[j].dataset.color;

        }
    }

    colorInputs[i].addEventListener('click', function () {

        for(var j = 0; j < colorLabels.length; j++) {
            if(colorLabels[j].htmlFor === this.id) {
                placeForColor.innerHTML = '' + colorLabels[j].dataset.color;
            }
        }
    })
}*/

function setupImageSwitcher() 
{
    var galleryItems = document.querySelectorAll('.product__img-item');

    var imgMain = document.querySelector('.product__img-item--main img');

    for (var g = 0; g < galleryItems.length; g++) {

        galleryItems[g].addEventListener('click', function () {
            for (var u = 0; u < galleryItems.length; u++) {
                galleryItems[u].classList.remove('product__img-item--chosen');
            }

            this.classList.add('product__img-item--chosen');

            var srcAttribute =  this.children[0].getAttribute('src');
            imgMain.setAttribute('src', '' + srcAttribute);


        })
    }
}

jQuery(document).ready(function($) {
    setupImageSwitcher();
});
