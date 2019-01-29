/*=======================================================================*/
/*--------------------------CART-INPUT-COUNTER-----------------------------*/
var inputs = document.querySelectorAll('.cart__product-counter');

for (var j = 0; j < inputs.length; j++) {

    var that = inputs[j];
    var inputPls = that.children[2];
    
    if (that.children.length > 2)
        var inputMns = that.children[0];

    var qty = inputMns.parentNode.querySelector('.cart__amount-input').value;
    if (qty < 2)
        inputMns.setAttribute("disabled", "disabled");

    if (typeof inputPls !== 'undefined') {
        inputPls.addEventListener('click', function () {
            var input = this.parentNode.querySelector('.cart__amount-input');
            //restrit to max 10 qty
            if (input.value >= 10)
                return;

            input.value = parseInt(input.value) + 1;

            var minus = this.parentNode.querySelector('.cart__btn-minus');
            minus.removeAttribute("disabled");
        });
    }

    if (typeof inputMns !== 'undefined') {
        inputMns.addEventListener('click', function () {
            var input = this.parentNode.querySelector('.cart__amount-input');

            if (input.value <= 2) {
                input.value = ("1");
                this.setAttribute("disabled", "disabled");
            }
            else {
                input.value = parseInt(input.value) - 1;
                this.removeAttribute("disabled");
            }
        });
    }
}


