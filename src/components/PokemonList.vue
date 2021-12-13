<template>
    <div class="list" @setPokemonUrl="setPokemonUrl">
        <article v-for="(pokemon, index) in pokemons" 
                 :key="'poke'+index"
                 @click="setPokemonUrl(pokemon.url)">
            <img :src="imageUrl + pokemon.id + '.png'"
                 width="95"
                 height="96" 
                 alt="">
            <h4>{{ pokemon.name }}</h4>
        </article>
    </div>

    <div class="container mt-5">
        <h6 v-if="loadCount===9">No more items to load. 150 pokemons loaded</h6>
        <button 
            v-if="showLoadMore"
            :disabled="loadCount===9"
            class="button"
            @click="loadMore()">
                Load More
        </button>

        <pagination 
            v-if="showPagination"
            v-model="page" 
            :records="150" 
            :per-page="30" 
            @paginate="loadPokemons()"/>
    </div>
</template>

<script>
    import Pagination from 'v-pagination-3';
    //import API from '../API/api.js';
    
    export default {
        props: [
            'imageUrl',
            'apiUrl',
            'showPagination',
            'showLoadMore'
        ],
        data() {
            return {
                pokemons: [],
                page: 1,
                loadCount: 0
            }
        },
        components: {
            Pagination
        },
        methods: {
            fetchPokemons(offset=0, limit=50) {
                const axios = require('axios');
                axios
                .get(`${this.apiUrl}?offset=${offset}&limit=${limit}`)
                .then((response) => {
                    if(this.showPagination){
                        this.pokemons=[];
                    }

                    if("results" in response.data)
                    {
                        response.data.results.forEach(pokemon => 
                        {
                            pokemon.id = pokemon.url
                                            .split('/')
                                            .filter((part) => {
                                                return !!part
                                            })
                                            .pop();

                            this.pokemons.push(pokemon);
                        });
                    } else {
                        console.log('results key not found');
                    }
                })
                .catch((error) => {
                    console.log(error);    
                })
            },
            setPokemonUrl(url) {
                this.$emit('setPokemonUrl', url);
            },
            loadPokemons() {
                this.fetchPokemons((this.page-1) * 30, 30);
            },
            loadMore() {
                this.loadCount++;
                this.fetchPokemons(this.loadCount * 15, 15) 
            }
        },
        mounted() {
            this.currentUrl = this.apiUrl;
            this.fetchPokemons();
        },
    }
</script>