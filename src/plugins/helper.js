"use strict"
import Vue from 'vue'
const Helper = {
	install(Vue) {
	Vue.prototype.appName = process.env.VUE_APP_NAME
	Vue.prototype.formatPrice= 
		function(value) {
		        let val = (value/1).toFixed(2).replace('.',',')
		        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		    }
	Vue.prototype.getImage = 
		function (image){
			if(image!=null && image.length>0){
			return process.env.VUE_APP_BACKEND_URL + "/storage/"+ image
			}
			return "/img/unavailable.png"
		}
	}
}
Vue.use(Helper)