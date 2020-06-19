import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

import URLS from '../Routes.js'
import * as _ from 'lodash'
import axiosUtil from '@/Services/AxiosUtil'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    countriesList:{},
    selectedCountry: "World",
    dashboardData: null,
    pieData: null,
    fullData: null,

    lineChartData: ""
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
    },

    //Line Chart DATA
    updateLineChartData(state, payload){
      this.state.lineChartData = payload
    },

    //Update Full Data
    updateFullData(state, payload){
      this.state.fullData = payload
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

      var res = await axiosUtil.sendRequest(getCountryUrl).then(res => {
        return res.data
      }).catch(err => {
        console.log("Error")
      })

      this.commit('selectCountry', country.country)
      this.commit('updateDashboardData', _.last(res))
        
        var chartData = res.map(d => ({
          "Date": d.Date,
          "Confirmed": d.Confirmed,
          "Recovered": d.Recovered,
          "Deaths": d.Deaths
        }))

        this.commit('updateLineChartData', chartData)
        return chartData
    },

    //Fetch World Data (Default)
    async getDefaultDashboardData(){
      let url = URLS.SUMMARY
      var response = await axiosUtil.sendRequest(url).then(res => {
        return res.data
      })

      var modifiedResponse = {
        'Confirmed' : response.Global.TotalConfirmed,
        'Active' : response.Global.TotalConfirmed - response.Global.TotalRecovered - response.Global.TotalDeaths,
        'Deaths' : response.Global.TotalDeaths,
        'Recovered' : response.Global.TotalRecovered
      }

      //console.log(response.Global)
      this.commit('updateDashboardData', modifiedResponse)
      this.commit('updateFullData', response)
    }

  },
  modules: {
  }
})
