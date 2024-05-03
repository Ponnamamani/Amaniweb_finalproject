<template>
  <PlantHeader/>
  <PlantsCatalog :plantsList = plantsList />
</template>

<script>
  import PlantHeader from "./components/PlantHeader.vue";
  import PlantsCatalog from "./components/PlantsCatalog.vue";

  export default{
    name:"App",
    components:{
      PlantHeader,
      PlantsCatalog
    },
    data(){
      return{
        plantsList:[]
      }
    },
    methods:{
      async fetchPlantsDetails(){
        const res = await fetch("http://localhost:3409/api");
        const plantsData = await res.json();
        console.log(plantsData[0].items);
        return plantsData[0].items;
      }
    },
    async created(){
      this.plantsList = await this.fetchPlantsDetails();
    }
  }
</script>

<style scoped>
</style>