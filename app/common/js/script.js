document.addEventListener('DOMContentLoaded', load.bind());

const menuButtons = document.querySelectorAll('.menu__button');
const header = document.querySelector('.header');
const infoBlock = document.querySelector('.info__document');
const collapseButton = document.querySelectorAll('.collapse__button');
const menuButtonClass = 'menu__button-open';
const collapseButtonClass = 'collapse__button-open';


function load() {
    function toogleItem(elem, hideElem, buttonClass) {
        hideElem.classList.toggle('hide');
        elem.forEach((item) => {
            item.classList.toggle(buttonClass)
        })
    }

    function eventHandle(elem, hideElem, buttonClass) {
        elem.forEach((item) => {
            item.addEventListener('click', toogleItem.bind(this, elem,  hideElem, buttonClass))
        });
    }

    eventHandle(menuButtons, header, menuButtonClass);
    eventHandle(collapseButton, infoBlock, collapseButtonClass);
}





