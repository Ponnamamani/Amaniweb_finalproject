<template>
    <div v-for="plant of plantsList" :key="plant.plant_id">
        <SinglePlant :plant = plant />
    </div>
</template>

<script>
    import SinglePlant from "./SinglePlant.vue";

    export default{
        name:"PlantsCatalog",
        components:{
            SinglePlant
        },
        props:{
            plantsList: Array
        }
    }
</script>

<style scoped>
</style>