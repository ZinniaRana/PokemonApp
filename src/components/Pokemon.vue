<template>
    <div class="container">
        <h1>Pokemon's</h1>

        <div class="nav-container mb-2">
            <button 
                class="button"
                @click="activeLoadMoreOption()">
                Display list with Load More option
            </button>
            <button 
                class="button"
                @click="activePaginationOption()">
                Display list with Pagination
            </button>
        </div>

        <PokemonList
            :imageUrl="imageUrl"
            :apiUrl="apiUrl"
            :count="count"
            :showPagination="showPagination"
            :showLoadMore="showLoadMore"
            @setPokemonUrl="setPokemonUrl"/>

        <PokemonDetails 
            v-if="showDetail"
            :pokemonUrl="pokemonUrl"
            :imageUrl="imageUrl"
            @closeDetail="closeDetail"/>
    </div>
</template>

<script>
    import PokemonList from './PokemonList.vue';
    import PokemonDetails from './PokemonDetails.vue';

    export default {
        data () {
            return {
                imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
                apiUrl: 'https://pokeapi.co/api/v2/pokemon',
                pokemonUrl: '',
                showDetail: false,
                showLoadMore: false,
                showPagination: false
            }
        },
        components: {
            PokemonList,
            PokemonDetails
        },
        methods: {
            activeLoadMoreOption() {
                this.showLoadMore = true;
                this.showPagination = false;
            },
            activePaginationOption() {
                this.showPagination = true;
                this.showLoadMore = false;
            },
            setPokemonUrl(url) {
                this.pokemonUrl = url;
                this.showDetail = true;
            },
            closeDetail() {
                 this.pokemonUrl = '';
                 this.showDetail = false;
            }
        }
    }
</script>