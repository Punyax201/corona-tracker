<template>
    <section>
        <v-row>
            <v-col>
                <div id="continentGraph">
                    
                </div>
            </v-col>
        </v-row>

        <h2>{{country}}</h2>
        <v-row>
            <v-col>
                <div id="lineGraph">

                </div>
            </v-col>
        </v-row>
        <v-row>           
            <v-col>
                <Card type="white--text" title="Total" :data="dashboardData != undefined ? dashboardData.Confirmed : 0" />
            </v-col>
            <v-col>
                <Card type="orange--text" title="Active" :data="dashboardData != undefined ? dashboardData.Active : 0" />
            </v-col>
            <v-col>
                <Card type="green--text" title="Recovered" :data="dashboardData != undefined ? dashboardData.Recovered : 0" />
            </v-col>
            <v-col>
                <Card type="red--text" title="Deaths" :data="dashboardData != undefined ? dashboardData.Deaths : 0" />
            </v-col>
        </v-row>
        <v-icon color="white" @click="refreshButton">mdi-refresh</v-icon>
    </section>
</template>
<script>
import Card from '@/components/Dashboard/Card.vue'
import URLS from '@/Routes'
import axiosUtil from '@/Services/AxiosUtil'
import d3Util from '@/D3Util'
import { mapState } from 'vuex'

export default {
    data:() => {
        return{
            continentPieData: null
        }
    },

    components:{
        Card
    },
    props: ['dashboardData', 'country'],

    methods:{
        drawPieChart(){
            var width = window.innerWidth
            var height = window.innerHeight / 2
            console.log("h: " + height + " w: " + width)
            d3Util.drawPieChart("#continentGraph", width, height, height / 2, 50, this.continentPieData)
        },

        refreshButton(){
            this.$store.dispatch('getDefaultDashboardData')
            this.$store.commit('selectCountry', 'World')

            var width = window.innerWidth
            var height = window.innerHeight

            d3Util.drawPieChart("#continentGraph", width, height / 2, 150, 50, this.continentPieData)

        }
    },

    computed: {
       
    },

    async created(){
        this.continentPieData = await axiosUtil.sendRequest(URLS.LIVE_CONTINENT_DATA).then(res => {
            return res.data
        })

        console.log(this.continentPieData)

        //Create Pie
        this.drawPieChart()
    }
}
</script>
<style>
svg{
    width: 100%;
}

.graphLine{
    fill: none;
    transform: rotateZ(-45deg);
    animation: graphLineAnim 1s forwards;
}

@keyframes graphLineAnim {
    0%{

    }
    100%{
        transform: rotateZ(0deg);
    }
}
</style>