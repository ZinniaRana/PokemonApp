import axios from 'axios';
export async function fetchPokemons(offset, limit){
    const response = await axios
                            .get(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
    return(response.data)
}