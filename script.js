// Greeting
const greeting = document.getElementById('greeting');
const currentHour = new Date().getHours();

const message = 
    currentHour >= 5 && currentHour < 12
        ? 'Good morning'
        : currentHour >= 12 && currentHour < 18
        ? 'Good afternoon'
        : 'Good night';

greeting.textContent = message;

// Search
const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((answer) => answer.json())
        .then((result) => displayResults(result))
}

function displayResults(result) {
    resultPlaylist.classList.add('hidden');
    const artistImage = document.getElementById('artist-img');
    const artistName = document.getElementById('artist-name');

    result.forEach((element) => {
        artistImage.src = element.urlImg;
        artistName.innerText = element.name;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }

    requestApi(searchTerm);
})