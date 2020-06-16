<template>
    <section>
        <v-row>
            <v-col>
                <div id="continentGraph">
                    
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
    props: ['dashboardData'],

    methods:{
        drawPieChart(){
            d3Util.drawPieChart("#continentGraph", 400, 400, 150, 50, this.continentPieData)
        }
    },

    computed: {
        //getPieData: axiosUtil.sendRequest(URLS.LIVE_CONTINENT_DATA)
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