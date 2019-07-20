export default{
	methods:{
		config(){
			let config= {
					headers: {
						'Authorization' : 'Bearer' + " " + this.user.api_token
					}
			}

			return config
		}
	}
}