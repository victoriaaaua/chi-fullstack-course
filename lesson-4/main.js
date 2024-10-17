let heroesInfo = {};

let charactersDiv = document.querySelector(".hero-list");
const heroesUrl = 'https://rickandmortyapi.com/api/character';
let container = document.querySelector('#container');

const getHeroList = async (url) => {
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
};

const renderListItem = (hero) =>
    `<div class="hero-list-item" data-id="${hero.id}">` + 
    `<img src="${hero.image}">` +
    `<p class="hero-name">${hero.name}</p>` +
    `<p class="hero-status">${hero.status}</p>` +
    `</div>`;

const renderHeroList = async (url) => {
    try {
        const {info, results} = await getHeroList(url);
        heroesInfo = info;
        charactersDiv.innerHTML += results.map(renderListItem).join('');
        
    } catch (error) {
        charactersDiv.innerHTML = 'Something went wrong';
    }
};

const createModalWindowHero = (hero) => {
    return `
    <div class="overlay"></div>` +
    `<div class="modal-window">` +
    `<img class="modal-hero-img" src="${hero.image}" alt="${hero.name}">` +
      `<p class="modal-hero-name">${hero.name}</p>` +
      `<p class="modal-hero-status">${hero.status}</p>`+
      `<button class="modal-btn-close">Close</button>`+
      `</div>`;
};

const getHeroById = async (id) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    if(!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
};

const openModal = async(id) => {
    try {
        const hero = await getHeroById(id);
        const modalContent = createModalWindowHero(hero);
        container.insertAdjacentHTML('beforeend', modalContent);

        document.querySelector('.modal-btn-close').addEventListener('click', closeModal);
        window.addEventListener('click', outsideClick);

    } catch(error){
        charactersDiv.innerHTML = 'Something went wrong';
    }
}

const closeModal = () => {
    const modalWindow = document.querySelector('.modal-window');
    const overlay = document.querySelector('.overlay');
    if (modalWindow) modalWindow.remove();
    if (overlay) overlay.remove();

    window.removeEventListener('click', outsideClick);
};

charactersDiv.addEventListener("click", (event) => {
    const heroItem = event.target.closest(".hero-list-item");
    event.stopPropagation();

    if (heroItem) {
        const heroId = heroItem.dataset.id;
        openModal(heroId);
    }

});

const outsideClick = (event) => {
    const modalWindow = document.querySelector('.modal-window');
    if (modalWindow && !modalWindow.contains(event.target)) {
        closeModal(); 
    }
};

container.addEventListener('scroll', function() {
    const scrollTop = container.scrollTop; 
    const clientHeight = container.clientHeight; 
    const scrollHeight = container.scrollHeight; 

    if ((scrollTop + clientHeight >= scrollHeight) && heroesInfo.next) {  
        renderHeroList(heroesInfo.next);
    }
});


renderHeroList(heroesUrl);

