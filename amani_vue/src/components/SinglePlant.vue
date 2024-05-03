<template>
    <div class="plant_card">
        <div class="plant_photo">
            <img :src=plant.plant_image alt=plant.plant_id/>
        </div>
        <div class="plant_details">
            <div class="container">
                <h3>{{plant.plant_name}}</h3>
                <span class="pill" :style="{backgroundColor: this.getStatusColour(plant.plant_availability)}"> {{plant.plant_availability}} </span>
            </div>
            <p class="price"> <b>$ {{plant.plant_price}}</b></p>
            <StarRating read-only :rating="plant.plant_reviews[0].rating" :star-size="20" active-color="gold"/>
            <p>{{plant.plant_description}}</p>
            <p class="green-theme"><img class="icons" src="../assets/discount.png" alt="discount image"/> {{plant.plant_promotionalData}}</p>
            <p><img class="icons" src="../assets/watering-plants.png" alt="watering plants image"/> {{plant.plant_careTips}}</p>
        </div>
    </div>
</template>

<script>
    import StarRating from "vue-star-rating";
    export default{
        name:"SinglePlant",
        components:{
            StarRating
        },
        props:{
            plant: Object
        },
        methods:{
            getStatusColour(availability){
                if(availability === "In stock")
                    return "green"
                else if(availability === "Limited stock")
                    return "orange"
                else
                    return "tomato"   
            }
        }
    }
</script>

<style>
    div{
        font-family: "Lora", serif;
        font-weight: 500;
    }
    .plant_card{
        display:flex;
        justify-content:left;
        align-items:center;
        border:transparent;
        border-radius:4px;
        padding:10px;
        margin:10px;
        box-shadow:0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    }
    .plant_photo img{
        width:300px;
        height:300px;
        border: transparent;
        border-radius: 5px;
        margin-right: 50px;
    }
    .container{
        display: flex;
        justify-content:space-between;
        align-items:center;
    }
    .pill{
        border:transparent;
        border-radius: 4px;
        padding:5px;
        color:white;
    }
    .price{
        color:#3CA10F;
        font-size: 1.5em;
    }
    .icons{
        width:30px;
        height:30px;
    }
    .green-theme{
        color:#3CA10F;
        font-weight:bold;
    }
</style>