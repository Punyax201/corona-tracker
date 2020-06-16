import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

import URLS from '../Routes.js'
import * as _ from 'lodash'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    countriesList:{},
    selectedCountry:null,
    dashboardData: null,
    pieData: null
  },
  mutations: {
    updateCountriesList(state, payload){

      //let countries = payload.map(a => a.Country)
      this.state.countriesList = payload.sort((a,b) => (a.Country > b.Country) ? 1 : -1)
    },

    selectCountry(state, payload){
      this.state.selectedCountry = payload
    },

    //DASHBOARD
    updateDashboardData(state, payload){
      this.state.dashboardData = payload
    },

    //PIE DATA
    updatePieData(state, payload){
      this.state.pieData = payload
    }
  },
  actions: {

    //Get List of Countries
    async getCountries(){
      //console.log("Fetching List of Countries...")

      await Vue.axios.get(URLS.GET_COUNTRIES).then( res => {
        //console.log(res.data)
        this.commit('updateCountriesList', res.data)
      })
    },

    //Fetch Country Data
    async getCountryData(context, country){
      //console.log(country)

      var getCountryUrl = URLS.GET_COUNTRY_DATA_ALL.replace("{{country}}", country.country)

      //console.log("url: " + getCountryUrl)
      await Vue.axios.get(getCountryUrl).then( res => {
        this.commit('selectCountry', country.country)
        this.commit('updateDashboardData', _.last(res.data))
      }).catch(e => {
        console.log("Error")
      })
    }

  },
  modules: {
  }
})
