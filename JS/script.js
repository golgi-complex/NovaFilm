"use strict"

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu_arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}

//Меню бургер
const iconMenu = document.querySelector('.menu_icon');
const menuBody = document.querySelector('.menu_body');
if (iconMenu){
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

//Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu_link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;
            
            if(iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

//Кнопка наверх
window.addEventListener('scroll', function(){
    var scroll = document.querySelector('.button-up');
    scroll.classList.toggle("active", window.scrollY>500)
})
    function scrollTopTop(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

//Модальное окно
const linksList = document.querySelectorAll('.modal_link');
for (let elem of linksList)
elem.addEventListener("click", function (e) {
    document.body.classList.add('_lock');
});

const modalCloseX = document.querySelectorAll('.modal_close');
for (let elem of modalCloseX)
    elem.addEventListener("click", function (e) {
        document.body.classList.remove('_lock');
});

    const modalCloseArea = document.querySelectorAll('.modal_area');
    for (let elem of modalCloseArea)
        elem.addEventListener("click", function (e) {
            document.body.classList.remove('_lock');
});
