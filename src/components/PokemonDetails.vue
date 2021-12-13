<template>
    <div class="detail" v-if="show">
        <div class="detail-view">
            <div v-if="pokemon" class="image">
                <img :src="imageUrl + pokemon.id + '.png'" alt="">
            </div>
            <div v-if="pokemon" class="data">
                <h2>{{ pokemon.name }}</h2>
                <div class="property">
                    <div class="left">Height</div>
                    <div class="right">{{ pokemon.height }} cm</div>
                </div>
                <div class="property">
                    <div class="left">Weight</div>
                    <div class="right">{{ pokemon.weight }} lbs</div>
                </div>
            </div>

            <h2 v-else>Pokemon was not found</h2>
            <button class="close-btn" @click="closeDetail">Close</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'pokemonUrl',
            'imageUrl'
        ],
        data: () => {
            return {
                show: false,
                pokemon: {} 
            }   
        },
        methods: {
            async fetchData() {
                const axios = require('axios');
                try{
                    const response = await axios.get(this.pokemonUrl);
                    this.pokemon = response.data;
                    this.show = true;
                }
                catch(e){
                    console.log(e);
                }
            },
            closeDetail() {
                this.$emit('closeDetail');
            }
        },
        mounted() {
            this.fetchData();
        }
    }
</script>