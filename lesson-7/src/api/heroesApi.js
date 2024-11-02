import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchAllCharacters = (page) => {
    return axios.get(`${BASE_URL}?page=${page}`);
};

export const fetchCharacterById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};