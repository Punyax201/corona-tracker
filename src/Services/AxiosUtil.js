import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const axiosUtil = {
    sendRequest: async function(url) {
        return Vue.axios(url).catch(err => {
            console.log(err)
        })
    }
}

export default axiosUtil
