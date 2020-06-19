<template>
  <v-container fluid>
    <Dashboard :dashboardData="getDashboardData" :country="selectedCountryName" />

    <h2>Select Country</h2>
    <select v-model="selectedCountry" @change="selectCountry" name="" id="country-selector">
      <option v-for="c in getCountriesList" :key="c.Slug" :value="c.Slug">{{c.Country}}</option>
    </select>

    <section class="mt-2">
      <v-data-iterator :items="getFullData.Countries" :items-per-page="15" dark>
        <template v-slot:header>
          <v-toolbar class="blue darken-2">
            <v-toolbar-title>Full Data</v-toolbar-title>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col>
              <v-list class="pt-0">
                <v-list-item class="blue-grey darken-4 mt-0">
                  <v-row>
                    <v-col>Name</v-col>
                    <v-col>Total</v-col>
                    <v-col>Recovered</v-col>
                    <v-col>Deaths</v-col>
                  </v-row>
                </v-list-item>
                <v-list-item v-for="item in props.items" :key="item.CountryCode">
                  <v-row>
                    <v-col class="list-item-name">{{item.Country}}</v-col>
                    <v-col>{{item.TotalConfirmed}}</v-col>
                    <v-col>{{item.NewRecovered}}</v-col>
                    <v-col>{{item.NewDeaths}}</v-col>
                  </v-row>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </section>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/Dashboard/DashBoard.vue'
import {mapState} from 'vuex'
import d3Util from '@/D3Util'


export default {
  name: 'Home',
  components: {
    Dashboard
  },

  //Data
  data: () => ({
    selectedCountry:"",
    lineChartData: null
  }),

  //Methods
  methods:{
    init:function(){
      console.log("init..")
      this.$store.dispatch('getCountries')
      this.$store.dispatch('getDefaultDashboardData')
    },
    
    selectCountry:async function(){
      console.log(this.selectedCountry)
      let payload = {country:this.selectedCountry}

      var width = window.innerWidth
      var height = window.innerHeight

      await this.$store.dispatch('getCountryData', payload).then(res => {
        console.log("Charting with width: " + width)
        console.log(res)

        d3Util.drawLineChart("#lineGraph", width, height / 2, res)
      })

      this.$store.commit('selectCountry', this.selectedCountry)
    }
  },

  //Computed Properties
  computed: mapState({
    getCountriesList: state => state.countriesList,
    getDashboardData: state => state.dashboardData,
    selectedCountryName: state => state.selectedCountry,
    getFullData: state => state.fullData
  }),

  //Created
  created(){
    this.init()
  }
}
</script>
<style scoped>
  @import "../styles/home.css"
  
</style>