/*=======================================================================*/
/*--------------------------ПРОВЕРКА ЕСТЬ ЛИ SLIDE-MENU (ДЛЯ HEADER CART)-----------------------------*/
var innerContentCart = document.querySelector('.cart__slide-menu');
if (!innerContentCart) {
    console.log('slide-menu does not exist');
}
else {
    console.log('slide-menu is here');

    /*=======================================================================*/
    /*--------------------------SLIDE-MENU-OPEN / CLOSE-----------------------------*/
    var slideMenu = document.querySelector('.slide-menu');
    var inner = document.querySelector('.slide-menu__inner');
    var menuTopContainer = document.querySelector('.slide-menu__top-container');

    var innerContentAccount = document.querySelector('.login-form--slide-menu');
    var innerContentOrders = document.querySelector('.orders-block--slide-menu');
    var cartBtn = document.querySelector('.slide-menu__btn--cart');
    var accountBtn = document.querySelector('.slide-menu__btn--login');
    var ordersBtn = document.querySelector('.slide-menu__btn--orders');
    var closeBtn = document.querySelector('.slide-menu__btn-close');

    var menuTitle = document.createElement('span');
    menuTitle.className = "slide-menu__title";
    menuTopContainer.appendChild(menuTitle);

    accountBtn.addEventListener('click', function () {

        if (!slideMenu.classList.contains('slide-menu--open')) {
            slideMenu.classList.add('slide-menu--open');
            accountBtn.classList.add('slide-menu__btn--login--active');
            menuTitle.innerHTML = "Account";
            inner.appendChild(innerContentAccount);
            innerContentAccount.style.display = "block";
            slideMenu.classList.remove('slide-menu--close');
        }

        else if (slideMenu.classList.contains('slide-menu--open') && menuTitle.innerHTML === "Cart") {
            cartBtn.classList.remove('slide-menu__btn--cart--active');
            menuTitle.innerHTML = "Account";
            accountBtn.classList.add('slide-menu__btn--login--active');
            inner.removeChild(innerContentCart);
            innerContentCart.style.display = "none";
            inner.appendChild(innerContentAccount);
            innerContentAccount.style.display = "block";
        }

        else if (slideMenu.classList.contains('slide-menu--open') && menuTitle.innerHTML === "Orders") {
            ordersBtn.classList.remove('slide-menu__btn--orders--active');
            menuTitle.innerHTML = "Account";
            accountBtn.classList.add('slide-menu__btn--login--active');
            inner.removeChild(innerContentOrders);
            innerContentOrders.style.display = "none";
            inner.appendChild(innerContentAccount);
            innerContentAccount.style.display = "block";
        }

        else {
            slideMenu.classList.add('slide-menu--close');
            slideMenu.classList.remove('slide-menu--open');
            accountBtn.classList.remove('slide-menu__btn--login--active');
            menuTitle.innerHTML = "";
            inner.removeChild(innerContentAccount);
            innerContentAccount.style.display = "none";
        }

    });

    if (ordersBtn != null) {
        ordersBtn.addEventListener('click', function () {

            if (!slideMenu.classList.contains('slide-menu--open')) {
                slideMenu.classList.add('slide-menu--open');
                ordersBtn.classList.add('slide-menu__btn--orders--active');
                menuTitle.innerHTML = "Orders";
                inner.appendChild(innerContentOrders);
                innerContentOrders.style.display = "block";
                slideMenu.classList.remove('slide-menu--close');
            }

            else if (slideMenu.classList.contains('slide-menu--open') && menuTitle.innerHTML === "Account") {
                accountBtn.classList.remove('slide-menu__btn--login--active');
                menuTitle.innerHTML = "Orders";
                ordersBtn.classList.add('slide-menu__btn--orders--active');
                inner.removeChild(innerContentAccount);
                innerContentAccount.style.display = "none";
                inner.appendChild(innerContentOrders);
                innerContentOrders.style.display = "block";
            }

            else if (slideMenu.classList.contains('slide-menu--open') && menuTitle.innerHTML === "Cart") {
                cartBtn.classList.remove('slide-menu__btn--cart--active');
                menuTitle.innerHTML = "Orders";
                ordersBtn.classList.add('slide-menu__btn--orders--active');
                inner.removeChild(innerContentCart);
                innerContentCart.style.display = "none";
                inner.appendChild(innerContentOrders);
                innerContentOrders.style.display = "block";
            }

            else {
                slideMenu.classList.add('slide-menu--close');
                slideMenu.classList.remove('slide-menu--open');
                ordersBtn.classList.remove('slide-menu__btn--orders--active');
                menuTitle.innerHTML = "";
                inner.removeChild(innerContentOrders);
                innerContentOrders.style.display = "none";
            }

        });
    }

    cartBtn.addEventListener('click', function () {

        if (!slideMenu.classList.contains('slide-menu--open')) {
            slideMenu.classList.add('slide-menu--open');
            cartBtn.classList.add('slide-menu__btn--cart--active');
            menuTitle.innerHTML = "Cart";
            inner.appendChild(innerContentCart);
            innerContentCart.style.display = "block";
            slideMenu.classList.remove('slide-menu--close');
        }

        else if (slideMenu.classList.contains('slide-menu--open') && menuTitle.innerHTML === "Orders") {
            ordersBtn.classList.remove('slide-menu__btn--orders--active');
            menuTitle.innerHTML = "Cart";
            cartBtn.classList.add('slide-menu__btn--cart--active');
            inner.removeChild(innerContentOrders);
            innerContentOrders.style.display = "none";
            inner.appendChild(innerContentCart);
            innerContentCart.style.display = "block";
        }

        else if (slideMenu.classList.contains('slide-menu--open') && menuTitle.innerHTML === "Account") {
            accountBtn.classList.remove('slide-menu__btn--login--active');
            menuTitle.innerHTML = "Cart";
            cartBtn.classList.add('slide-menu__btn--cart--active');
            inner.removeChild(innerContentAccount);
            innerContentAccount.style.display = "none";
            inner.appendChild(innerContentCart);
            innerContentCart.style.display = "block";
        }

        else {
            slideMenu.classList.add('slide-menu--close');
            slideMenu.classList.remove('slide-menu--open');
            cartBtn.classList.remove('slide-menu__btn--cart--active');
            menuTitle.innerHTML = "Account";
            inner.removeChild(innerContentCart);
            innerContentCart.style.display = "none";
        }

    });

    closeBtn.addEventListener('click', function () {

        slideMenu.classList.add('slide-menu--close');
        slideMenu.classList.remove('slide-menu--open');

        if (accountBtn.classList.contains('slide-menu__btn--login--active')) {
            accountBtn.classList.remove('slide-menu__btn--login--active');
            inner.removeChild(innerContentAccount);
            innerContentAccount.style.display = "none";
        }

        if (cartBtn.classList.contains('slide-menu__btn--cart--active')) {
            cartBtn.classList.remove('slide-menu__btn--cart--active');
            inner.removeChild(innerContentCart);
            innerContentCart.style.display = "none";
        }

        if (ordersBtn.classList.contains('slide-menu__btn--orders--active')) {
            ordersBtn.classList.remove('slide-menu__btn--orders--active');
            inner.removeChild(innerContentOrders);
            innerContentOrders.style.display = "none";
        }

    });


    /*=======================================================================*/
    /*--------------------------СКЛОНЕНИЕ TOTAL ITEMS-----------------------------*/
    var slideProducts = document.querySelectorAll('.cart__product');

    if (slideProducts.length >= 7) {
        slideProductsList.classList.add('cart__products--scroll');
    }


}










