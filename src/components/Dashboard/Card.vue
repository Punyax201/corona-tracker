<template>
    <v-card tile color="rgba(0,0,0,0.2)" class="pa-1 card">
        <v-card-text class="pa-2">
            <h2 :class="type">{{title}}</h2>
            <h3 :class="type">{{data}}</h3>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    props:['type', 'title', 'data']
}
</script>
<style scoped>
    h2, h3{
        color: azure;
    }
    .card{
        position: relative;
    }
    .card::before{
        width: 100%;
        height: 100%;
        position: absolute;
        background: red;
    }

</style>