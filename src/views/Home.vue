<template>
  <v-container fluid>
    <Dashboard :dashboardData="getDashboardData" />

    <h2>Select Country</h2>
    <select v-model="selectedCountry" @change="selectCountry" name="" id="country-selector">
      <option v-for="c in getCountriesList" :key="c.Slug" :value="c.Slug">{{c.Country}}</option>
    </select>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/Dashboard/DashBoard.vue'
import {mapState} from 'vuex'

export default {
  name: 'Home',
  components: {
    Dashboard
  },

  //Data
  data: () => ({
    selectedCountry: null
  }),

  //Methods
  methods:{
    init:function(){
      console.log("init..")
      this.$store.dispatch('getCountries')
    },
    
    selectCountry:function(){
      console.log(this.selectedCountry)
      let payload = {country:this.selectedCountry}
      this.$store.dispatch('getCountryData', payload)
    }
  },

  //Computed Properties
  computed: mapState({
    getCountriesList: state => state.countriesList,
    getDashboardData: state => state.dashboardData
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
