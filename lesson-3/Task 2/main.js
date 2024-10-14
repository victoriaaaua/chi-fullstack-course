let charactersDiv = document.getElementById("characters__list");
const btnPrev = document.getElementById("pagination__btn-prev");
const btnNext = document.getElementById("pagination__btn-next");
const pageNumber = document.getElementById("pagination__number");
let currentPage = 1;

btnPrev.addEventListener("click", () => {
    currentPage--;
    fetchCharacters(currentPage);
});

btnNext.addEventListener("click", () => {
    currentPage++;
    fetchCharacters(currentPage);
});

async function fetchCharacters(page) {
    try {

        charactersDiv.innerHTML = '<p>Loading…</p>';
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        charactersDiv.innerHTML = '';
        let charactersHTML = '';

        data.results.forEach((character) => {
            charactersHTML += `
                <div class="character">
                    <img class="character__img" src="${character.image}">
                    <div>
                        <p class="character__title"><strong>Name:</strong> ${character.name}</p>
                        <p class="character__title"><strong>Status:</strong> ${character.status}</p>
                    </div>
                </div>`;
        });
        charactersDiv.innerHTML = charactersHTML;

        currentPage = data.info.next ? page : data.info.pages;
        pageNumber.innerHTML = currentPage;

        btnPrev.disabled = !data.info.prev;
        btnNext.disabled = !data.info.next;

    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchCharacters(currentPage);